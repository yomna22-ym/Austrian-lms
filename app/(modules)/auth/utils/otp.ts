import type { KeyboardEvent, ClipboardEvent } from "react";
import { OTP_LENGTH } from "../schemas";

export function createEmptyOtp(): string[] {
  return Array(OTP_LENGTH).fill("");
}

export function applyOtpDigit(
  otp: string[],
  index: number,
  char: string
): string[] {
  const digit = char.replace(/\D/g, "").slice(-1);
  const next = [...otp];
  next[index] = digit;
  return next;
}

export function applyOtpPaste(
  otp: string[],
  pastedText: string
): { otp: string[]; focusIndex: number } {
  const pasted = pastedText.replace(/\D/g, "").slice(0, OTP_LENGTH);
  const next = [...otp];
  pasted.split("").forEach((d, i) => {
    next[i] = d;
  });
  return {
    otp: next,
    focusIndex: Math.min(pasted.length, OTP_LENGTH - 1),
  };
}

export function handleOtpBackspace(
  otp: string[],
  index: number
): { otp: string[]; focusPrevious: boolean } {
  if (otp[index]) {
    const next = [...otp];
    next[index] = "";
    return { otp: next, focusPrevious: false };
  }
  return { otp, focusPrevious: index > 0 };
}

export type OtpKeyDownHandler = (
  index: number,
  e: KeyboardEvent<HTMLInputElement>
) => void;

export type OtpPasteHandler = (e: ClipboardEvent<HTMLInputElement>) => void;
