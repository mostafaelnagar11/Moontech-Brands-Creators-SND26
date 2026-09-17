"use client";

/**
 * MoonTech for Influencers — sign in.
 *
 *   phone → OTP (sent over WhatsApp)
 *   email + password  (the alternate route, reachable from either screen)
 */

import { useEffect, useState } from "react";
import { AuthShell, Heading } from "./components/AuthShell";
import { PrimaryButton, SwitchLink, TextField, PhoneField } from "./components/ui";
import { OtpInput } from "./components/OtpInput";

/** Demo only — the real flow verifies server-side. */
const DEMO_CODE = "911324";
const RESEND_SECONDS = 60;

type Screen = "phone" | "otp" | "email";

export default function SignInPage() {
  const [screen, setScreen] = useState<Screen>("phone");
  const [dial, setDial] = useState("+971");
  const [number, setNumber] = useState("");

  return (
    <AuthShell>
      {screen === "phone" && (
        <PhoneStep
          dial={dial}
          setDial={setDial}
          number={number}
          setNumber={setNumber}
          onNext={() => setScreen("otp")}
          onUseEmail={() => setScreen("email")}
        />
      )}

      {screen === "otp" && (
        <OtpScreen
          destination={`${dial} ${number}`}
          onBack={() => setScreen("phone")}
        />
      )}

      {screen === "email" && <EmailStep onUsePhone={() => setScreen("phone")} />}

    </AuthShell>
  );
}

function PhoneStep({
  dial,
  setDial,
  number,
  setNumber,
  onNext,
  onUseEmail,
}: {
  dial: string;
  setDial: (v: string) => void;
  number: string;
  setNumber: (v: string) => void;
  onNext: () => void;
  onUseEmail: () => void;
}) {
  const valid = number.trim().length >= 7;
  return (
    <>
      <Heading
        title="Let's Get Started!"
        subtitle="Enter your mobile number and we'll send you a sign-in code via WhatsApp."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (valid) onNext();
        }}
        className="space-y-4"
      >
        <PhoneField dial={dial} setDial={setDial} number={number} setNumber={setNumber} />
        <PrimaryButton type="submit" disabled={!valid}>
          Continue with OTP
        </PrimaryButton>
      </form>
      <SwitchLink onClick={onUseEmail}>Sign in with email</SwitchLink>
    </>
  );
}

function EmailStep({ onUsePhone }: { onUsePhone: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const valid = /\S+@\S+\.\S+/.test(email) && password.length >= 6;

  return (
    <>
      <Heading title="Sign In with Email" subtitle="Enter your email and password to sign in." />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          setLoading(true);
          setTimeout(() => setLoading(false), 900); // stand-in for the real request
        }}
        className="space-y-3.5"
      >
        <TextField value={email} onChange={setEmail} placeholder="Email" type="email" autoComplete="email" />
        <TextField
          value={password}
          onChange={setPassword}
          placeholder="Password"
          type="password"
          autoComplete="current-password"
        />
        <PrimaryButton type="submit" disabled={!valid} loading={loading} className="!mt-5">
          Sign In
        </PrimaryButton>
      </form>
      <SwitchLink onClick={onUsePhone}>Sign in with phone</SwitchLink>
    </>
  );
}

function OtpScreen({ destination, onBack }: { destination: string; onBack: () => void }) {
  const [code, setCode] = useState("");
  const [state, setState] = useState<"idle" | "verifying" | "error" | "done">("idle");
  const [left, setLeft] = useState(RESEND_SECONDS);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);

  const verify = () => {
    setState("verifying");
    setTimeout(() => setState(code === DEMO_CODE ? "done" : "error"), 900);
  };

  return (
    <>
      <Heading
        title="Check WhatsApp"
        subtitle={`We sent a 6-digit code to ${destination}. Enter it below to sign in.`}
      />

      <OtpInput
        resetKey={resetKey}
        onChange={(v) => {
          setCode(v);
          if (state === "error") setState("idle");
        }}
        error={state === "error"}
        disabled={state === "verifying" || state === "done"}
      />

      {state === "error" && (
        <p className="mt-3 text-[13px] font-medium text-red-500">Incorrect code, Please try again</p>
      )}

      <div className="mt-4">
        {state === "error" || left <= 0 ? (
          <button
            type="button"
            style={{ background: "transparent" }}
            onClick={() => {
              setLeft(RESEND_SECONDS);
              setCode("");
              setState("idle");
              setResetKey((k) => k + 1);
            }}
            className="snd-link text-[14px] font-semibold text-brand transition hover:text-brand-dark"
          >
            Resend Code
          </button>
        ) : (
          <p className="snd-subtitle text-[13.5px] text-neutral-600">
            Resend code after{" "}
            <span className="snd-count font-semibold tabular-nums text-brand-ink">
              {String(Math.floor(left / 60)).padStart(2, "0")}:{String(left % 60).padStart(2, "0")}
            </span>
          </p>
        )}
      </div>

      <PrimaryButton
        onClick={verify}
        disabled={code.length !== 6 || state === "done"}
        loading={state === "verifying"}
        className="mt-6"
      >
        {state === "done" ? "Verified" : "Verify"}
      </PrimaryButton>

      <SwitchLink onClick={onBack}>Use a different number</SwitchLink>
    </>
  );
}
