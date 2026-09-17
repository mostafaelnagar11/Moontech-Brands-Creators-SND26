"use client";

/**
 * SND ornaments for the Creator app — the gold lane.
 *
 * Every illustration here comes from page 28 of the guideline (the Generosity
 * design-element sheet): dallah, finjal cups, and the woven friezes. They are
 * two-tone artwork recoloured by luminance, so their internal light/dark
 * structure survives the tint.
 */

import { SND_ASSETS } from "../theme/snd";

/**
 * A frieze or hem, tiled horizontally.
 *
 * The source is one motif at natural scale. `repeat-x` with `auto 100%` keeps
 * the aspect intact — stretching it to fill a width distorts the weave, which
 * is the single easiest way to make this artwork look wrong.
 */
export function Frieze({
  src = SND_ASSETS.hemTile,
  height = 30,
  opacity = 0.9,
  className = "",
  style,
}: {
  src?: string;
  height?: number;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        height,
        opacity,
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
        ...style,
      }}
    />
  );
}

/**
 * The official `عزّنا بطبعنا` lockup.
 *
 * Guideline p13: in digital layouts the logo sits in a CORNER, not centred.
 */
export function SndLockup({ width = 150, className = "" }: { width?: number; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SND_ASSETS.lockup}
      alt="اليوم الوطني السعودي — Saudi National Day"
      className={className}
      style={{ width, height: "auto" }}
    />
  );
}

/** The dallah — coffee pot and palm fronds, for hospitality and generosity. */
export function Dallah({ width = 320, className = "", style }: { width?: number; className?: string; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SND_ASSETS.dallah}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width, height: "auto", ...style }}
    />
  );
}

/** The hanging finjal cups grid. */
export function HangingCups({ width = 260, className = "", style }: { width?: number; className?: string; style?: React.CSSProperties }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={SND_ASSETS.hangingCups}
      alt=""
      aria-hidden="true"
      className={className}
      style={{ width, height: "auto", ...style }}
    />
  );
}
