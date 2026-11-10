// Project enquiries. Delivered by email through Resend when the environment
// is configured; otherwise the visitor is told to email or call instead, so
// nothing is silently dropped.

const MAX = { name: 120, business: 160, email: 200, phone: 40, website: 300, budget: 60, message: 5000 };
const hits = new Map<string, number[]>();

function clean(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "The form data could not be read." }, { status: 400 });
  }

  // Bots fill the hidden field or submit instantly. Pretend success.
  if (clean(body.company_url, 200) || Number(body.elapsed) < 2500) {
    return Response.json({ ok: true });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return Response.json({ error: "Too many messages from this connection. Please wait a few minutes." }, { status: 429 });
  }

  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const message = clean(body.message, MAX.message);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ error: "Please add your name, a valid email and a short message." }, { status: 422 });
  }
  const fields = {
    Name: name,
    Business: clean(body.business, MAX.business),
    Email: email,
    Phone: clean(body.phone, MAX.phone),
    Website: clean(body.website, MAX.website),
    Needs: Array.isArray(body.needs) ? body.needs.map((n) => clean(n, 60)).filter(Boolean).join(", ") : "",
    Budget: clean(body.budget, MAX.budget),
  };

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) {
    return Response.json({ error: "Our form is not connected yet." }, { status: 503 });
  }

  const rows = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;color:#626873">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
    .join("");
  const html = `<table>${rows}</table><p style="white-space:pre-wrap;margin-top:16px">${esc(message)}</p>`;
  const text = `${Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")}\n\n${message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New project enquiry from ${name}${fields.Business ? `, ${fields.Business}` : ""}`,
      html,
      text,
    }),
  });
  if (!res.ok) {
    return Response.json({ error: "The message could not be delivered." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
