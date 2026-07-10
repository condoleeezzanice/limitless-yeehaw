# Cal.com Event Setup — Solar Return Walkthrough

Copy-paste reference for the $99 1-on-1 booking. Set this up at cal.com → New Event Type.

---

## Core settings

- **Event title:** Solar Return Walkthrough
- **URL slug:** `solar-return-walkthrough` (gives you `cal.com/your-username/solar-return-walkthrough` — paste this back into `index.html`)
- **Duration:** 60 minutes
- **Location:** Cal Video (built-in), or Zoom/Google Meet if you prefer
- **Price:** $99 USD — turn on the **Stripe** app, set "Require payment" so the slot only confirms once paid
- **Buffer:** add a 15-min buffer *after* the event so notes/reset time is protected
- **Booking notice:** require at least 24 hours' notice; cap to ~4 weeks out
- **Availability:** point this event at an "evenings & weekends" schedule (see below) so it never offers a slot during your day job

---

## Short description (the one-liner under the title)

> An hour with your year-ahead chart — live, just the two of us. We read your solar return together and turn it into something you can actually use.

---

## Full description (the event details body)

> The course hands you the skill. This is the hour where we do it together.
>
> Bring your birth details and whatever you're sitting with, and we'll walk through your solar return chart side by side — the astrological map that resets on your birthday. By the end you'll know the role you're stepping into this year, where your energy is most alive, and which corners of your life are asking for attention.
>
> What the hour holds:
> • Your rising sign and the role you're stepping into this year
> • Where your Sun and Moon are working — what's lit up, what's quiet
> • The houses asking for your attention, in plain language
> • Your questions, out loud, answered
>
> This is a reading, not a course — no prep or astrology knowledge needed on your end. Just come curious.
>
> 60 minutes · live over video · $99, payment secures your spot.

---

## Booking form questions (add these as custom fields)

1. **Full name** — (built-in, required)
2. **Email** — (built-in, required)
3. **Date of birth** — short text, required. Helper: "The day you were born — month, day, year."
4. **Exact time of birth** — short text, required. Helper: "As precise as you can (check your birth certificate). If you truly don't know, write 'unknown' and we'll work around it."
5. **City & state/country of birth** — short text, required. Helper: "Where you were born — this sets your chart."
6. **Anything you're especially hoping to look at?** — long text, optional. Helper: "A question, a worry, a corner of the year you're curious about. Totally fine to leave blank."

---

## Confirmation message (shown after they book + pay)

> You're booked — I'm glad you're coming. ✦
>
> You'll get a calendar invite with the video link. Before we meet, double-check your birth time if you can; it's the one detail that sharpens everything. Bring your questions and an open hour. See you soon. — Staley

---

## After it's live

Done ✓ — real event URL is `https://cal.com/staleys/solar-return-walk-through` (note: slug is `solar-return-walk-through`, not `solar-return-walkthrough` as originally planned). Placeholder in `index.html` has been swapped for this URL.

Still to confirm on Cal.com before pushing live: 15-min buffer after, 24hr-notice/~4-week booking window, evening/weekend availability, the 6 custom booking-form fields above, and the confirmation message above. Then do a test booking to confirm Stripe payment actually gates the slot.

Once confirmed, push:

```bash
git add -A && git commit -m "Add $99 1-on-1 session section + go-live booking link" && git push origin main
```
