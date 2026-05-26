import { getStore } from '@netlify/blobs';

export default async (req) => {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ valid: false, error: 'Invalid request body' }, { status: 400 });
  }

  const { email, token } = body;

  if (!email || !token) {
    return Response.json({ valid: false, error: 'Missing fields' }, { status: 400 });
  }

  const store = getStore('course-access');
  const record = await store.get(email.toLowerCase());

  if (!record) {
    return Response.json({ valid: false, error: 'Email not found' });
  }

  let parsed;
  try {
    parsed = JSON.parse(record);
  } catch {
    return Response.json({ valid: false, error: 'Server error' }, { status: 500 });
  }

  const valid = parsed.token === token.trim();
  return Response.json({ valid });
};
