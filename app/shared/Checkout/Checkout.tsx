"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Shield, HelpCircle, Lock, ShieldCheck, CircleCheck } from "lucide-react";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";

/* ── Types ─────────────────────────────────────────────────────────────── */

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

interface CheckoutProps {
  /** Route to navigate to after payment is "completed" */
  successRoute: string;
  item: CheckoutItem;
  summaryLines: CheckoutSummaryLine[];
  total: string;
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

const RADIO_BASE =
  "flex cursor-pointer items-center justify-between rounded-input border px-4 py-3.5 " +
  "transition-all duration-200 ease-out hover:border-secondary/50 " +
  "focus-within:ring-2 focus-within:ring-secondary/20";

interface MethodRowProps {
  id: PaymentMethod;
  label: string;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}

const MethodRow: React.FC<MethodRowProps> = ({
  id,
  label,
  logo,
  selected,
  onSelect,
}) => (
  <label
    htmlFor={`pm-${id}`}
    className={[
      RADIO_BASE,
      selected
        ? "border-secondary bg-secondary/5"
        : "border-input-border bg-white",
    ].join(" ")}
  >
    <div className="flex items-center gap-3">
      <input
        type="radio"
        id={`pm-${id}`}
        name="payment-method"
        value={id}
        checked={selected}
        onChange={onSelect}
        className="accent-secondary h-4 w-4 shrink-0 cursor-pointer"
      />
      <span className="text-sm font-medium text-text-primary">{label}</span>
    </div>
    <span className="shrink-0">{logo}</span>
  </label>
);

/* Card logos */
const CardLogos = () => (
  <div className="flex items-center gap-1.5">
    <span className="rounded bg-[#1A1F71] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
      VISA
    </span>
    <span className="rounded bg-[#EB001B] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
      MC
    </span>
  </div>
);

const PayPalLogo = () => (
  <span className="text-sm font-bold">
    <span className="text-[#003087]">Pay</span>
    <span className="text-[#009cde]">Pal</span>
    <span className="text-[#003087]"> P</span>
  </span>
);

const FawryLogo = () => (
  <span className="rounded bg-[#F7941D] px-2 py-0.5 text-xs font-bold text-white">
    fawry
  </span>
);

const ValuLogo = () => (
  <span className="text-sm font-bold text-[#1E1B5E]">
    valu<span className="text-secondary">*</span>
  </span>
);

const VodafoneLogo = () => (
  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
    V
  </span>
);

/* ── Trust badges ──────────────────────────────────────────────────────── */
const TrustBadges = () => (
  <div className="mt-4 flex flex-col items-center gap-1.5">
    <p className="flex items-center gap-1.5 text-xs text-text-secondary">
      <Shield className="h-3.5 w-3.5" aria-hidden="true" />
      Encrypted Secure Payment
    </p>
    <p className="text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
      Trusted by
    </p>
    <div className="flex items-center gap-4">
      <Lock className="h-5 w-5 text-text-secondary" aria-hidden="true" />
      <ShieldCheck className="h-5 w-5 text-secondary" aria-hidden="true" />
      <CircleCheck className="h-5 w-5 text-[#16a34a]" aria-hidden="true" />
    </div>
  </div>
);

/* ── Main Checkout component ─────────────────────────────────────────── */

const Checkout: React.FC<CheckoutProps> = ({
  successRoute,
  item,
  summaryLines,
  total,
}) => {
  const router = useRouter();
  const [method, setMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePay = () => {
    // No backend — go straight to success
    router.push(successRoute);
  };

  return (
    <div className="min-h-screen w-full bg-white py-8 sm:py-10 lg:py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-1 justify-items-center gap-5 px-4 sm:px-6 sm:justify-items-stretch lg:grid-cols-[1fr_320px] lg:gap-6 lg:px-8">
        {/* Left — payment form (order-2 on mobile so summary shows first) */}
        <div className="order-2 w-full max-w-lg rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-input-border sm:max-w-none sm:p-6 sm:text-left lg:order-1 lg:p-8">
          <h1 className="text-2xl font-bold text-text-primary">
            Secure Checkout
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Please select your preferred payment method and enter your details
            below.
          </p>

          <div className="mt-6 h-px bg-input-border" />

          {/* Payment method selector */}
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-text-primary sm:text-left">
              Select Payment Method
            </p>

            {/* Card */}
            <MethodRow
              id="card"
              label="Credit / Debit Card"
              logo={<CardLogos />}
              selected={method === "card"}
              onSelect={() => setMethod("card")}
            />

            {/* Card fields — visible only when selected */}
            <div
              className={[
                "overflow-hidden transition-all duration-300 ease-out",
                method === "card"
                  ? "max-h-[400px] opacity-100"
                  : "max-h-0 opacity-0",
              ].join(" ")}
              aria-hidden={method !== "card"}
            >
              <div className="flex flex-col gap-4 rounded-b-xl border border-t-0 border-input-border px-4 pb-5 pt-4">
                <Input
                  label="Cardholder Name"
                  width="w-full"
                  placeholder="e.g. Maria Müller"
                  value={cardName}
                  onChange={setCardName}
                  autoComplete="cc-name"
                />
                <Input
                  label="Card Number"
                  width="w-full"
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={setCardNumber}
                  autoComplete="cc-number"
                  suffix={
                    <div className="flex items-center gap-1">
                      <span className="rounded bg-input-bg px-1 text-[9px] font-bold text-text-secondary">
                        CC
                      </span>
                    </div>
                  }
                />
                <div className="grid grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-2">
                  <Input
                    label="Expiry Date"
                    width="w-full"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={setExpiry}
                    autoComplete="cc-exp"
                  />
                  <Input
                    label="CVV"
                    width="w-full"
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
            </div>

            <MethodRow
              id="paypal"
              label="PayPal"
              logo={<PayPalLogo />}
              selected={method === "paypal"}
              onSelect={() => setMethod("paypal")}
            />
            <MethodRow
              id="fawry"
              label="Fawry"
              logo={<FawryLogo />}
              selected={method === "fawry"}
              onSelect={() => setMethod("fawry")}
            />
            <MethodRow
              id="valu"
              label="valU"
              logo={<ValuLogo />}
              selected={method === "valu"}
              onSelect={() => setMethod("valu")}
            />
            <MethodRow
              id="vodafone"
              label="Vodafone Cash"
              logo={<VodafoneLogo />}
              selected={method === "vodafone"}
              onSelect={() => setMethod("vodafone")}
            />
          </div>

          <Button
            label={`Complete Payment ${total}`}
            type="button"
            width="w-full"
            height="h-[54px]"
            bgColorClass="bg-secondary hover:brightness-110 active:brightness-95"
            textColorClass="text-primary"
            className="mt-8 shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            icon={<Shield className="h-4 w-4" aria-hidden="true" />}
            iconPosition="left"
            onClick={handlePay}
          />
        </div>

        {/* Right — order summary (order-1 on mobile so it shows above the form) */}
        <div className="order-1 flex w-full max-w-lg flex-col gap-4 sm:max-w-none lg:order-2">
          <div className="mx-auto w-full max-w-md rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-input-border sm:mx-0 sm:max-w-none sm:p-6 sm:text-left">
            <h2 className="text-base font-bold text-text-primary">
              Payment Summary
            </h2>

            {/* Item */}
            <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-center">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-input-bg">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-text-secondary">
                    <BookIcon />
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-text-primary">
                  {item.title}
                </p>
                <p className="text-xs text-text-secondary">{item.subtitle}</p>
              </div>
            </div>

            <div className="mx-auto mt-5 flex w-full max-w-sm flex-col gap-3 sm:mx-0 sm:max-w-none">
              {summaryLines.map((row, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">
                    {row.label}
                  </span>
                  <span
                    className={[
                      "text-sm font-medium",
                      row.highlight
                        ? "text-secondary"
                        : row.free
                          ? "font-semibold text-secondary"
                          : "text-text-primary",
                    ].join(" ")}
                  >
                    {row.value}
                  </span>
                </div>
              ))}

              <div className="h-px bg-input-border" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-text-primary">
                  Total Amount
                </span>
                <span className="text-base font-bold text-secondary">
                  {total}
                </span>
              </div>
            </div>

            <TrustBadges />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

/* Fallback book icon for items without an image */
const BookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
    />
  </svg>
);
