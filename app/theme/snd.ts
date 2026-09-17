/**
 * Saudi National Day 2025 — seasonal theme, Creator (Influencers) app.
 *
 * Colours are sampled from the official SND brand guideline, not invented.
 * Page refs are to that PDF:
 *   p16 palette · p13 logo placement · p24-25 traits · p28 design elements
 *
 * **This app is the GOLD lane.** The Brands app uses Saudi green on teal; the
 * Creator app uses gold on the same teal ground, with the Generosity (كرمنا)
 * illustrations — dallah, finjal cups, woven friezes. Keeping them apart is
 * deliberate: the two apps should never be mistaken for one another.
 * Do not turn this file green.
 */

export const SND_PALETTE = {
  saudiGreen: "#008849", // primary — foundation of the visual system
  baseTeal: "#003439", // the guideline's own page ground

  vision: "#7C5D21", // رؤيتنا
  courage: "#607C4F", // شجاعتنا
  determination: "#971A4D", // همتنا
  authenticity: "#5ABA1C", // أصالتنا   ← Brands lane
  generosity: "#0050AF", // كرمنا     ← this app's illustrations
  exceptionalGiving: "#6565E0", // جودنا
} as const;

/** The gold used for ornament and illustration on the dark ground. */
export const SND_GOLD = {
  light: "#F4E0B6",
  base: "#D9BB84",
  deep: "#B8964F",
} as const;

export const SND_INK = {
  onDark: "#F6FAF8",
  onDarkMuted: "rgba(246,250,248,0.60)",
} as const;

/**
 * Panel gradient — the same ramp as the Influencers store panels, so the web
 * flow and the App Store listing read as one campaign.
 */
export const SND_GRADIENT =
  "linear-gradient(158deg, #00313A 0%, #002229 46%, #001A20 76%, #00151A 100%)";

/** Official hashtags (guideline p22). */
export const SND_HASHTAGS = ["#عزنا_بطبعنا", "#SaudiNationalDay"] as const;

/**
 * Assets. The Arabic lockup is supplied artwork with custom lettering — ship
 * the bitmap, never reset it as live text, and never letter-space Arabic
 * (tracking breaks the joins between letterforms).
 *
 * The friezes and hem tile are single motifs cropped at natural scale; tile
 * them with repeat-x. Scaling one non-uniformly to fill a width distorts the
 * weave.
 */
export const SND_ASSETS = {
  lockup: "/snd/snd-lockup.png",
  dallah: "/snd/dallah.png",
  hangingCups: "/snd/hanging-cups.png",
  hemTile: "/snd/hem-tile.png",
  friezeCups: "/snd/frieze-cups.png",
  friezePalm: "/snd/frieze-palm.png",
} as const;

/* ------------------------------------------------------------------ */
/* Activation                                                          */
/* ------------------------------------------------------------------ */

/**
 * The theme turns itself on for a date window and off again, so nobody has to
 * remember to ship a revert.
 *
 *   NEXT_PUBLIC_SND_THEME=on    force on
 *   NEXT_PUBLIC_SND_THEME=off   force off
 *   (unset)                     automatic — see WINDOW
 *
 * Call this on the CLIENT (inside an effect), never during server render — on
 * the server it is evaluated at build time and frozen into the static HTML, so
 * a deploy cut before the window would never switch on.
 */
const WINDOW = { startMonth: 9, startDay: 16, endMonth: 9, endDay: 25 };

export function isSndActive(now: Date = new Date()): boolean {
  const flag = process.env.NEXT_PUBLIC_SND_THEME;
  if (flag === "on") return true;
  if (flag === "off") return false;

  const m = now.getMonth() + 1;
  const d = now.getDate();
  const afterStart = m > WINDOW.startMonth || (m === WINDOW.startMonth && d >= WINDOW.startDay);
  const beforeEnd = m < WINDOW.endMonth || (m === WINDOW.endMonth && d <= WINDOW.endDay);
  return afterStart && beforeEnd;
}
