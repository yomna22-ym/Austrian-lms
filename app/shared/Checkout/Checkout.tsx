"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Banknote,
  ChevronDown,
  Info,
  Landmark,
  Lock,
  LockKeyhole,
  Shield,
  ShieldCheck,
} from "lucide-react";
import Input from "@/app/shared/Input/Input";
import Button from "@/app/shared/Button/Button";

type PaymentGateway = "paymob" | "xpay";
type PaymentMethod = "card" | "wallet" | "fawry" | "valu" | "sympl";

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

interface PaymentMethodOption {
  id: PaymentMethod;
  label: string;
  subtitle: string;
  logo: React.ReactNode;
}

interface WalletProviderLogo {
  name: string;
  srcs: string[];
  fallback: string;
}

const gatewayRows = [
  {
    id: "xpay" as const,
    label: "XPay",
    subtitle: "Credit cards, Fawry, ValU, Sympl",
    logo: <XPayLogo />,
  },
  {
    id: "paymob" as const,
    label: "Paymob",
    subtitle: "Credit cards, wallets, Fawry, ValU, Sympl",
    logo: <PaymobLogo />,
  },
];

const paymobMethodRows: PaymentMethodOption[] = [
  {
    id: "card",
    label: "Credit / Debit Card",
    subtitle: "Pay securely using your card",
    logo: <CardNetworkLogos />,
  },
  {
    id: "wallet",
    label: "Mobile Wallet",
    subtitle: "Vodafone Cash, Orange Cash, Etisalat Cash, Meeza",
    logo: <MobileWalletLogo />,
  },
  {
    id: "fawry",
    label: "Fawry",
    subtitle: "Pay using Fawry",
    logo: <FawryLogo />,
  },
  {
    id: "valu",
    label: "ValU",
    subtitle: "Pay later with ValU",
    logo: <ValuLogo />,
  },
  {
    id: "sympl",
    label: "Sympl",
    subtitle: "Pay later with Sympl",
    logo: <SymplLogo />,
  },
];

const xpayMethodRows: PaymentMethodOption[] = paymobMethodRows.filter(
  (method) => method.id !== "wallet",
);

