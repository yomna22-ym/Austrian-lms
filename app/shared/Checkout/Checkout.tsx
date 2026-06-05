"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CreditCard,
  HelpCircle,
  Landmark,
  Lock,
  LockKeyhole,
  Shield,
  ShieldCheck,
} from "lucide-react";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";

type PaymentMethod = "card" | "paypal" | "fawry" | "valu" | "vodafone";

export interface CheckoutItem {
  image?: string;
  title: string;
  subtitle: string;
}

export interface CheckoutSummaryLine {
  label: string;
  value: string;
  highlight?: boolean;
  free?: boolean;
}

export interface CheckoutPaymentPlan {
  id: string;
  eyebrow?: string;
  title: string;
  description: string;
  amount: string;
  bestValue?: boolean;
  ticketLabel?: string;
  summaryLines: CheckoutSummaryLine[];
  total: string;
}

interface CheckoutProps {
  successRoute: string;
  item: CheckoutItem;
  summaryLines: CheckoutSummaryLine[];
  total: string;
  paymentPlans?: CheckoutPaymentPlan[];
  defaultPaymentPlanId?: string;
}

const methodRows = [
  { id: "paypal" as const, label: "PayPal", logo: <PayPalLogo /> },
  { id: "fawry" as const, label: "Fawry", logo: <FawryLogo /> },
  { id: "valu" as const, label: "valU", logo: <ValuLogo /> },
  { id: "vodafone" as const, label: "Vodafone Cash", logo: <VodafoneLogo /> },
];

function StepBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#a60012] text-[15px] font-bold text-white">
      {children}
    </span>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: CheckoutPaymentPlan;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "relative flex min-h-[206px] flex-col items-start rounded-[10px] border bg-white px-6 py-6 text-left transition-all duration-200",
        selected
          ? "border-2 border-secondary shadow-[0_12px_24px_rgba(185,19,23,0.08)]"
          : "border-[#e8e2e2] hover:border-secondary/50",
      ].join(" ")}
    >
      {plan.bestValue && (
        <span className="absolute -top-3 left-6 rounded-[4px] bg-[#0b9b63] px-3 py-1 text-[10px] font-bold uppercase text-white">
          Best Value
        </span>
      )}
      {plan.eyebrow && (
        <span className="rounded-[4px] bg-[#eeeeee] px-2 py-1 text-[10px] font-extrabold uppercase text-text-secondary">
          {plan.eyebrow}
        </span>
      )}
      <span className="mt-4 text-[18px] font-bold text-text-primary">
        {plan.title}
      </span>
      <span className="mt-3 text-[13px] leading-6 text-text-secondary">
        {plan.description}
      </span>
      {plan.ticketLabel && (
        <span className="mt-4 rounded-[4px] bg-[#d9f7eb] px-2 py-1 text-[11px] font-extrabold uppercase text-[#008a5a]">
          {plan.ticketLabel}
        </span>
      )}
      <span className="mt-auto pt-5 text-[16px] font-extrabold text-[#a60012]">
        {plan.amount}
      </span>
    </button>
  );
}

function MethodRow({
  id,
  label,
  logo,
  selected,
  onSelect,
}: {
  id: PaymentMethod;
  label: string;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      htmlFor={`pm-${id}`}
      className={[
        "flex h-[58px] cursor-pointer items-center justify-between rounded-[8px] border px-4 transition-colors",
        selected
          ? "border-secondary bg-white"
          : "border-[#efb8b8] bg-white hover:border-secondary/70",
      ].join(" ")}
    >
      <span className="flex items-center gap-3">
        <input
          id={`pm-${id}`}
          type="radio"
          name="payment-method"
          value={id}
          checked={selected}
          onChange={onSelect}
          className="h-5 w-5 cursor-pointer accent-secondary"
        />
        {id === "card" ? (
          <CreditCard className="h-5 w-5 text-text-secondary" aria-hidden="true" />
        ) : (
          <Banknote className="h-5 w-5 text-text-secondary" aria-hidden="true" />
        )}
        <span className="text-[16px] font-medium text-text-primary">{label}</span>
      </span>
      {logo}
    </label>
  );
}

function PayPalLogo() {
  return <span className="text-[28px] font-extrabold text-[#12327a]">P</span>;
}

function FawryLogo() {
  return (
    <span className="rounded bg-[#ffe34d] px-2 py-1 text-[12px] font-extrabold text-[#0b67b2]">
      fawry
    </span>
  );
}

function ValuLogo() {
  return (
    <span className="text-[20px] font-extrabold text-[#00a99d]">
      valu<span className="text-secondary">*</span>
    </span>
  );
}

function VodafoneLogo() {
  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white">
      cash
    </span>
  );
}

function TrustBadges() {
  return (
    <div className="mt-16 flex flex-col items-center gap-2 text-[#a8adb4]">
      <p className="flex items-center gap-1.5 text-[12px]">
        <Lock className="h-3.5 w-3.5" aria-hidden="true" />
        Encrypted Secure Payment
      </p>
      <p className="text-[12px] font-semibold uppercase tracking-[0.08em]">
        Trusted by
      </p>
      <div className="flex items-center gap-4">
        <ShieldCheck className="h-7 w-7" aria-hidden="true" />
        <Shield className="h-7 w-7" aria-hidden="true" />
        <LockKeyhole className="h-7 w-7" aria-hidden="true" />
      </div>
    </div>
  );
}

