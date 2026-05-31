import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { email, adminKey } = body;

  if (!email || !adminKey) {
    return Response.json({ success: false, error: 'Missing email or admin key' }, { status: 400 });
  }

  // Validate admin key
  if (adminKey !== process.env.ADMIN_SECRET_KEY) {
    return Response.json({ success: false, error: 'Invalid admin key' }, { status: 401 });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Generate token and store in Netlify Blobs
  const token = crypto.randomUUID();
  const store = getStore('course-access');
  await store.set(normalizedEmail, JSON.stringify({ token, createdAt: Date.now(), gifted: true }));

  // Send welcome email via Resend
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: 'Staley <hi@limitlessyeehaw.com>',
    to: normalizedEmail,
    subject: 'Your access to Your Year Ahead ✦',
    html: emailTemplate(normalizedEmail, token),
  });

  return Response.json({ success: true });
};

function emailTemplate(email, token) {
  return `
    <div style="background:#060120;color:#FFF0F8;font-family:Georgia,serif;padding:40px;max-width:540px;margin:0 auto;">
      <p style="font-size:11px;letter-spacing:5px;text-transform:uppercase;color:#5ABCF0;margin-bottom:24px;">Limitless Yeehaw</p>
      <h1 style="font-family:'Palatino Linotype',Palatino,Georgia,serif;font-size:28px;color:#ffffff;margin-bottom:16px;font-weight:700;line-height:1.2;">Welcome to Your Year Ahead ✦</h1>
      <p style="font-size:16px;line-height:1.8;margin-bottom:32px;color:#FFF0F8;">
        You've been gifted access to the course. Here's your unique access info — save this email somewhere safe.
        You'll use these details any time you access the course on a new device.
      </p>
      <div style="background:rgba(152,120,232,0.15);border:1px solid rgba(152,120,232,0.35);border-radius:6px;padding:24px;margin-bottom:32px;">
        <p style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#E040A8;margin-bottom:12px;">Your Access Details</p>
        <p style="margin-bottom:8px;font-size:14px;color:#C0A8F8;">Email: <strong style="color:#fff;">${email}</strong></p>
        <p style="font-size:14px;color:#C0A8F8;">Token: <strong style="color:#fff;font-family:monospace;font-size:13px;">${token}</strong></p>
      </div>
      <a href="https://limitlessyeehaw.com/course/"
         style="display:inline-block;background:#FFF0F8;color:#0E0530;font-family:'Palatino Linotype',Palatino,Georgia,serif;font-size:13px;font-weight:700;letter-spacing:4px;text-transform:uppercase;text-decoration:none;padding:16px 32px;border-radius:2px;">
        Enter the Course →
      </a>
      <p style="font-size:13px;color:#9878E8;margin-top:40px;">
        Return every birthday — the course never expires. ✦
      </p>
    </div>
  `;
}
