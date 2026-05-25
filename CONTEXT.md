# Limitless Yeehaw — Project Context

> Paste this at the top of any new Claude session to get up to speed instantly.

---

## What This Is

**Limitless Yeehaw** is Staley Stidham's astrology side hustle and brand.
- Live site: [limitlessyeehaw.com](https://limitlessyeehaw.com)
- GitHub repo: `condoleeezzanice/limitless-yeehaw` (public, deployed via GitHub Pages)
- Local folder: `/Users/staleystidhamlusk/limitless-yeehaw/`
- Staley's email: staley.stidham@tracegains.com
- Staley is based in Oklahoma, is a UX designer by day, astrologer by passion

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
Warm, mystical, Oklahoma-rooted. Not overly precious — grounded woo. Second-person ("you"), present tense, confident.

---

## File Structure (current state)

```
limitless-yeehaw/
├── index.html                    ← Landing page (live, complete)
├── year-ahead-snapshot.html      ← Free interactive tool / course capstone (live, complete)
├── CONTEXT.md                    ← This file
├── COURSE-KNOWLEDGE.md           ← Course content knowledge base
├── css/
│   ├── main.css                  ← Landing page styles
│   ├── snapshot.css              ← Snapshot tool styles
│   └── course.css                ← All course module styles (shared)
└── course/
    ├── index.html                ← Course sales/intro page ✓
    ├── 01-primer.html            ← Module 01: The Beginner Primer ✓
    ├── 02-cast-your-chart.html   ← Module 02: Cast Your Chart ✓
    ├── 03-rising-sign.html       ← Module 03: Your Rising Sign & Ruling Planet ✓
    ← Module 04: Sun & Moon ✓
    ├── 04-sun-and-moon.html
    ├── 05-houses.html            ← Module 05: Reading the Houses ✓
    ├── 06-aspects.html           ← Module 06: Aspects: Lines on the Chart ✓
    └── scripts/                  ← Audio scripts (Staley records from these)
        ├── 01-primer-audio-script.md
        ├── 02-cast-your-chart-audio-script.md
        ├── 03-rising-sign-audio-script.md
        ├── 04-sun-and-moon-audio-script.md
        ├── 05-houses-audio-script.md
        └── 06-aspects-audio-script.md
```

---

## What's Live

### Landing Page (`index.html`)
Sections: Hero → Free Offerings → Course Waitlist → About → Footer

Free offerings listed:
1. **Year Ahead Snapshot Tool** → `year-ahead-snapshot.html`
2. **Notion Template: Birth Chart Tracker** (link TBD — Notion)
3. **Notion Template: Moon Journal** (link TBD — Notion)

Course section: "Astrology for the Rest of Us" — $27 course, waitlist form (collects email). No payment system yet.

### Snapshot Tool (`year-ahead-snapshot.html`)
Interactive solar return reading tool — also serves as the course capstone.
- User selects Solar Return Rising, Sun, Moon signs (dropdowns)
- Generates: animated rainbow aura orb (HTML5 Canvas), SVG chart wheel, three personalized text readings
- Print/Save as PDF button
- All 12 signs × 3 placements = 36 copy entries baked into JS
- Canvas aura: full rainbow hue cycle in 8.3s, `requestAnimationFrame` loop
- Chart wheel: rising at 9 o'clock, signs flow counter-clockwise, `orbXY()` function handles placement

### Course — All Six Modules Complete
The full "Your Year Ahead" course is built and in the repo. All modules link to each other sequentially. The capstone (`year-ahead-snapshot.html`) is already live. See COURSE-KNOWLEDGE.md for full course details.

---

## What's Next (priority order)

1. **Payment integration** — Stripe or Gumroad for the $27 course when ready to launch
2. **Audio recording** — Staley records from scripts in `course/scripts/` and embeds in each module (audio blocks are already stubbed as "audio coming soon")
3. **Wire up landing page course section** — update the "Coming Soon" eyebrow on `index.html` and point the CTA to `course/index.html` once payment is live

## Completed

- ✓ **Course index page** — `course/index.html` — built 2026-05; sales/intro page linking into Module 01
- ✓ **Notion template links** — both live in `index.html`: Self-Care Priority Map + Clear Eyes, Full Hearts Ritual
- ✓ **HTTPS enforcement** — enabled in GitHub Pages settings

## Context Files — Feed These at the Start of Every Session

| File | When to include |
|---|---|
| `CONTEXT.md` | Always |
| `COURSE-KNOWLEDGE.md` | Any course-writing or course-editing session |
| `Personal_Woo_Context.md` | Any session involving voice, tone, astrology philosophy, or Staley's personal chart/worldview |

All three live in `/Users/staleystidhamlusk/limitless-yeehaw/`.

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

**To deploy changes**: `git add . && git commit -m "message" && git push origin main`

---

## Session Workflow Tips

- Start a new session, upload CONTEXT.md (and COURSE-KNOWLEDGE.md if course work), then say what you want to build
- Claude has access to the `/Users/staleystidhamlusk/limitless-yeehaw/` folder — files can be written directly there
- Run `/compact` mid-session if things get long
- Always update context files at the end of a session so the next one picks up cleanly