const walletProviderLogos: WalletProviderLogo[] = [
  {
    name: "Vodafone Cash",
    srcs: ["/Downloads/anavodafone-logo.webp"],
    fallback: "Vodafone",
  },
  {
    name: "Orange Cash",
    srcs: ["/Downloads/orange-logo.webp"],
    fallback: "Orange",
  },
  {
    name: "Etisalat Cash",
    srcs: ["/Downloads/e&-etisalat-logo.webp"],
    fallback: "Etisalat",
  },
  {
    name: "Meeza",
    srcs: ["/Downloads/meeza-seeklogo.png"],
    fallback: "Meeza",
  },
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

function GatewayCard({
  id,
  label,
  subtitle,
  logo,
  selected,
  onSelect,
}: {
  id: PaymentGateway;
  label: string;
  subtitle: string;
  logo: React.ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={[
        "flex w-full items-center justify-between gap-4 rounded-[10px] border px-5 py-5 text-left transition-all duration-200",
        selected
          ? "border-2 border-secondary bg-[#fff6f6] shadow-[0_10px_24px_rgba(185,19,23,0.08)]"
          : "border-[#e8e2e2] bg-white hover:border-secondary/50",
      ].join(" ")}
      aria-pressed={selected}
    >
      <span className="flex min-w-0 items-center gap-4">
        <span
          className={[
            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
            selected ? "border-secondary" : "border-[#cfd4dc]",
          ].join(" ")}
          aria-hidden="true"
        >
          {selected && (
            <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          )}
        </span>
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[#eeeeee] bg-white p-2">
          <PaymentCardIcon />
        </span>
        <span className="min-w-0">
          <span className="block text-[17px] font-bold text-text-primary">
            {label}
          </span>
          <span className="mt-1 block text-[13px] leading-5 text-text-secondary">
            {subtitle}
          </span>
        </span>
      </span>
      <span className="flex h-8 w-[86px] shrink-0 items-center justify-end overflow-hidden">
        {logo}
      </span>
    </button>
  );
}

function PaymentMethodRow({
  id,
  label,
  subtitle,
  logo,
  selected,
  onSelect,
}: PaymentMethodOption & {
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label
      htmlFor={`pm-${id}`}
      className={[
        "flex min-h-[64px] cursor-pointer items-center justify-between gap-4 rounded-[10px] border px-4 py-3 transition-colors",
        selected
          ? "border-secondary bg-[#fff6f6]"
          : "border-[#e8e2e2] bg-white hover:border-secondary/50",
      ].join(" ")}
    >
      <span className="flex min-w-0 items-center gap-3">
        <input
          id={`pm-${id}`}
          type="radio"
          name="payment-method"
          value={id}
          checked={selected}
          onChange={onSelect}
          className="h-5 w-5 shrink-0 cursor-pointer accent-secondary"
        />
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#eeeeee] bg-white p-2">
          <PaymentLeftIcon id={id} />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-bold text-text-primary">
            {label}
          </span>
          <span className="mt-1 block text-[12px] leading-4 text-text-secondary">
            {subtitle}
          </span>
        </span>
      </span>
      <span
        className={[
          "flex min-h-8 shrink-0 items-center justify-end overflow-visible",
          id === "wallet" ? "w-[138px] sm:w-[170px]" : "w-[92px]",
        ].join(" ")}
      >
        {logo}
      </span>
    </label>
  );
}

function PaymentMethodDropdown({
  availableMethods,
  selectedMethod,
  selectedMethodOption,
  open,
  onToggle,
  onSelect,
}: {
  availableMethods: PaymentMethodOption[];
  selectedMethod: PaymentMethod | null;
  selectedMethodOption?: PaymentMethodOption;
  open: boolean;
  onToggle: () => void;
  onSelect: (method: PaymentMethod) => void;
}) {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={[
          "flex min-h-[66px] w-full items-center justify-between gap-4 rounded-[10px] border px-4 py-3 text-left transition-all duration-200",
          open || selectedMethod
            ? "border-secondary bg-[#fff6f6]"
            : "border-[#e8e2e2] bg-white hover:border-secondary/50",
        ].join(" ")}
        aria-expanded={open}
      >
        <span className="flex min-w-0 items-center gap-3">
          <span
            className={[
              "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
              selectedMethod ? "border-secondary" : "border-[#cfd4dc]",
            ].join(" ")}
            aria-hidden="true"
          >
            {selectedMethod && (
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            )}
          </span>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#eeeeee] bg-white p-2">
            <PaymentLeftIcon id={selectedMethod ?? "card"} />
          </span>
          <span className="min-w-0">
            <span className="block text-[15px] font-bold text-text-primary">
              {selectedMethodOption?.label ?? "Select Payment Method"}
            </span>
            <span className="mt-1 block text-[12px] leading-4 text-text-secondary">
              {selectedMethodOption?.subtitle ??
                "Choose one of the available methods for this gateway"}
            </span>
          </span>
        </span>

        <span
          className={[
            "flex shrink-0 items-center gap-3",
            selectedMethodOption?.id === "wallet"
              ? "min-w-[168px] justify-end"
              : "",
          ].join(" ")}
        >
          {selectedMethodOption?.logo}
          <ChevronDown
            className={[
              "h-5 w-5 text-text-secondary transition-transform duration-200",
              open ? "rotate-180" : "",
            ].join(" ")}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <div className="mt-3 grid gap-3 rounded-[12px] border border-[#e8e2e2] bg-white p-3 shadow-[0_14px_32px_rgba(15,23,42,0.08)]">
          {availableMethods.map((method) => (
            <PaymentMethodRow
              key={method.id}
              id={method.id}
              label={method.label}
              subtitle={method.subtitle}
              logo={method.logo}
              selected={selectedMethod === method.id}
              onSelect={() => onSelect(method.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function RedirectMessage({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 rounded-[10px] border border-[#d9e9f7] bg-[#f5fbff] px-4 py-4 text-[14px] leading-6 text-text-secondary">
      <Info
        className="mt-0.5 h-5 w-5 shrink-0 text-secondary"
        aria-hidden="true"
      />
      <p>{children}</p>
    </div>
  );
}

function SecurePaymentNote() {
  return (
    <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[13px] text-text-secondary">
      <Lock className="h-3.5 w-3.5" aria-hidden="true" />
      All transactions are secure and encrypted.
    </p>
  );
}

function AssetLogo({
  alt,
  srcs,
  width,
  height,
  className,
  fallback,
}: {
  alt: string;
  srcs: string[];
  width: number;
  height: number;
  className?: string;
  fallback?: string;
}) {
  const [index, setIndex] = useState(0);
  const currentSrc = srcs[index];

  if (!currentSrc) {
    return (
      <span className="text-[10px] font-bold text-text-secondary">
        {fallback ?? alt}
      </span>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setIndex((currentIndex) => currentIndex + 1)}
    />
  );
}

function PaymobLogo() {
  return (
    <AssetLogo
      alt="Paymob"
      srcs={["/svgs/paymobicon.svg"]}
      width={82}
      height={28}
      className="max-h-7 w-auto object-contain"
      fallback="Paymob"
    />
  );
}

function XPayLogo() {
  return (
    <span
      className="inline-flex h-7 w-[82px] items-center justify-center rounded-[6px] text-[18px] font-extrabold leading-none tracking-[-0.02em] text-[#6f3cc3]"
      aria-label="XPay"
    >
      XPay
    </span>
  );
}

function PaymentCardIcon() {
  return (
    <AssetLogo
      alt="Card"
      srcs={["/svgs/visacard.svg"]}
      width={38}
      height={26}
      className="max-h-[26px] min-w-[28px] object-contain"
      fallback="Card"
    />
  );
}

function PaymentLeftIcon({ id }: { id: PaymentMethod }) {
  if (id === "card") {
    return <PaymentCardIcon />;
  }

  if (id === "wallet") {
    return (
      <AssetLogo
        alt="Mobile Wallet"
        srcs={["/svgs/mobileiconred.svg", "/svgs/mobilesmall.svg"]}
        width={28}
        height={28}
        className="max-h-7 min-w-5 object-contain"
        fallback="Wallet"
      />
    );
  }

  return (
    <Banknote className="h-4 w-4 text-text-secondary" aria-hidden="true" />
  );
}

function CardNetworkLogos() {
  return (
    <span className="flex items-center justify-end gap-2">
      <AssetLogo
        alt="Mastercard"
        srcs={["/svgs/mastercard-icon.svg"]}
        width={32}
        height={22}
        className="max-h-6 w-auto object-contain"
        fallback="MC"
      />
      <AssetLogo
        alt="Visa"
        srcs={["/svgs/visa-icon.svg"]}
        width={38}
        height={22}
        className="max-h-6 w-auto object-contain"
        fallback="Visa"
      />
    </span>
  );
}

function WalletBrandIcon({ name, srcs, fallback }: WalletProviderLogo) {
  return (
    <span className="flex h-7 w-7 items-center justify-center overflow-hidden rounded-full border border-[#eeeeee] bg-white p-1">
      <AssetLogo
        alt={name}
        srcs={srcs}
        width={24}
        height={18}
        className="max-h-[18px] w-auto object-contain"
        fallback={fallback}
      />
    </span>
  );
}

function WalletBrandLogos() {
  return (
    <span className="flex max-w-[140px] flex-wrap items-center justify-end gap-1.5 sm:max-w-[170px]">
      {walletProviderLogos.map((wallet) => (
        <WalletBrandIcon key={wallet.name} {...wallet} />
      ))}
    </span>
  );
}

function MobileWalletLogo() {
  return <WalletBrandLogos />;
}

function FawryLogo() {
  return (
    <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#e8e2e2] bg-white p-1">
      <AssetLogo
        alt="Fawry"
        srcs={["/svgs/fawryicon.svg"]}
        width={28}
        height={28}
        className="max-h-7 w-auto rounded-full object-contain"
        fallback="Fawry"
      />
    </span>
  );
}

function ValuLogo() {
  return (
    <AssetLogo
      alt="ValU"
      srcs={["/svgs/valuicon.svg"]}
      width={54}
      height={24}
      className="max-h-6 w-auto object-contain"
      fallback="ValU"
    />
  );
}

function SymplLogo() {
  return (
    <AssetLogo
      alt="Sympl"
      srcs={["/svgs/symplicon.svg"]}
      width={54}
      height={24}
      className="max-h-6 w-auto object-contain"
      fallback="Sympl"
    />
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
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="82px"
          className="object-cover"
        />
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
  const [selectedGateway, setSelectedGateway] =
    useState<PaymentGateway>("xpay");
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [isMethodDropdownOpen, setIsMethodDropdownOpen] = useState(false);
  const [walletNumber, setWalletNumber] = useState("");
  const [fawryMobileNumber, setFawryMobileNumber] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState(
    defaultPaymentPlanId ?? paymentPlans[0]?.id ?? "",
  );

  const selectedPlan = useMemo(
    () => paymentPlans.find((plan) => plan.id === selectedPlanId),
    [paymentPlans, selectedPlanId],
  );
  const resolvedSummaryLines = selectedPlan?.summaryLines ?? summaryLines;
  const resolvedTotal = selectedPlan?.total ?? total;

  const availableMethods = useMemo(
    () => (selectedGateway === "paymob" ? paymobMethodRows : xpayMethodRows),
    [selectedGateway],
  );

  const selectedMethodOption = useMemo(
    () => availableMethods.find((method) => method.id === selectedMethod),
    [availableMethods, selectedMethod],
  );

  const gatewayStepNumber = paymentPlans.length > 0 ? 2 : 1;
  const methodStepNumber = paymentPlans.length > 0 ? 3 : 2;

  const handleGatewayChange = (gateway: PaymentGateway) => {
    setSelectedGateway(gateway);
    setSelectedMethod(null);
    setIsMethodDropdownOpen(false);
  };

  const ctaLabel = useMemo(() => {
    if (!selectedMethod) {
      return "";
    }

    if (selectedGateway === "xpay") {
      return "Continue to XPay";
    }

    if (selectedMethod === "card") {
      return "Continue to Paymob";
    }

    if (selectedMethod === "wallet") {
      return `Complete Payment ${resolvedTotal}`;
    }

    if (selectedMethod === "fawry") {
      return "Continue";
    }

    return "Continue to Paymob";
  }, [resolvedTotal, selectedGateway, selectedMethod]);

  return (
    <div className="min-h-screen w-full bg-[#f3f3f3] px-4 py-12 sm:px-6 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[minmax(0,845px)_410px] lg:items-start">
        <section className="rounded-[22px] bg-white px-5 py-8 sm:px-8 lg:px-8">
          <h1 className="text-[28px] font-bold leading-tight text-text-primary">
            Secure Checkout
          </h1>
          <p className="mt-3 text-[18px] text-text-secondary">
            {paymentPlans.length > 0
              ? "Choose your payment plan and preferred payment gateway"
              : "Choose your preferred payment gateway and payment method"}
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

          <div className={paymentPlans.length > 0 ? "mt-14" : "mt-7"}>
            <div className="flex items-center gap-4">
              <StepBadge>{gatewayStepNumber}</StepBadge>
              <h2 className="text-[18px] font-bold text-text-primary">
                Select Payment Gateway
              </h2>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {gatewayRows.map((gateway) => (
                <GatewayCard
                  key={gateway.id}
                  id={gateway.id}
                  label={gateway.label}
                  subtitle={gateway.subtitle}
                  logo={gateway.logo}
                  selected={selectedGateway === gateway.id}
                  onSelect={() => handleGatewayChange(gateway.id)}
                />
              ))}
            </div>
          </div>

          <div className="mt-14">
            <div className="flex items-center gap-4">
              <StepBadge>{methodStepNumber}</StepBadge>
              <h2 className="text-[18px] font-bold text-text-primary">
                Select Payment Method
              </h2>
            </div>

            <div className="mt-6">
              <PaymentMethodDropdown
                availableMethods={availableMethods}
                selectedMethod={selectedMethod}
                selectedMethodOption={selectedMethodOption}
                open={isMethodDropdownOpen}
                onToggle={() => setIsMethodDropdownOpen((current) => !current)}
                onSelect={(method) => {
                  setSelectedMethod(method);
                  setIsMethodDropdownOpen(false);
                }}
              />
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            {selectedGateway === "paymob" && selectedMethod === "card" && (
              <RedirectMessage>
                You will be redirected to Paymob to complete your payment
                securely.
              </RedirectMessage>
            )}

            {selectedGateway === "paymob" && selectedMethod === "wallet" && (
              <div className="grid gap-4 rounded-[12px] border border-[#e8e2e2] bg-white p-4 sm:p-5">
                <p className="text-[14px] leading-6 text-text-secondary">
                  You will receive a confirmation prompt on your phone to
                  complete the payment.
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] border border-[#eeeeee] bg-[#fafafa] px-4 py-3">
                  <span className="text-[13px] font-semibold text-text-primary">
                    Supported wallets
                  </span>
                  <WalletBrandLogos />
                </div>
                <Input
                  label="Mobile Wallet Number"
                  width="w-full"
                  height="h-[52px]"
                  placeholder="10 123 456 78"
                  value={walletNumber}
                  onChange={setWalletNumber}
                  autoComplete="tel"
                />
              </div>
            )}

            {selectedGateway === "paymob" && selectedMethod === "fawry" && (
              <div className="grid gap-4 rounded-[12px] border border-[#e8e2e2] bg-white p-4 sm:p-5">
                <p className="text-[14px] leading-6 text-text-secondary">
                  You will receive Fawry payment instructions.
                </p>
                <Input
                  label="Mobile Number"
                  width="w-full"
                  height="h-[52px]"
                  placeholder="10 123 456 78"
                  value={fawryMobileNumber}
                  onChange={setFawryMobileNumber}
                  autoComplete="tel"
                />
              </div>
            )}

            {selectedGateway === "paymob" && selectedMethod === "valu" && (
              <RedirectMessage>
                You will be redirected to Paymob to complete your payment via
                ValU.
              </RedirectMessage>
            )}

            {selectedGateway === "paymob" && selectedMethod === "sympl" && (
              <RedirectMessage>
                You will be redirected to Paymob to complete your payment via
                Sympl.
              </RedirectMessage>
            )}

            {selectedGateway === "xpay" && selectedMethod && (
              <RedirectMessage>
                You will be redirected to XPay to complete your payment
                securely.
              </RedirectMessage>
            )}
          </div>

          {selectedMethod && (
            <>
              <Button
                label={ctaLabel}
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
              <SecurePaymentNote />
            </>
          )}
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
              <div
                key={row.label}
                className="flex items-center justify-between gap-5"
              >
                <span className="text-[16px] text-text-secondary">
                  {row.label}
                </span>
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
