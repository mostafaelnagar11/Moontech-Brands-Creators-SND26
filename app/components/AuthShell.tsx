"use client";

/**
 * The frame every creator auth screen sits in.
 *
 * Unlike the Brands app there is no card — the form sits directly on the page
 * ground, left-aligned, with the logo in the top-left corner. That matters for
 * the seasonal theme: with no white card to protect it, the fields themselves
 * have to work on the dark field, so `.snd-*` hooks in globals.css give them a
 * dark-surface treatment rather than leaving them light-on-light.
 */

import { useEffect, useState } from "react";
import { isSndActive, SND_GRADIENT, SND_ASSETS, SND_INK } from "../theme/snd";
import { SndLockup, Frieze } from "./snd";

export function AuthShell({ children }: { children: React.ReactNode }) {
  /* Client-only: see the note on isSndActive — evaluating the window during
     server render would freeze it into the static HTML at build time. */
  const [snd, setSnd] = useState(false);
  useEffect(() => setSnd(isSndActive()), []);

  return (
    <div
      data-snd={snd ? "on" : undefined}
      className="relative flex min-h-screen flex-col overflow-hidden"
      style={{ background: snd ? SND_GRADIENT : "#F7F7FA" }}
    >
      {snd && <SndBackdrop />}

      <Brandmark />

      {/* The form column — centred in the page, text left-aligned. */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 pb-24 pt-8">
        <div className="w-full max-w-[385px]">{children}</div>
      </main>

      {snd && (
        <Frieze
          src={SND_ASSETS.hemTile}
          height={34}
          opacity={0.75}
          className="absolute inset-x-0 bottom-0 z-10"
        />
      )}
    </div>
  );
}

/** MOONTech · for Influencers, top-left on every screen. */
function Brandmark() {
  return (
    <div className="relative z-20 flex items-center gap-3 px-8 pt-7 sm:px-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="MoonTech" className="snd-logo h-6 w-auto sm:h-7" />
      <span className="snd-divider h-5 w-px bg-neutral-300" aria-hidden="true" />
      <span className="snd-subbrand text-[14px] font-medium text-brand sm:text-[15px]">
        for Influencers
      </span>
    </div>
  );
}

/**
 * Seasonal backdrop.
 *
 * Deliberately minimal: the lockup in the corner and the woven hem at the foot
 * carry the identity. No illustration behind the form — this is a sign-in
 * screen, and the elements crowd it. `Dallah` and `HangingCups` remain
 * available in components/snd.tsx if a future surface wants them.
 */
function SndBackdrop() {
  /* Lockup — guideline p13: corner placement for digital, never centred. */
  return (
    // Hidden below sm: it collides with the "for Influencers" brandmark on
    // narrow screens. The teal ground and woven hem still carry the theme there.
    <div className="absolute right-10 top-7 z-20 hidden sm:block">
      <SndLockup width={140} />
    </div>
  );
}

/** Screen title + supporting line. Left-aligned, per the design. */
export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-7">
      <h1 className="snd-title text-[34px] font-extrabold leading-tight tracking-tight text-brand-ink sm:text-[38px]">
        {title}
      </h1>
      {subtitle && (
        <p className="snd-subtitle mt-2 text-[15px] leading-relaxed text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}

/** Seasonal hairline under the form — only inside the window. */
export function SndFlourish() {
  const [snd, setSnd] = useState(false);
  useEffect(() => setSnd(isSndActive()), []);
  if (!snd) return null;
  return (
    <Frieze
      src={SND_ASSETS.friezeCups}
      height={22}
      opacity={0.6}
      className="mt-8"
      style={{ color: SND_INK.onDarkMuted }}
    />
  );
}
