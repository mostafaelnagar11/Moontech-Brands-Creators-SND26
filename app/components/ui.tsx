"use client";

/**
 * Creator auth controls.
 *
 * Brand purple throughout — the seasonal theme changes the field around the
 * form, never the primary action. A themed control inside an otherwise
 * familiar sign-in reads as a bug, and the button should keep the colour
 * people already recognise.
 *
 * The `.snd-*` class hooks let globals.css adapt these for the dark seasonal
 * ground (light text, translucent surfaces) without changing any logic.
 */

import { CaretDown, CircleNotch } from "@phosphor-icons/react";

export function PrimaryButton({
  children,
  loading,
  className = "",
  disabled,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const off = disabled || loading;
  return (
    <button
      {...props}
      disabled={off}
      className={`snd-primary flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[15px] font-semibold transition-all ${
        off
          ? "cursor-not-allowed bg-brand/40 text-white/80"
          : "bg-brand text-white hover:bg-brand-dark active:scale-[0.99]"
      } ${className}`}
    >
      {loading ? <CircleNotch size={18} weight="bold" className="animate-spin" /> : children}
    </button>
  );
}

/** The alternate-method link under the button ("Sign in with email"). */
export function SwitchLink({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="mt-5 text-center">
      <button
        {...props}
        style={{ background: "transparent" }}
        className="snd-link text-[14px] font-semibold text-brand transition hover:text-brand-dark"
      >
        {children}
      </button>
    </div>
  );
}

export function TextField({
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  ariaLabel?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-label={ariaLabel ?? placeholder}
      className="snd-field w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-brand-ink outline-none transition placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
    />
  );
}

/** Country dial codes. A real build would use a full list with search. */
export const DIAL_CODES = [
  { code: "+971", flag: "🇦🇪", name: "United Arab Emirates" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
];

export function PhoneField({
  dial,
  setDial,
  number,
  setNumber,
}: {
  dial: string;
  setDial: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
}) {
  const current = DIAL_CODES.find((d) => d.code === dial) ?? DIAL_CODES[0];
  return (
    <div className="flex gap-2.5">
      <div className="snd-field relative flex shrink-0 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-3 py-3.5 transition focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
        <span className="text-[18px] leading-none">{current.flag}</span>
        <span className="snd-dial text-[15px] font-medium text-brand-ink">{current.code}</span>
        <CaretDown size={14} weight="bold" className="snd-caret text-neutral-400" />
        <select
          aria-label="Country dial code"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {DIAL_CODES.map((d) => (
            <option key={d.code} value={d.code}>
              {d.flag} {d.code} — {d.name}
            </option>
          ))}
        </select>
      </div>

      <input
        type="tel"
        inputMode="numeric"
        value={number}
        onChange={(e) => setNumber(e.target.value.replace(/[^\d]/g, ""))}
        placeholder="Mobile number"
        autoComplete="tel-national"
        aria-label="Mobile number"
        className="snd-field w-full min-w-0 rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-[15px] text-brand-ink outline-none transition placeholder:text-neutral-400 focus:border-brand focus:ring-2 focus:ring-brand/15"
      />
    </div>
  );
}
