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

### Typography
- **Headings**: Palatino Linotype (brand serif), fallback Georgia
- **Body**: Georgia, serif
- **UI/Labels**: system-ui, sans-serif

### Voice
Warm, mystical, Oklahoma-rooted. Not overly precious — grounded woo. Second-person ("you"), present tense, confident.

---

## File Structure

```
limitless-yeehaw/
├── index.html               ← Landing page (live, complete)
├── year-ahead-snapshot.html ← Free interactive tool (live, complete)
├── css/
│   ├── main.css             ← Landing page styles
│   └── snapshot.css         ← Snapshot tool styles (externalized by Staley)
└── CONTEXT.md               ← This file
```

### Planned (not yet built)
```
course/
├── index.html               ← Course sales/intro page
├── 01-foundations.html      ← Module 1
├── 02-solar-return.html     ← Module 2
├── 03-[tbd].html            ← Modules 3–6
└── ...
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
Interactive solar return reading tool.
- User selects Solar Return Rising, Sun, Moon signs (dropdowns)
- Generates: animated rainbow aura orb (HTML5 Canvas), SVG chart wheel, three personalized text readings
- Print/Save as PDF button
- All 12 signs × 3 placements = 36 copy entries baked into JS
- Canvas aura: full rainbow hue cycle in 8.3s, `requestAnimationFrame` loop
- Chart wheel: rising at 9 o'clock, signs flow counter-clockwise, `orbXY()` function handles placement

---

## What's Next (priority order)

1. **Course content** — Build out modules 01–06 as HTML pages
   - ~~Module 01: The Beginner Primer~~ ✓ DONE (course/01-primer.html)
   - Module 02: Cast Your Chart (astro.com walkthrough)
   - Module 03: Your Rising Sign & Ruling Planet
   - Module 04: Sun & Moon
   - Module 05: Reading the Houses
   - Module 06: Aspects: Lines on the Chart
   - ✦ Capstone: Year Ahead Snapshot (already built)
2. **Payment integration** — Stripe or Gumroad for the $27 course when ready to launch
3. **Notion template links** — Add actual URLs once templates are published
4. **HTTPS enforcement** — Enable "Enforce HTTPS" in GitHub Pages settings (may already be available)

## Course Knowledge File

All astrological definitions (in Staley's words), herbal correspondences, writing guidelines, and module status live in:
`/Users/staleystidhamlusk/limitless-yeehaw/COURSE-KNOWLEDGE.md`

**Feed both CONTEXT.md and COURSE-KNOWLEDGE.md at the start of any course-writing session.**

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

- Start a new session, paste this file's contents, then say what you want to build
- Scope each session to one module or one focused task
- Run `/compact` mid-session if things get long
- All files save to `/Users/staleystidhamlusk/limitless-yeehaw/` — push to GitHub when done
