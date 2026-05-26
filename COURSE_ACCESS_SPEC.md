# Course Access Gate — Implementation Spec
## Limitless Yeehaw · Netlify Functions + Stripe + Resend

---

## Overview

When someone buys the $27 course via Stripe, they receive an email with a unique access token. They enter their email + token once at the course gate. The browser stores access in `localStorage` so they never have to enter it again on that device.

---

## New File Structure

```
limitless-yeehaw/
├── netlify/
│   └── functions/
│       ├── stripe-webhook.js     ← NEW: receives Stripe payment events
│       └── validate-token.js     ← NEW: validates email + token at the gate
├── netlify.toml                  ← NEW (or update if exists)
├── course/
│   ├── index.html                ← UPDATE: replace content with gate UI
│   ├── 01-primer.html            ← UPDATE: add silent auth check
│   ├── 02-cast-your-chart.html   ← UPDATE: add silent auth check
│   ├── 03-rising-sign.html       ← UPDATE: add silent auth check
│   ├── 04-sun-and-moon.html      ← UPDATE: add silent auth check
│   ├── 05-houses.html            ← UPDATE: add silent auth check
│   ├── 06-planets.html           ← UPDATE: add silent auth check
│   ├── 07-aspects.html           ← UPDATE: add silent auth check
│   └── 08-planetary-magic.html   ← UPDATE: add silent auth check
└── [everything else untouched]
```

---

## Environment Variables

Add these in Netlify → Site Settings → Environment Variables:

| Key | Where to get it |
|-----|----------------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API Keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Developers → Webhooks (after creating the endpoint) |
| `RESEND_API_KEY` | resend.com → API Keys |

---

## netlify.toml

```toml
[build]
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

---

## Function 1: `netlify/functions/stripe-webhook.js`

**Trigger:** Stripe calls this endpoint when a payment is completed.
**Endpoint:** `https://limitlessyeehaw.com/.netlify/functions/stripe-webhook`

### Logic

1. Receive raw POST body + `stripe-signature` header
2. Verify signature using `stripe.webhooks.constructEvent()` — reject if invalid
3. Check event type is `checkout.session.completed`
4. Extract `customer_email` (or `customer_details.email`) from the event object
5. Generate a unique token: `crypto.randomUUID()`
6. Store in **Netlify Blobs**:
   - Store name: `"course-access"`
   - Key: lowercased email
   - Value: `JSON.stringify({ token, createdAt: Date.now() })`
7. Send email via **Resend** (see email template below)
8. Return `{ status: 200 }`

### Dependencies (install via npm)

```bash
npm install stripe @netlify/blobs resend
```

### Pseudocode

```js
import Stripe from 'stripe';
import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';

export default async (req, context) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return new Response('Webhook signature invalid', { status: 400 });
  }

  if (event.type !== 'checkout.session.completed') {
    return new Response('OK', { status: 200 }); // ignore other events
  }

  const email = event.data.object.customer_details?.email?.toLowerCase();
  if (!email) return new Response('No email found', { status: 400 });

  const token = crypto.randomUUID();

  const store = getStore('course-access');
  await store.set(email, JSON.stringify({ token, createdAt: Date.now() }));

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Staley <hi@limitlessyeehaw.com>',
    to: email,
    subject: 'Your access to Your Year Ahead ✦',
    html: emailTemplate(email, token),
  });

  return new Response('OK', { status: 200 });
};
```

### Email Template (inline in the file)

```js
function emailTemplate(email, token) {
  return `
    <div style="background:#060120;color:#FFF0F8;font-family:Georgia,serif;padding:40px;max-width:540px;margin:0 auto;">
      <p style="font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#5ABCF0;margin-bottom:24px;">Limitless Yeehaw</p>
      <h1 style="font-size:28px;color:#ffffff;margin-bottom:16px;">Welcome to Your Year Ahead ✦</h1>
      <p style="font-size:16px;line-height:1.8;margin-bottom:32px;">
        Your purchase is confirmed. Here's your unique access info — save this email somewhere safe. 
        You'll use these details any time you access the course on a new device.
      </p>
      <div style="background:rgba(152,120,232,0.15);border:1px solid rgba(152,120,232,0.35);border-radius:6px;padding:24px;margin-bottom:32px;">
        <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#E040A8;margin-bottom:12px;">Your Access Details</p>
        <p style="margin-bottom:8px;font-size:14px;color:#C0A8F8;">Email: <strong style="color:#fff;">${email}</strong></p>
        <p style="font-size:14px;color:#C0A8F8;">Token: <strong style="color:#fff;font-family:monospace;font-size:13px;">${token}</strong></p>
      </div>
      <a href="https://limitlessyeehaw.com/course/" 
         style="display:inline-block;background:#FFF0F8;color:#0E0530;font-family:Georgia,serif;font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;text-decoration:none;padding:16px 32px;border-radius:2px;">
        Enter the Course →
      </a>
      <p style="font-size:13px;color:#9878E8;margin-top:40px;">
        Return every birthday — the course never expires. ♡
      </p>
    </div>
  `;
}
```

