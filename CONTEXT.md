# Limitless Yeehaw — Project Context

> Paste this at the top of any new Claude session to get up to speed instantly.

---

## What This Is

**Limitless Yeehaw** is Staley Stidham's astrology side hustle and brand.
- Live site: [limitlessyeehaw.com](https://limitlessyeehaw.com)
- GitHub repo: `condoleeezzanice/limitless-yeehaw` (public, deployed via **Netlify** — NOT GitHub Pages anymore)
- Local folder: `/Users/staleystidhamlusk/limitless-yeehaw/`
- Staley's email: staley.stidham@tracegains.com
- Staley is based in Oklahoma, is a UX designer by day, astrologer and witch by passion

---

## Brand

### Colors
| Name | Hex |
|---|---|
| Deep Plum (background) | `#0E0530` |
| Violet (primary accent) | `#9878E8` |
| Magenta (CTA) | `#E040A8` |
| Pink (highlight) | `#F880C0` |
| Sky Blue (accent) | `#5ABCF0` |
| Blush White (text/bg) | `#FFF0F8` |

CSS variables: `--plum`, `--violet`, `--magenta`, `--pink`, `--sky`, `--blush`, `--mid` (rgba(255,240,248,0.12)), `--serif`, `--body`

### Typography
- **Headings**: Palatino Linotype (brand serif), fallback Georgia — CSS var `--serif`
- **Body**: Georgia, serif — CSS var `--body`
- **UI/Labels**: system-ui, sans-serif

### Voice
Warm, mystical, Oklahoma-rooted. Not overly precious — grounded woo. Second-person ("you"), present tense, confident. "Whimsy is my antidote to attempted conformity."

---

## File Structure (current state)

```
limitless-yeehaw/
├── index.html                    ← Landing page (live, complete)
├── year-ahead-snapshot.html      ← Free interactive tool / course capstone (live, complete)
├── thank-you.html                ← Post-purchase page — tells buyer to check email for token
├── admin.html                    ← Gift access page (not linked publicly) — enter email + admin key to gift course access
├── stripe-card.png               ← Stripe product thumbnail (800×800 branded PNG)
├── favicon.svg                   ← ✦ glyph, magenta-to-pink gradient
├── netlify.toml                  ← Netlify build config (functions dir + esbuild)
├── package.json                  ← Dependencies: stripe, @netlify/blobs, resend
├── .gitignore                    ← Excludes node_modules/, .env
├── CONTEXT.md                    ← This file
├── COURSE-KNOWLEDGE.md           ← Course content knowledge base
├── COURSE_ACCESS_SPEC.md         ← Implementation spec for the access gate (already built)
├── netlify/
│   └── functions/
│       ├── stripe-webhook.js     ← Stripe payment → generates token → stores in Blobs → emails buyer
│       ├── validate-token.js     ← Validates email + token at the course gate
│       └── gift-access.js        ← Admin-keyed endpoint to gift course access + send welcome email
├── css/
│   ├── main.css                  ← Landing page styles
│   ├── snapshot.css              ← Snapshot tool styles
│   └── course.css                ← All course module styles (shared)
└── course/
    ├── index.html                ← Course gate (email + token form); if already authenticated, redirects to contents.html
    ├── contents.html             ← Auth-gated course table of contents — 8 module cards + capstone + workbook links; "Back to course" in all modules links here
    ├── workbook.html             ← Auth-gated printable workbook — placements fill-in, sign/planet glyph reference tables, dynamic herb display (updates from dropdowns), module notes (8 prompts), synthesis section; saves to localStorage automatically
    ├── 01-primer.html            ← Module 01: The Beginner Primer ✓
    ├── 02-cast-your-chart.html   ← Module 02: Cast Your Chart ✓
    ├── 03-rising-sign.html       ← Module 03: Your Rising Sign & Ruling Planet ✓
    ├── 04-sun-and-moon.html      ← Module 04: Sun & Moon ✓
    ├── 05-houses.html            ← Module 05: Reading the Houses ✓
    ├── 06-planets.html           ← Module 06: The Planets ✓
    ├── 07-aspects.html           ← Module 07: Aspects: Lines on the Chart ✓
    ├── 08-planetary-magic.html   ← Module 08: Planetary Magic ✓
    └── scripts/                  ← Audio scripts (Staley records from these)
        ├── 01-primer-audio-script.md
        ├── 02-cast-your-chart-audio-script.md
        ├── 03-rising-sign-audio-script.md
        ├── 04-sun-and-moon-audio-script.md
        ├── 05-houses-audio-script.md
        ├── 06-planets-audio-script.md
        ├── 07-aspects-audio-script.md
        └── 08-planetary-magic-audio-script.md
```

---

## What's Live

### Landing Page (`index.html`)
Sections: Hero → Free Offerings → Course → About → Email List (Kit form) → Footer

Free offerings listed:
1. **The Clear Eyes, Full Hearts Ritual** → `https://limitless-yeehaw.notion.site/the-clear-eyes-full-hearts-ritual`
2. **The Self-Care Priority Map** → `https://limitless-yeehaw.notion.site/self-care-priority-map`

Course section: "Your Year Ahead" — $27. Expanded section structure (top to bottom):
1. Eyebrow + heading + description
2. "What you'll walk away with" — 4-item outcomes block (2-col grid with ✦ markers)
3. "This is for you if" — 4-item self-selection list (→ markers, bordered rows)
4. **Top CTA** — "Get the Course — $27 →" → Stripe Payment Link
5. Section separator + "What's inside" label + 8 module grid + capstone row
6. Details row ($27 · Self-paced · Written · Every year)
7. **Bottom CTA** — same Stripe link
Note: details row reads "Written" (not "Written & audio") — audio commented out pending recording.

Module grid on landing page: lists all 8 modules + capstone (updated).

About section: updated bio — "Eighteen years of astrology. Ten years of witchcraft. Several very illuminating conversations with animals — and a few with people who were no longer technically here. I'm a UX designer by day and a full-time practitioner of the mystical by everything else. Trained at the Boulder Psychic Institute. Whimsy is my antidote to attempted conformity."

### Snapshot Tool (`year-ahead-snapshot.html`)
Interactive solar return reading tool — also serves as the course capstone. Free, no login required.
- User selects SR Rising, Sun, Moon signs (3 dropdowns — no house input needed)
- **House calculation**: whole sign system, derived automatically (`(SIGNS.indexOf(planet) - SIGNS.indexOf(rising) + 12) % 12 + 1`)
- **Generates**:
  - Theme word for the year (by rising sign)
  - Animated rainbow aura orb (HTML5 Canvas, 8.3s hue cycle)
  - SVG chart wheel: rising at 9 o'clock, signs flow clockwise on clock face (counter-clockwise zodiacally), house number labels in inner ring
  - Three reading blocks: Rising (sign + copy), Sun (sign + house number + short house description + sign flavor copy), Moon (sign + house number + short house description + sign flavor copy)
  - Ruling planet section: planet name + actionable "find it on your chart" note per rising sign
  - Herbal allies block: rising sign herbs (personalized) + Sun planet herbs + Moon planet herbs
  - Three dynamic journal prompts: Sun-house prompt, Moon-house prompt, interplay prompt (detects same-house / opposite-house / other)
  - 7th house relationship theme: auto-computed (opposite rising), sign-keyed copy in `house7Copy`
  - 12th house background note: auto-computed (sign before rising), sign-keyed copy in `house12Copy`
  - Solar return year label in footer (dynamic, pulls current year)
  - Anchor phrase section (Moon-house-based, two parts): a grounding sentence (blend of "remember" + "reframe" framing) + a "give yourself permission to..." line. JS objects: `anchorPhrase`, `permissionPhrase`
- Print/Save as PDF button (full print styles for all sections)
- Moon label reads "emotional focus" — NOT "emotional needs" (Staley's preference)
- All copy lives in JS data objects: `risingCopy`, `sunCopy`, `moonCopy`, `sunHouseShort`, `moonHouseShort`, `rulingPlanet`, `sunHouseMantra`, `moonHouseMantra`, `signHerbs`, `sunJournalPrompts`, `moonJournalPrompts`, `getInterplayPrompt()`, `house7Copy`, `house12Copy`, `anchorPhrase`, `permissionPhrase`

### Course — All Eight Modules Complete
The full "Your Year Ahead" course is built and in the repo. All modules link sequentially: 01 → 02 → 03 → 04 → 05 → 06 → 07 → 08 → capstone (year-ahead-snapshot.html). All nav labels read "Module X of 08". See COURSE-KNOWLEDGE.md for full course content details.

**Format**: Written only (currently). Audio blocks exist in all 8 modules but are commented out (`<!-- ... -->`) pending Staley's recordings. To restore a module's audio: remove the `<!--` and `-->` lines wrapping that module's `.audio-block` div. Scripts are in `course/scripts/`.

**Access model**: Token-gated. Users purchase via Stripe → webhook fires → unique token generated → email sent via Resend → buyer enters email + token at `course/index.html` gate → `localStorage` set → all module pages pass through silently. Tokens stored in Netlify Blobs (`course-access` store, key = lowercase email).

**Admin bypass**: `course/index.html?admin=YEEHAW` sets `localStorage` and bypasses the gate — for manually onboarding pre-gate buyers. Remove this eventually once all early buyers are properly in Blobs.

**Early buyers manually onboarded** (pre-gate, added via admin bypass):
- Grace Gordon — thegracegordon@gmail.com
- Lauren Sabolich — lsabolich@gmail.com

---

## Stripe Setup (completed 2026-05-25)

- **Stripe account**: live, verified, bank account linked for payouts
- **Product**: "Your Year Ahead" — $27, one-time, live mode
- **Live Payment Link**: `https://buy.stripe.com/9B68wP5Ps3B20wNeZe2wU00`
- **After-payment redirect**: `https://limitlessyeehaw.com/thank-you.html`
- **Stripe brand settings**: button color `#E040A8` (magenta), background `#ffffff`
- **Statement descriptor**: LIMITLESS YEEHAW
- **Tax collection**: skipped for now (revisit when revenue warrants)
- **Product image**: `stripe-card.png` in repo root — 800×800 branded PNG (purple/magenta gradient, four-pointed star, "Your Year Ahead" serif title)

---

## What's Next (priority order)

### Existing priorities

1. **$99 1-2-1 session** — Add a section to `index.html` offering a 1-hour personal chart walkthrough for $99. Needs a Calendly (or Cal.com) booking link with payment. Discussed and agreed upon — not yet built on the site.
3. **Audio recording** — Staley records from scripts in `course/scripts/`. All 8 scripts exist. Audio blocks are commented out in all 8 modules — to restore after recording, remove the `<!--` / `-->` wrapping each module's `.audio-block`. Also update the "Written" references in `index.html`, `course/index.html` back to "Written & audio" once recordings are live.
4. **Pluto plant list for Module 08** — the Planetary Magic module's plant grid lists 9 planets (no Pluto card). Need Staley's Pluto plant list to add it.
5. **Copy nitpicking** — Staley noted wanting to review and edit copy across modules; no specific modules flagged yet.
6. **Snapshot: additional features (deferred)** — ideas discussed: (a) a question to carry all year (Sun-house, one open question to hold, not answer); (b) a release phrase (what to put down, 12th-house-based); (c) "this year asks you to trust..." (rising or Sun-house, one-line completion); (d) a color/element/texture for the year (rising or Sun sign based); (e) an archetype for the year (named role + one line, rising-based); (f) a body invitation (sign body correspondence, one gentle line). All deferred — implement in future session.
7. **Snapshot: Sun/Moon interplay note** — the `getInterplayPrompt()` "other" case is generic; a richer version would be more specific. Deferred.

---

## Completed (full log)

- ✓ **Course navigation overhaul** (2026-06-18) — Three new pages + nav fixes based on user feedback (Anya):
  - `course/contents.html` — auth-gated table of contents; 8 module cards + capstone + workbook, all clickable; auth check redirects to gate if not logged in
  - `course/workbook.html` — printable fill-in-the-blanks companion; SR placements, sign + planet glyph reference tables, dynamic herb display (auto-fills from sign dropdowns), module notes (8 guided prompts), synthesis section; saves to localStorage automatically
  - `course/index.html` updated — authenticated users now redirect straight to `contents.html` instead of seeing sales content
  - All 8 module "← Back to course" links now go to `contents.html` (was going to main homepage — bug)
  - All 8 modules now have "My Workbook" link in nav-right alongside "← Back to course"

- ✓ **Site launched** — `limitlessyeehaw.com` live via GitHub Pages + custom domain
- ✓ **Favicon** — `favicon.svg` created (✦ glyph, magenta-to-pink gradient, deep plum background); wired into all HTML files
- ✓ **Snapshot tool** — built and live; major rebuild (house calculation, theme word, chart wheel, journal prompts, herbal allies, ruling planet, 7th/12th house blocks, anchor phrase)
- ✓ **Course index page** — `course/index.html` — course intro/sales page linking into Module 01; updated to reflect 8 modules
- ✓ **All 8 course modules** — built, linked sequentially, nav labels all "of 08"
  - 01 Beginner Primer, 02 Cast Your Chart, 03 Rising Sign & Ruling Planet, 04 Sun & Moon, 05 Houses, 06 The Planets, 07 Aspects, 08 Planetary Magic
- ✓ **All 8 audio scripts** — `course/scripts/01` through `08`, ready for Staley to record
- ✓ **Notion template links** — both live in `index.html`: Self-Care Priority Map + Clear Eyes, Full Hearts Ritual; Limitless Yeehaw blurbs added to both Notion templates
- ✓ **Stripe payment integration** — live account, $27 product, Payment Link wired into `index.html` CTA, `thank-you.html` built (post-purchase access page with course link + next steps), course URL removed from public nav
- ✓ **About section** — updated bio across `index.html` and `course/index.html`: 18 years astrology / 10 years witchcraft / BPI / whimsy is antidote to attempted conformity
- ✓ **Kit email form** — moved from below course CTA to dedicated section between About and Footer
- ✓ **Landing page course section expanded** — added "What you'll walk away with" (4-item outcomes grid) and "This is for you if" (4-item self-selection list); CTA now appears at top and bottom of section; "personalized reading" language enforced (not "full personalized reading")
- ✓ **Audio blocks commented out** — all 8 modules; `.audio-block` divs wrapped in HTML comments pending Staley's recordings; all "Written & audio" text references updated to "Written" across `index.html` and `course/index.html`
- ✓ **Modalities added to course** — Module 01: new "One more layer: the modes" section (cardinal/fixed/mutable, concept-card format); Module 03: aside-note callback referencing all three modes in context of SR rising sign
- ✓ **Birth time accuracy fixes** — Module 02: corrected aside-note to clarify that planetary signs + aspects are reliable without birth time, but SR Rising and all house placements are not; Module 03: corrected "ruling planet house placement still applies" — ruling planet is also uncertain when rising sign is uncertain
- ✓ **COURSE-KNOWLEDGE.md updated** — Sign Modalities section added; Sign Nourishment section added (7 of 12 signs: Taurus, Gemini, Leo, Virgo, Libra, Aquarius, Sagittarius)
- ✓ **Stale file cleanup** — deleted `course/06-aspects.html` (orphaned duplicate from renumbering)
- ✓ **Sign nourishment completed** — All 12 signs added to COURSE-KNOWLEDGE.md (Aries, Cancer, Scorpio, Capricorn, Pisces added to complete the set)
- ✓ **Sign nourishment integrated into Module 03** — nourishment line added under each sign's herb entry; styled in magenta to distinguish from herb entries (sky blue); intro paragraph updated
- ✓ **Planetary nourishment completed** — All 10 planets added to COURSE-KNOWLEDGE.md (foods + planetary balancing relationships)
- ✓ **Planetary nourishment integrated into Module 08** — new Section 6 "Planetary nourishment & balancing" added before "Putting it all together"; one entry per planet with foods + balancing notes as line-by-line lists; module-sub updated
- ✓ **Module 05 empty houses expanded** — replaced "Focus on occupied houses" with a fuller explanation: sign on cusp gives flavor, planetary ruler technique (e.g. Gemini on 11th → find Mercury) shows where the energy is sourced; birth time caveat included
- ✓ **Module 03 planet lists fixed** — concept cards ("Personal planets" / "Social & outer planets") now list each planet on its own line instead of comma-separated inline
- ✓ **Migrated from GitHub Pages to Netlify** — site now deploys from GitHub → Netlify; SiteGround DNS updated (removed 4 GitHub Pages A records, added Netlify A record 75.2.60.5 + www CNAME → limitlessyeehaw.netlify.app); SSL provisioned
- ✓ **Token-gated course access built** — Netlify Functions + Stripe webhook + Resend email + Netlify Blobs; buyers receive unique token by email after purchase; gate on course/index.html; all 8 module pages have silent auth check
- ✓ **Resend domain verified** — limitlessyeehaw.com verified in Resend; DKIM + SPF (including amazonses.com) added to SiteGround DNS
- ✓ **Stripe webhook configured** — endpoint `https://limitlessyeehaw.com/.netlify/functions/stripe-webhook` listening for `checkout.session.completed`
- ✓ **Netlify env vars set** — STRIPE_SECRET_KEY, RESEND_API_KEY, STRIPE_WEBHOOK_SECRET
- ✓ **Admin bypass added then replaced** — `course/index.html?admin=YEEHAW` used initially for manually onboarding pre-gate buyers; removed 2026-05-31 and replaced with gift access system (see below)
- ✓ **Monetization strategy brainstormed** — $99 1-2-1 session agreed upon; tiered community pricing discussed (not yet built)
- ✓ **Module 05 course copy edits** (2026-05-27):
  - 7th house copy updated to clarify it's the house of **longterm, committed** relationships (not casual or early-stage); added "this is not the house of casual connections or early-stage dating"
  - Knowledge base internal reference fixed — "full list in course knowledge base" replaced with forward reference to remaining modules introducing planet herbs
  - End-of-module transition paragraph fixed: removed "last module before the capstone" (wrong), corrected Module 06 description (it's The Planets, not Aspects)
- ✓ **Module 07 copy fix** — "this is the last module before the capstone" corrected; Module 08 now properly referenced as the final module
- ✓ **Module 04 SR Sun clarification** — Added two paragraphs to "A note on the SR Sun sign" section explaining that the SR Sun is **always the same sign as the natal Sun** (the Sun completes one full year cycle); what changes each year is the **house** it lands in. This is a key concept for users new to solar returns.
- ✓ **Cusp definition + diagram added to Module 05** — inline SVG chart wheel diagram showing all 12 house cusps as dividing lines, with one cusp highlighted in magenta and labeled "cusp / dividing line", ASC labeled as "1st house cusp". Placed right before the first use of the word "cusp" in the empty houses section. Copy clarifies that in whole sign houses, each cusp is also where a zodiac sign begins (house boundary = sign boundary, same line). All four axis lines (ASC/IC/DSC/MC) styled consistently in the same purple — no glow filter on ASC.
- ✓ **Kit email form fully updated** — HTML label in `index.html` updated; Kit form dashboard updated by Staley (2026-05-31): heading → "Join the list", subtext → "New work, early access, and the occasional astrology thought I couldn't keep to myself."
- ✓ **Accessibility audit completed** (2026-05-27) — Full WCAG 2.1 AA audit run. 6 issues found. 4 fixed same session (see below). 3 remain in "What's Next".
- ✓ **Accessibility fixes applied** (2026-05-27) — All critical and major course-page issues resolved:
  - **Focus indicators**: `outline: none` removed from gate inputs (`course/index.html`) and snapshot select (`css/snapshot.css`). Pattern used everywhere: `{focus}` suppresses browser default for mouse, `:focus-visible` adds violet outline for keyboard-only. Global `:focus-visible` rule added to `css/course.css`.
  - **Skip links**: `.skip-link` style added to `css/course.css`; skip-to-content link added to all 9 course pages (course/index.html + modules 01–08). Each module's `<main>` gets `id="main-content"` as the target.
  - **Nav landmarks**: `aria-label="Course"` added to `<nav>` in all 8 module pages; `aria-label="Site"` on `course/index.html` nav.
  - **Gate error ARIA**: `#gate-error` gets `role="alert" aria-live="polite" aria-atomic="true"` — screen readers now announce errors automatically when they appear.
  - **Gate button loading state**: `aria-busy="true"` set on submit button during fetch; removed on both success and error paths.
  - **Contrast bumps**: `.nav-module-label` opacity raised from `0.4` → `0.55`; `.audio-placeholder` from `0.35` → `0.55` — both in `css/course.css`.
- ✓ **Previous module navigation added** (2026-05-27) — Modules 02–08 now have a "← Back to Module 0X" link at the bottom left, styled to match the nav's "← Back to course" link (`.prev-module-btn` class, violet, opacity 0.85, no box/gradient). Module 01 has no back button. Layout: `.module-nav` changed to `space-between`; `.next-module-btn:only-child { margin-left: auto; }` keeps the next button right-aligned when no prev button exists.
- ✓ **Remaining accessibility fixes applied** (2026-05-31) — All 3 outstanding items from the 2026-05-27 audit resolved:
  - **Serif font halation**: `body` in `css/course.css` gets `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale`; `.module-title` and `.section-heading` changed from `font-weight: normal` to `font-weight: 500`.
  - **About section contrast**: `css/main.css` gradient endpoint darkened from `#E03880` to `#B02860` — brings text contrast above 4.5:1 AA.
  - **Decorative stars aria-hidden**: `aria-hidden="true"` added to `<svg class="stars">` in `index.html` hero.
- ✓ **Module 05 copy edits** (2026-05-31) — Removed "dormant" framing from empty houses section; pullquote and surrounding paragraphs rewritten. House keywords layout fixed (`width: 100%` on `.house-ref-keywords`) so keywords always sit on their own row. Module 08 "The table" → "The plate" in module sub copy.
- ✓ **Audio scripts synced** (2026-05-31) — Module 05 script updated (module count, empty houses language, closing transition). Module 07 script fixed (was labelled "Module 06 / the last one" — corrected to Module 07, closing now sends to Module 08 instead of wrapping the course).
- ✓ **Gift access system built** (2026-05-31) — `?admin=YEEHAW` bypass removed from `course/index.html`. Replaced with: `netlify/functions/gift-access.js` (validates `ADMIN_SECRET_KEY` env var, generates token, stores in Blobs, sends welcome email via Resend) + `admin.html` (password-gated gift form, not linked from anywhere on the site). To gift access: go to `limitlessyeehaw.com/admin.html`, enter recipient email + admin key. **Setup required**: add `ADMIN_SECRET_KEY` to Netlify environment variables (Netlify → Site Settings → Environment Variables).

---

## git push workflow

Claude cannot push to GitHub directly (network restriction in sandbox). Staley pushes manually.

**Standard push**:
```bash
git add -A && git commit -m "message" && git push origin main
```

**If index.lock error**:
```bash
rm .git/index.lock
git add -A && git commit -m "message" && git push origin main
```

---

## GitHub / Deployment

- **GitHub username**: condoleeezzanice
- **Repo**: `condoleeezzanice/limitless-yeehaw`
- **Branch**: `main`
- **Hosting**: Netlify (NOT GitHub Pages — migrated 2026-05-26)
- **Netlify site**: `limitlessyeehaw.netlify.app` (also accessible at custom domain)
- **Custom domain**: limitlessyeehaw.com
- **DNS host**: SiteGround
- **DNS records (current)**:
  - A record `limitlessyeehaw.com` → `75.2.60.5` (Netlify)
  - CNAME `www` → `limitlessyeehaw.netlify.app`
  - TXT `resend._domainkey` → DKIM value (Resend domain verification)
  - TXT `limitlessyeehaw.com` → `v=spf1 include:spf.improvmx.com include:amazonses.com ~all`
  - MX records → ImprovMX (email forwarding: hi@limitlessyeehaw.com → hi@staleystidham.info)
  - DMARC record

---

## Context Files — Feed These at the Start of Every Session

| File | When to include |
|---|---|
| `CONTEXT.md` | Always |
| `COURSE-KNOWLEDGE.md` | Any course-writing or course-editing session |
| `Personal_Woo_Context.md` | Any session involving voice, tone, astrology philosophy, or Staley's personal chart/worldview |

All three live in `/Users/staleystidhamlusk/limitless-yeehaw/`.

---

## Session Workflow Tips

- Start a new session, upload CONTEXT.md (and COURSE-KNOWLEDGE.md if course work), then say what you want to build
- Claude has access to the `/Users/staleystidhamlusk/limitless-yeehaw/` folder — files can be written directly there
- Run `/compact` mid-session if things get long
- Always update context files at the end of a session so the next one picks up cleanly
