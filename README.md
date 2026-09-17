# MoonTech for Influencers — Saudi National Day theme

Creator sign-in with the Saudi National Day seasonal theme, matching the
**Influencers** app store assets (the gold lane) so the web flow and the App
Store listing read as one campaign.

Separate project on purpose — nothing else is touched.

```bash
npm install
npm run dev
```

## The flow

```
phone (+ dial code) → OTP over WhatsApp
                    ↘ email + password   (alternate route, either direction)
```

OTP covers empty, filled, verifying, incorrect-code and verified. Demo code is
`911324`; anything else shows the error.

Typeface is **Figtree**, matching the store assets.

## The seasonal switch

It turns itself on and off. **No revert PR needed.**

```
NEXT_PUBLIC_SND_THEME=on     force on  (QA, or an early launch)
NEXT_PUBLIC_SND_THEME=off    force off (kill switch)
unset                        automatic — 16-25 September
```

The window lives in `app/theme/snd.ts`. National Day is 23 September; it opens
a week before and closes two days after.

**The check runs on the client, deliberately** — `AuthShell` resolves it in an
effect, not during render. On the server it would be evaluated at *build time*
and frozen into the static HTML, so a deploy cut before the 16th would never
switch on. That is exactly the failure the window exists to prevent.

## Gold, not green

This app is the **gold lane**; the Brands app is Saudi green. Keeping them
apart is the point — the two apps should never be mistaken for one another.
Do not turn `app/theme/snd.ts` green.

- Ground `#00313A → #002229 46% → #001A20 76% → #00151A`
- Gold `#F4E0B6` / `#D9BB84`, from the Generosity (كرمنا) element sheet, p28
- Palette with page references in `app/theme/snd.ts`

## What the theme changes

| Surface | Inside the window |
|---|---|
| Page ground | SND teal gradient — the Influencers store ramp |
| Lockup | `عزّنا بطبعنا` top-right (guideline p13: a **corner** for digital, never centred). Hidden below `sm`, where it collides with the brandmark |
| Foot | Woven cup hem, tiled |
| Brandmark | Reversed to white |
| Text and fields | Lightened for the dark ground |
| Switch links | Gold |
| **Primary button** | **Unchanged — brand purple** |

The button keeps the colour people already recognise. Unlike the Brands app
there is no white card here, so the *fields* do need a dark-surface treatment —
that is contrast, not decoration.

Deliberately no illustration behind the form. The dallah and hanging-cup
elements are still exported from `components/snd.tsx` if a future surface wants
them, but they crowd a sign-in screen.

## Two asset rules

1. **The lockup is artwork, not type.** `عزّنا بطبعنا` is custom Arabic
   lettering — ship the bitmap, never reset it in a system font, and never
   letter-space Arabic (tracking breaks the joins between letterforms).
2. **The hem and friezes tile, they do not stretch.** Each is one motif cropped
   at natural scale, drawn with `repeat-x`. Resizing one non-uniformly to fill
   a width distorts the weave.

## Notes for integration

- `OtpInput` owns its digits as a fixed-length array and updates them
  functionally; it reports upward in an effect, never inside the state updater
  (that is a set-state-during-render and React warns). Paste, Backspace and
  arrows all work.
- `DIAL_CODES` in `components/ui.tsx` is a short list — a real build wants the
  full set with search. Flags are emoji placeholders.
- The email/password and OTP requests are stand-ins.
- `prefers-reduced-motion` is honoured.
