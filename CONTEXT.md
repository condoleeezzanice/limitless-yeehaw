# Limitless Yeehaw — Project Context

> Paste this at the top of any new Claude session to get up to speed instantly.

---

## What This Is

**Limitless Yeehaw** is Staley Stidham's astrology side hustle and brand.
- Live site: [limitlessyeehaw.com](https://limitlessyeehaw.com)
- GitHub repo: `condoleeezzanice/limitless-yeehaw` (public, deployed via GitHub Pages)
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
├── thank-you.html                ← Post-purchase access page (Stripe redirect target)
├── stripe-card.png               ← Stripe product thumbnail (800×800 branded PNG)
├── favicon.svg                   ← ✦ glyph, magenta-to-pink gradient
├── CONTEXT.md                    ← This file
├── COURSE-KNOWLEDGE.md           ← Course content knowledge base
├── css/
│   ├── main.css                  ← Landing page styles
│   ├── snapshot.css              ← Snapshot tool styles
│   └── course.css                ← All course module styles (shared)
└── course/
    ├── index.html                ← Course intro/sales page (post-purchase entry point)
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

Course section: "Your Year Ahead" — $27. Primary CTA "Get the Course — $27 →" links to live Stripe Payment Link. Kit email form is in its own section between About and Footer (moved from below the course CTA).

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

**Access model**: course is not in public nav. Users purchase via Stripe → redirected to thank-you.html → thank-you.html contains the course link. course/index.html is the entry point inside the course.

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

1. **Audio recording** — Staley records from scripts in `course/scripts/`. All 8 scripts exist. Audio blocks are already stubbed as "audio coming soon" in each module. Once recorded, embed audio player in the `.audio-block` in each module HTML.
2. **Snapshot: additional features (deferred)** — ideas discussed: (a) a question to carry all year (Sun-house, one open question to hold, not answer); (b) a release phrase (what to put down, 12th-house-based); (c) "this year asks you to trust..." (rising or Sun-house, one-line completion); (d) a color/element/texture for the year (rising or Sun sign based); (e) an archetype for the year (named role + one line, rising-based); (f) a body invitation (sign body correspondence, one gentle line). All deferred — implement in future session.
3. **Snapshot: Sun/Moon interplay note** — the `getInterplayPrompt()` "other" case is generic; a richer version would be more specific. Deferred.
4. **Pluto plant list for Module 08** — the Planetary Magic module lists 9 planets of plants (no Pluto). Need to ask Staley or research.
5. **Copy nitpicking** — Staley noted wanting to review and edit copy across modules; no specific modules flagged yet.
6. **Sign nourishment — finish remaining 5 signs** — Taurus, Gemini, Leo, Virgo, Libra, Aquarius, Sagittarius are done (in COURSE-KNOWLEDGE.md). Still needed: **Aries, Cancer, Scorpio, Capricorn, Pisces**. Once all 12 are complete, weave into course content (likely Module 03, alongside each sign's herb entry).
7. **Modalities section in Module 01** — brief cardinal/fixed/mutable overview added after signs intro. Callback added to Module 03 rising sign section.

---

## Completed (full log)

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
- ✓ **Stale file cleanup** — deleted `course/06-aspects.html` (orphaned duplicate from renumbering)

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
- **Pages source**: root of main branch
- **Custom domain**: limitlessyeehaw.com (configured in GitHub Pages settings)
- **DNS host**: SiteGround
- **DNS records**:
  - 4 × A records → 185.199.108.153, .109.153, .110.153, .111.153
  - CNAME `www` → `condoleeezzanice.github.io`

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