---

## Function 2: `netlify/functions/validate-token.js`

**Trigger:** Called by the course gate form when a user submits their email + token.
**Endpoint:** `https://limitlessyeehaw.com/.netlify/functions/validate-token`

### Logic

1. Receive POST body: `{ email, token }`
2. Look up the email (lowercased) in Netlify Blobs store `"course-access"`
3. If not found → return `{ valid: false, error: "Email not found" }`
4. Parse stored JSON, compare tokens
5. If match → return `{ valid: true }`
6. If no match → return `{ valid: false, error: "Invalid token" }`

### Pseudocode

```js
import { getStore } from '@netlify/blobs';

export default async (req) => {
  const { email, token } = await req.json();
  if (!email || !token) {
    return Response.json({ valid: false, error: 'Missing fields' }, { status: 400 });
  }

  const store = getStore('course-access');
  const record = await store.get(email.toLowerCase());

  if (!record) {
    return Response.json({ valid: false, error: 'Email not found' });
  }

  const { token: storedToken } = JSON.parse(record);
  const valid = storedToken === token.trim();

  return Response.json({ valid });
};
```

---

## Course Gate UI: `course/index.html`

Replace the current content area with a gate form. On load, check localStorage first:

```js
// At the top of a <script> tag in course/index.html
const access = localStorage.getItem('ly_access');
if (access === 'granted') {
  // hide gate, show course index content
  document.getElementById('gate').style.display = 'none';
  document.getElementById('course-content').style.display = 'block';
} else {
  document.getElementById('gate').style.display = 'block';
  document.getElementById('course-content').style.display = 'none';
}
```

Gate form submit handler:

```js
async function handleSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const token = document.getElementById('token').value;

  const res = await fetch('/.netlify/functions/validate-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, token }),
  });

  const data = await res.json();

  if (data.valid) {
    localStorage.setItem('ly_access', 'granted');
    document.getElementById('gate').style.display = 'none';
    document.getElementById('course-content').style.display = 'block';
  } else {
    document.getElementById('error').textContent = 
      'That email and token didn\'t match — check your purchase confirmation email and try again.';
  }
}
```

Gate HTML (style to match the existing course aesthetic):

```html
<div id="gate">
  <p class="eyebrow">Access Required</p>
  <h2>Enter Your Access Details</h2>
  <p>Check the email you used to purchase for your unique token.</p>
  <form onsubmit="handleSubmit(event)">
    <input id="email" type="email" placeholder="Your email address" required />
    <input id="token" type="text" placeholder="Your access token" required />
    <button type="submit">Enter the Course →</button>
  </form>
  <p id="error" style="color:#F880C0;"></p>
  <p style="margin-top:1rem;font-size:13px;">
    Can't find your token? Email <a href="mailto:hi@limitlessyeehaw.com">hi@limitlessyeehaw.com</a>
  </p>
</div>

<div id="course-content" style="display:none;">
  <!-- existing course index content here -->
</div>
```

---

## Module Pages: Silent Auth Check

Add this script block to the `<head>` of every module page (01 through 08):

```html
<script>
  if (localStorage.getItem('ly_access') !== 'granted') {
    window.location.href = '/course/';
  }
</script>
```

That's it. If they have access → page loads normally. If not → redirected to the gate.

---

## Stripe Webhook Setup

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. URL: `https://limitlessyeehaw.com/.netlify/functions/stripe-webhook`
4. Events to listen for: `checkout.session.completed`
5. Copy the "Signing secret" → add as `STRIPE_WEBHOOK_SECRET` in Netlify env vars

---

## Resend Setup

1. Create account at resend.com (free tier: 3,000 emails/month)
2. Add and verify your domain `limitlessyeehaw.com` (they'll give you DNS records to add)
3. Create an API key → add as `RESEND_API_KEY` in Netlify env vars

---

## Thank-You Page Update

Remove the instruction "Bookmark this page — it's your permanent access link."

Replace with:
> **Check your email.** Your unique access token was just sent to the address you used at checkout. Use it to enter the course — and save that email somewhere safe for future devices.

Also update the course link on `thank-you.html` to point to `/course/` (the gate page).

---

## Testing Checklist

- [ ] Trigger a Stripe test payment (use test mode) → confirm email arrives with token
- [ ] Enter email + token at gate → confirm course index unlocks
- [ ] Navigate to a module page directly → confirm it loads without re-prompting
- [ ] Close browser, reopen, navigate to module → confirm localStorage persists (no re-prompt)
- [ ] Open in a new browser/incognito → confirm gate appears
- [ ] Enter wrong token → confirm error message shows
- [ ] Manually check Netlify Blobs in the dashboard → confirm record was stored

---

## What You Don't Need to Build

- User accounts or passwords
- A database (Netlify Blobs handles it)
- Any changes to the Stripe payment link (just add the webhook endpoint)
- Any changes to the rest of the site