function SummaryImage({ item }: { item: CheckoutItem }) {
  return (
    <div className="relative h-[82px] w-[82px] shrink-0 overflow-hidden bg-[#f2f2f2]">
      {item.image ? (
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      ) : (
        <div className="flex h-full items-center justify-center text-text-secondary">
          <Landmark className="h-8 w-8" aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export default function Checkout({
  successRoute,
  item,
  summaryLines,
  total,
  paymentPlans = [],
  defaultPaymentPlanId,
}: CheckoutProps) {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(
    defaultPaymentPlanId ?? paymentPlans[0]?.id ?? ""
  );

  const selectedPlan = useMemo(
    () => paymentPlans.find((plan) => plan.id === selectedPlanId),
    [paymentPlans, selectedPlanId]
  );
  const resolvedSummaryLines = selectedPlan?.summaryLines ?? summaryLines;
  const resolvedTotal = selectedPlan?.total ?? total;

  return (
    <div className="min-h-screen w-full bg-[#f3f3f3] px-4 py-12 sm:px-6 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,845px)_410px] lg:items-start">
        <section className="rounded-[22px] bg-white px-5 py-8 sm:px-8 lg:px-8">
          <h1 className="text-[28px] font-bold leading-tight text-text-primary">
            Secure Checkout
          </h1>
          <p className="mt-3 text-[18px] text-text-secondary">
            {paymentPlans.length > 0
              ? "Choose your payment plan and preferred payment method"
              : "Choose your preferred payment method"}
          </p>

          {paymentPlans.length > 0 && (
            <div className="mt-7">
              <div className="flex items-center gap-4">
                <StepBadge>1</StepBadge>
                <h2 className="text-[18px] font-bold text-text-primary">
                  Select Payment Plan
                </h2>
              </div>
              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {paymentPlans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    selected={plan.id === selectedPlanId}
                    onSelect={() => setSelectedPlanId(plan.id)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className={paymentPlans.length > 0 ? "mt-20" : "mt-7"}>
            <h2 className="text-[20px] font-medium text-text-primary">
              Select Payment Method
            </h2>
            <div className="mt-5 grid gap-4">
              <MethodRow
                id="card"
                label="Credit / Debit Card"
                logo={null}
                selected={method === "card"}
                onSelect={() => setMethod("card")}
              />

              {method === "card" && (
                <div className="grid gap-4">
                  <Input
                    label="Cardholder Name"
                    width="w-full"
                    height="h-[52px]"
                    placeholder="e.g. Maria Muller"
                    value={cardName}
                    onChange={setCardName}
                    autoComplete="cc-name"
                  />
                  <Input
                    label="Card Number"
                    width="w-full"
                    height="h-[52px]"
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={setCardNumber}
                    autoComplete="cc-number"
                    suffix={
                      <span
                        className="rounded bg-[#e8e8e8] px-1.5 py-0.5 text-[10px] font-bold text-text-secondary"
                        aria-hidden="true"
                      >
                        CC
                      </span>
                    }
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Input
                      label="Expiry Date"
                      width="w-full"
                      height="h-[52px]"
                      placeholder="MM/YY"
                      value={expiry}
                      onChange={setExpiry}
                      autoComplete="cc-exp"
                    />
                    <Input
                      label="CVV"
                      width="w-full"
                      height="h-[52px]"
                      placeholder="123"
                      value={cvv}
                      onChange={setCvv}
                      autoComplete="cc-csc"
                      suffix={
                        <HelpCircle
                          className="h-4 w-4 text-text-secondary"
                          aria-label="3-digit security code on the back of your card"
                        />
                      }
                    />
                  </div>
                </div>
              )}

              {methodRows.map((row) => (
                <MethodRow
                  key={row.id}
                  id={row.id}
                  label={row.label}
                  logo={row.logo}
                  selected={method === row.id}
                  onSelect={() => setMethod(row.id)}
                />
              ))}
            </div>
          </div>

          <Button
            label={`Complete Payment ${resolvedTotal}`}
            type="button"
            width="w-full"
            height="h-[60px]"
            bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
            textColorClass="text-primary"
            className="mt-10 rounded-[6px] text-[20px] font-bold"
            icon={<LockKeyhole className="h-5 w-5" aria-hidden="true" />}
            iconPosition="left"
            onClick={() => router.push(successRoute)}
          />
        </section>

        <aside className="rounded-[22px] bg-white px-8 py-9">
          <h2 className="text-[24px] font-medium text-text-primary">
            Payment Summary
          </h2>
          <div className="mt-9 flex items-center gap-4">
            <SummaryImage item={item} />
            <div>
              <p className="text-[21px] font-medium leading-tight text-text-primary">
                {item.title}
              </p>
              <p className="mt-1 inline-flex rounded-[4px] bg-[#fff0f0] px-2 py-0.5 text-[10px] font-extrabold uppercase text-secondary">
                {item.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-8">
            {resolvedSummaryLines.map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-5">
                <span className="text-[16px] text-text-secondary">{row.label}</span>
                <span
                  className={[
                    "text-[16px] font-bold",
                    row.free
                      ? "text-[#08a34f]"
                      : row.highlight
                        ? "text-secondary"
                        : "text-text-primary",
                  ].join(" ")}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-9 h-px bg-[#efd8d8]" />
          <div className="mt-5 flex items-center justify-between gap-5">
            <span className="text-[22px] font-bold text-text-primary">
              Total Amount
            </span>
            <span className="text-[26px] font-bold text-secondary">
              {resolvedTotal}
            </span>
          </div>

          <TrustBadges />
        </aside>
      </div>
    </div>
  );
}
