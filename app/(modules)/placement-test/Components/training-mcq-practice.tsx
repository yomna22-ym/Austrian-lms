"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bold,
  Clock3,
  Info,
  Italic,
  List,
  ListOrdered,
  Mic,
  Play,
  RotateCcw,
  Square,
  Trash2,
  Underline,
  X,
} from "lucide-react";
import Button from "@/app/shared/Button/Button";
import { usePlacementNavigation } from "../hooks";

type PracticeStep = "mcq" | "speaking" | "writing" | "complete";
type ModalType = "missing-answer" | "missing-recording" | "missing-writing";

const STEP_ORDER: PracticeStep[] = ["mcq", "speaking", "writing", "complete"];

const STEP_CONFIG = {
  mcq: { title: "MCQ Practice", label: "Step 1 of 3", seconds: 10 },
  speaking: { title: "Speaking", label: "Step 2 of 3", seconds: 120 },
  writing: { title: "Writing", label: "Step 3 of 3", seconds: 300 },
  complete: { title: "Training Complete", label: "Ready for the real test", seconds: 0 },
} as const;

const OPTIONS = [
  { id: "A", label: "Salzburg" },
  { id: "B", label: "Wien" },
  { id: "C", label: "Innsbruck" },
  { id: "D", label: "Graz" },
];

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds,
  ).padStart(2, "0")}`;
};

interface WaveformProps {
  progress: number;
}

const Waveform: React.FC<WaveformProps> = ({ progress }) => {
  const bars = [
    10, 18, 24, 16, 28, 20, 34, 22, 18, 30, 26, 15, 20, 32, 24, 18, 26, 14, 22,
    30, 18, 12, 20, 16, 26, 34, 22, 18, 12, 16, 28, 22, 18, 15, 12, 20, 30, 22,
    14, 18, 26, 16, 12, 22, 28, 18, 14, 11, 16, 20, 12, 10, 18, 14, 11, 9, 13,
  ];

  return (
    <div className="flex h-12 w-full min-w-0 flex-1 items-center gap-[3px] overflow-hidden">
      {bars.map((height, index) => {
        const active = index / bars.length <= progress;

        return (
          <span
            key={`${height}-${index}`}
            className={[
              "w-[3px] rounded-full transition-colors duration-150",
              active ? "bg-secondary" : "bg-secondary/15",
            ].join(" ")}
            style={{ height }}
          />
        );
      })}
    </div>
  );
};

const TrainingMcqPractice = () => {
  const { goToHome, goToTraining } = usePlacementNavigation();
  const [step, setStep] = useState<PracticeStep>("mcq");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(STEP_CONFIG.mcq.seconds);
  const [modalType, setModalType] = useState<ModalType | null>(null);
  const [writingAnswer, setWritingAnswer] = useState("");
  const [recordingState, setRecordingState] = useState<
    "idle" | "recording" | "recorded"
  >("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [writingStyle, setWritingStyle] = useState({
    bold: false,
    italic: false,
    underline: false,
    unordered: false,
    ordered: false,
  });
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const activeConfig = STEP_CONFIG[step];
  const timedStep = step !== "complete";

  const changeStep = (nextStep: PracticeStep) => {
    setStep(nextStep);
    setTimeLeft(STEP_CONFIG[nextStep].seconds);
  };

  useEffect(() => {
    if (!timedStep || timeLeft <= 0 || modalType) return;

    const timerId = window.setInterval(() => {
      setTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [modalType, timedStep, timeLeft]);

  useEffect(() => {
    if (!timedStep || timeLeft !== 0 || modalType) return;

    const timeoutId = window.setTimeout(() => {
      if (step === "mcq") {
        changeStep("speaking");
        return;
      }

      if (step === "speaking") {
        if (recordingState === "recording") {
          mediaRecorderRef.current?.stop();
        }
        changeStep("writing");
        return;
      }

      if (step === "writing") {
        changeStep("complete");
      }
    }, 500);

    return () => window.clearTimeout(timeoutId);
  }, [modalType, recordingState, step, timedStep, timeLeft]);

  useEffect(() => {
    if (recordingState !== "recording") return;

    const timerId = window.setInterval(() => {
      setRecordingSeconds((current) => current + 1);
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [recordingState]);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const isWarning = timeLeft <= Math.ceil(activeConfig.seconds / 2);
  const timerColorClass = isWarning ? "text-yellow-500" : "text-secondary";
  const progressColor = isWarning ? "#eab308" : "#c81016";
  const progress = useMemo(() => {
    if (!timedStep || activeConfig.seconds === 0) return 0;
    return (timeLeft / activeConfig.seconds) * 100;
  }, [activeConfig.seconds, timedStep, timeLeft]);

  const currentStepNumber = Math.max(STEP_ORDER.indexOf(step) + 1, 1);
  const progressWidth =
    step === "complete" ? "100%" : `${(currentStepNumber / 3) * 100}%`;

  const startRecording = async () => {
    setMicError(null);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      streamRef.current = stream;
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];
      setRecordingSeconds(0);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const nextUrl = URL.createObjectURL(blob);

        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(nextUrl);
        setRecordingState("recorded");
        stream.getTracks().forEach((track) => track.stop());
      };

      recorder.start();
      setRecordingState("recording");
    } catch {
      setMicError("Microphone access is required for speaking practice.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const deleteRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setRecordingSeconds(0);
    setAudioProgress(0);
    setIsPlayingAudio(false);
    setRecordingState("idle");
  };

  const playRecording = () => {
    if (!audioRef.current) return;

    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
      return;
    }

    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setIsPlayingAudio(true);
  };

  const toggleWritingStyle = (key: keyof typeof writingStyle) => {
    setWritingStyle((current) => ({
      ...current,
      [key]: !current[key],
    }));
    textareaRef.current?.focus();
  };

  const insertWritingPrefix = (prefix: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextValue =
      writingAnswer.slice(0, start) + prefix + writingAnswer.slice(end);

    setWritingAnswer(nextValue);
    window.requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + prefix.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  const handleNext = () => {
    if (step === "mcq") {
      if (!selectedOption && timeLeft > 0) {
        setModalType("missing-answer");
        return;
      }

      changeStep("speaking");
      return;
    }

    if (step === "speaking") {
      if (recordingState !== "recorded") {
        setModalType("missing-recording");
        return;
      }

      changeStep("writing");
      return;
    }

    if (step === "writing") {
      if (!writingAnswer.trim() && timeLeft > 0) {
        setModalType("missing-writing");
        return;
      }

      changeStep("complete");
    }
  };

  const renderTimer = () => (
    <section className="rounded-[10px] border border-input-border bg-white px-6 py-4 text-center shadow-[0_1px_3px_rgba(17,19,21,0.03)]">
      <div className="mx-auto mb-3 grid h-[68px] w-[68px] place-items-center">
        <div
          className="grid h-[64px] w-[64px] place-items-center rounded-full"
          style={{
            background: `conic-gradient(${progressColor} ${progress}%, #e8e8e8 0)`,
          }}
        >
          <div className="grid h-[50px] w-[50px] place-items-center rounded-full bg-white">
            <Clock3
              className={`h-6 w-6 ${timerColorClass}`}
              strokeWidth={2.4}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      <p className={`text-[34px] font-bold leading-none ${timerColorClass}`}>
        {formatTime(timeLeft)}
      </p>
      <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-text-secondary">
        Remaining
      </p>
    </section>
  );

  const renderMcqStep = () => (
    <>
      {renderTimer()}

      <section className="mt-4 rounded-[10px] border border-input-border bg-white px-8 py-5 shadow-[0_1px_3px_rgba(17,19,21,0.03)]">
        <p className="text-xs font-bold text-secondary">Question 1 of 1</p>
        <h2 className="mt-2 text-base font-bold text-text-primary">
          Welche Stadt ist die Hauptstadt von Österreich?
        </h2>

          <div className="mt-5 flex flex-col gap-3">
          {OPTIONS.map((option) => {
            const selected = selectedOption === option.id;

            return (
              <label
                key={option.id}
                className={[
                    "flex h-[50px] cursor-pointer items-center gap-4 rounded-[9px] border px-5 text-sm font-medium transition-colors",
                  selected
                    ? "border-secondary bg-secondary/5"
                    : "border-input-border hover:border-secondary/40",
                ].join(" ")}
              >
                <input
                  type="radio"
                  name="mcq-practice-answer"
                  value={option.id}
                  checked={selected}
                  onChange={() => setSelectedOption(option.id)}
                  className="h-4 w-4 accent-secondary"
                />
                <span>
                  {option.id}. {option.label}
                </span>
              </label>
            );
          })}
        </div>
      </section>

      <div className="mt-4 flex min-h-[42px] items-center justify-center gap-5 rounded-[8px] bg-input-bg/35 text-sm font-medium text-text-primary">
        <Clock3
          className="h-5 w-5 text-secondary"
          strokeWidth={2.4}
          aria-hidden="true"
        />
        <span>~10 sec per question</span>
        <span className="h-7 w-px bg-input-border" aria-hidden="true" />
        <span>1 question</span>
      </div>
    </>
  );

  const renderSpeakingStep = () => (
    <>
      <h2 className="mb-3 text-[28px] font-bold">Speaking</h2>
      {renderTimer()}

      <section className="mt-4 rounded-[12px] border border-input-border bg-white px-8 py-5 shadow-[0_4px_16px_rgba(17,19,21,0.06)]">
        <h3 className="mb-3 text-lg font-bold">
          Wo wohnen Sie? <span className="text-secondary">*</span>
        </h3>

        {recordingState === "idle" ? (
          <div className="flex min-h-[148px] flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={startRecording}
              className="grid h-16 w-16 place-items-center rounded-full bg-secondary/10 text-secondary transition-transform hover:scale-105"
              aria-label="Start recording"
            >
              <Mic className="h-8 w-8" aria-hidden="true" />
            </button>
            <p className="text-sm font-medium text-text-secondary">
              Click the microphone and allow access to start recording.
            </p>
            {micError ? (
              <p className="text-sm font-semibold text-secondary">{micError}</p>
            ) : null}
          </div>
        ) : null}

        {recordingState === "recording" ? (
          <div className="flex min-h-[148px] flex-col items-center justify-center gap-4">
            <button
              type="button"
              onClick={stopRecording}
              className="grid h-16 w-16 place-items-center rounded-full bg-secondary text-primary transition-transform hover:scale-105"
              aria-label="Stop recording"
            >
              <Square className="h-7 w-7 fill-current" aria-hidden="true" />
            </button>
            <p className="text-sm font-semibold text-secondary">
              Recording... {formatTime(recordingSeconds)}
            </p>
          </div>
        ) : null}

        {recordingState === "recorded" ? (
          <div className="rounded-[10px] border border-input-border bg-white px-5 py-5 shadow-[0_3px_12px_rgba(17,19,21,0.05)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-secondary/10 text-secondary">
                <Mic className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1 self-stretch">
                <p className="mb-2 text-sm font-semibold">Your recording</p>
                <Waveform progress={audioProgress} />
              </div>
              <span className="self-end text-sm font-medium text-text-primary sm:self-auto">
                {formatTime(recordingSeconds)}
              </span>
            </div>

            <audio
              ref={audioRef}
              src={audioUrl ?? undefined}
              className="hidden"
              onTimeUpdate={(event) => {
                const audio = event.currentTarget;
                if (!audio.duration) return;
                setAudioProgress(audio.currentTime / audio.duration);
              }}
              onEnded={() => {
                setAudioProgress(1);
                setIsPlayingAudio(false);
              }}
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button
                label={isPlayingAudio ? "Pause" : "Play"}
                type="button"
                width="w-full sm:w-[118px]"
                height="h-[42px]"
                bgColorClass="bg-white border border-input-border hover:bg-input-bg/40"
                textColorClass="text-secondary"
                className="rounded-[8px] text-sm font-bold"
                icon={<Play className="h-4 w-4 fill-current" aria-hidden="true" />}
                onClick={playRecording}
              />
              <Button
                label="Delete"
                type="button"
                width="w-full sm:w-[118px]"
                height="h-[42px]"
                bgColorClass="bg-white border border-input-border hover:bg-input-bg/40"
                textColorClass="text-secondary"
                className="rounded-[8px] text-sm font-bold"
                icon={<Trash2 className="h-4 w-4" aria-hidden="true" />}
                onClick={deleteRecording}
              />
            </div>
          </div>
        ) : null}
      </section>
    </>
  );

  const renderWritingStep = () => (
    <>
      {renderTimer()}

      <section className="mt-4 rounded-[10px] border border-input-border bg-white px-8 py-5 shadow-[0_1px_3px_rgba(17,19,21,0.03)]">
        <h2 className="text-base font-bold">
          Schreiben Sie über Ihre Heimatstadt.{" "}
          <span className="text-secondary">*</span>
        </h2>
        <p className="mt-3 max-w-[780px] text-sm leading-relaxed text-text-primary">
          Schreiben Sie einen kurzen Absatz (50-80 Wörter) über Ihre
          Heimatstadt. Sie können über den Ort, die Menschen, Aktivitäten oder
          etwas schreiben, das Sie mögen.
        </p>

        <div className="mt-6 overflow-hidden rounded-[10px] border border-input-border bg-white">
          <div className="flex h-[44px] items-center justify-between gap-3 overflow-x-auto border-b border-input-border px-4">
            <div className="flex shrink-0 items-center gap-3 text-text-primary">
              <button
                type="button"
                onClick={() => setWritingAnswer("")}
                className="rounded p-1 transition-colors hover:bg-input-bg"
                aria-label="Clear writing"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setWritingAnswer((current) => current)}
                className="rounded p-1 opacity-50 transition-colors hover:bg-input-bg"
                aria-label="Redo"
              >
                <RotateCcw className="h-4 w-4 rotate-180" aria-hidden="true" />
              </button>
              <span className="h-6 w-px bg-input-border" aria-hidden="true" />
              <button
                type="button"
                onClick={() => toggleWritingStyle("bold")}
                className={[
                  "rounded p-1 transition-colors hover:bg-input-bg",
                  writingStyle.bold ? "bg-secondary/10 text-secondary" : "",
                ].join(" ")}
                aria-label="Bold"
              >
                <Bold className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => toggleWritingStyle("italic")}
                className={[
                  "rounded p-1 transition-colors hover:bg-input-bg",
                  writingStyle.italic ? "bg-secondary/10 text-secondary" : "",
                ].join(" ")}
                aria-label="Italic"
              >
                <Italic className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => toggleWritingStyle("underline")}
                className={[
                  "rounded p-1 transition-colors hover:bg-input-bg",
                  writingStyle.underline ? "bg-secondary/10 text-secondary" : "",
                ].join(" ")}
                aria-label="Underline"
              >
                <Underline className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="h-6 w-px bg-input-border" aria-hidden="true" />
              <button
                type="button"
                onClick={() => {
                  toggleWritingStyle("unordered");
                  insertWritingPrefix("• ");
                }}
                className={[
                  "rounded p-1 transition-colors hover:bg-input-bg",
                  writingStyle.unordered ? "bg-secondary/10 text-secondary" : "",
                ].join(" ")}
                aria-label="Bulleted list"
              >
                <List className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleWritingStyle("ordered");
                  insertWritingPrefix("1. ");
                }}
                className={[
                  "rounded p-1 transition-colors hover:bg-input-bg",
                  writingStyle.ordered ? "bg-secondary/10 text-secondary" : "",
                ].join(" ")}
                aria-label="Numbered list"
              >
                <ListOrdered className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <span className="text-xs font-medium text-text-secondary">
              Word count:{" "}
              {writingAnswer.trim()
                ? writingAnswer.trim().split(/\s+/).length
                : 0}
            </span>
          </div>
          <textarea
            value={writingAnswer}
            ref={textareaRef}
            onChange={(event) => setWritingAnswer(event.target.value)}
            placeholder="Start writing here..."
            className={[
              "min-h-[132px] w-full resize-none px-5 py-4 text-sm outline-none placeholder:text-text-secondary/60",
              writingStyle.bold ? "font-bold" : "",
              writingStyle.italic ? "italic" : "",
              writingStyle.underline ? "underline" : "",
              writingStyle.unordered || writingStyle.ordered ? "pl-8" : "",
            ].join(" ")}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex w-full items-start gap-2 rounded-[8px] bg-input-bg/35 px-4 py-3 text-xs leading-relaxed text-text-primary sm:max-w-[420px]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-text-secondary" />
            <span>
              You can write your answer in the box above.
              <br />
              Make sure your response is clear and easy to understand.
            </span>
          </p>

          <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:gap-4">
            <Button
              label="Clear"
              type="button"
              width="w-full sm:w-[118px]"
              height="h-[42px]"
              bgColorClass="bg-white border border-input-border hover:bg-input-bg/40"
              textColorClass="text-text-primary"
              className="rounded-[8px] text-sm font-semibold"
              onClick={() => setWritingAnswer("")}
            />
            <Button
              label="Next"
              type="button"
              width="w-full sm:w-[118px]"
              height="h-[42px]"
              bgColorClass="bg-secondary hover:brightness-110"
              textColorClass="text-primary"
              className="rounded-[8px] text-sm font-bold"
              icon={<ArrowRight className="h-4 w-4" aria-hidden="true" />}
              iconPosition="right"
              onClick={handleNext}
            />
          </div>
        </div>
      </section>
    </>
  );

  const renderCompleteStep = () => (
    <section className="mx-auto mt-24 max-w-[620px] rounded-[12px] border border-input-border bg-white px-8 py-10 text-center shadow-[0_4px_16px_rgba(17,19,21,0.06)]">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-secondary/10 text-secondary">
        <Info className="h-8 w-8" aria-hidden="true" />
      </div>
      <h1 className="text-3xl font-bold text-text-primary">
        Training Complete
      </h1>
      <p className="mx-auto mt-4 max-w-[420px] text-sm leading-relaxed text-text-secondary">
        You have completed the practice flow. You can now continue to the real
        placement test.
      </p>
      <div className="mt-7 flex justify-center">
        <Button
          label="Start The Test"
          type="button"
          width="w-[190px]"
          height="h-[50px]"
          bgColorClass="bg-secondary hover:brightness-110"
          textColorClass="text-primary"
          className="rounded-[8px] text-base font-bold shadow-[0_4px_12px_rgba(185,19,23,0.25)]"
          icon={<ArrowRight className="h-5 w-5" aria-hidden="true" />}
          iconPosition="right"
          onClick={goToHome}
        />
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white text-text-primary">
      <header className="grid h-[58px] grid-cols-[1fr_auto_1fr] items-center border-b border-input-border px-7">
        <button
          type="button"
          onClick={goToTraining}
          className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-secondary transition-opacity hover:opacity-75"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Practice Before You Start
        </button>

        <div className="text-center">
          <h1 className="text-base font-bold leading-tight">
            {activeConfig.title}
          </h1>
          <p className="mt-0.5 text-xs font-medium text-text-secondary">
            {activeConfig.label}
          </p>
        </div>

        <Button
          label="End Practice"
          type="button"
          width="w-[108px]"
          height="h-[38px]"
          bgColorClass="bg-input-bg hover:bg-input-border"
          textColorClass="text-text-primary"
          className="justify-self-end rounded-[7px] text-xs font-semibold"
          onClick={goToTraining}
        />
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-6 pb-5 pt-4">
        {step !== "mcq" ? (
          <div className="mb-5 h-[6px] overflow-hidden rounded-full bg-input-bg">
            <div
              className="h-full rounded-full bg-secondary transition-all duration-300"
              style={{ width: progressWidth }}
            />
          </div>
        ) : null}

        {step === "mcq" ? renderMcqStep() : null}
        {step === "speaking" ? renderSpeakingStep() : null}
        {step === "writing" ? renderWritingStep() : null}
        {step === "complete" ? renderCompleteStep() : null}

        {step === "mcq" || step === "speaking" ? (
          <>
            <div className="mt-5 flex justify-center">
              <Button
                label="Next"
                type="button"
                width="w-[136px]"
                height="h-[52px]"
                bgColorClass="bg-secondary hover:brightness-110"
                textColorClass="text-primary"
                className="rounded-[8px] text-base font-bold shadow-[0_4px_12px_rgba(185,19,23,0.25)]"
                onClick={handleNext}
              />
            </div>

            <p className="mt-8 flex items-center justify-center gap-2 text-xs font-medium text-text-primary">
              <Info className="h-4 w-4 text-text-secondary" aria-hidden="true" />
              <span>
                <span className="font-bold">Tip:</span> You cannot go back to a
                previous question.
              </span>
            </p>
          </>
        ) : null}
      </main>

      {modalType ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/35 px-5 backdrop-blur-[1px]">
          <div className="relative w-full max-w-[492px] rounded-[14px] bg-white px-9 pb-9 pt-10 text-center shadow-[0_18px_60px_rgba(17,19,21,0.18)]">
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-text-secondary transition-colors hover:bg-input-bg"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="mx-auto mb-6 grid h-[78px] w-[78px] place-items-center rounded-full border border-secondary/20 bg-secondary/10 text-secondary">
              <AlertTriangle
                className="h-8 w-8"
                strokeWidth={2.6}
                aria-hidden="true"
              />
            </div>

            <h2 className="mx-auto max-w-[360px] text-xl font-bold leading-snug text-text-primary">
              {modalType === "missing-answer"
                ? "Please choose an answer first."
                : modalType === "missing-recording"
                  ? "Please record your speaking answer first."
                  : "Please write your answer first."}
            </h2>
            <p className="mx-auto mt-5 max-w-[330px] text-sm font-medium leading-relaxed text-text-primary">
                  {modalType === "missing-answer"
                    ? "Once you click Next, you will not be able to go back to this question."
                : "Once you click Next, you will not be able to go back to this question."}
            </p>
            <div className="mt-8 flex justify-center">
              <Button
                label="OK"
                type="button"
                width="w-[150px]"
                height="h-[52px]"
                bgColorClass="bg-secondary hover:brightness-110"
                textColorClass="text-primary"
                className="rounded-[8px] text-sm font-bold"
                onClick={() => setModalType(null)}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default TrainingMcqPractice;
