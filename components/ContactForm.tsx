"use client";

import { useEffect, useState } from "react";
import { readPrepared } from "./PreparedFor";
import Icon from "./Icon";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "err"; message: string };
type Errors = Partial<Record<"name" | "email" | "message", string>>;

const NEEDS = [
  { value: "Website", color: "blue" },
  { value: "Online store or portal", color: "green" },
  { value: "Automation and AI", color: "yellow" },
  { value: "Care and training", color: "salmon" },
];
const BUDGETS = ["Not sure yet", "Under $1,000", "$1,000 to $3,000", "$3,000 to $10,000", "$10,000 or more"];

export default function ContactForm({ email, phone }: { email: string; phone: { display: string; href: string } }) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const [business, setBusiness] = useState("");
  const [startedAt] = useState(() => Date.now());

  useEffect(() => setBusiness(readPrepared()), []);

  const validate = (data: FormData): Errors => {
    const e: Errors = {};
    if (!String(data.get("name") ?? "").trim()) e.name = "Add your name so we know who to reply to.";
    const mail = String(data.get("email") ?? "").trim();
    if (!mail) e.email = "Add an email address so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) e.email = "That email address looks incomplete.";
    if (String(data.get("message") ?? "").trim().length < 10) e.message = "Tell us a little more, even one sentence helps.";
    return e;
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = ev.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setStatus({ kind: "sending" });
    try {
      const body = Object.fromEntries(
        Array.from(new Set(data.keys())).map((k) => [k, k === "needs" ? data.getAll(k) : data.get(k)]),
      );
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, elapsed: Date.now() - startedAt }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || "The message could not be sent.");
      setStatus({ kind: "ok" });
      form.reset();
    } catch (err) {
      setStatus({ kind: "err", message: err instanceof Error ? err.message : "The message could not be sent." });
    }
  };

  if (status.kind === "ok") {
    return (
      <div className="form__status" data-kind="ok" role="status">
        <strong>Thanks. Your message is in.</strong>
        We read every enquiry and reply by email, usually with a few questions first. If it is urgent, call{" "}
        <a href={phone.href}>{phone.display}</a>.
      </div>
    );
  }

  const field = (name: keyof Errors) => ({
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
  });

  return (
    <form className="form" onSubmit={onSubmit} noValidate>
      <div className="form__row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required {...field("name")} />
          {errors.name ? <p className="field__err" id="name-err">{errors.name}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="business">
            Business <span className="opt">(optional)</span>
          </label>
          <input id="business" name="business" autoComplete="organization" value={business} onChange={(e) => setBusiness(e.target.value)} />
        </div>
      </div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" inputMode="email" required {...field("email")} />
          {errors.email ? <p className="field__err" id="email-err">{errors.email}</p> : null}
        </div>
        <div className="field">
          <label htmlFor="phone">
            Phone <span className="opt">(optional)</span>
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="website">
          Current website <span className="opt">(optional)</span>
        </label>
        <input id="website" name="website" type="url" inputMode="url" placeholder="https://" />
      </div>
      <fieldset className="field">
        <legend>What do you need?</legend>
        <div className="picks">
          {NEEDS.map((n) => (
            <label key={n.value} className="pick" data-color={n.color}>
              <input type="checkbox" name="needs" value={n.value} />
              <span>{n.value}</span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="budget">Budget</label>
        <select id="budget" name="budget" defaultValue={BUDGETS[0]}>
          {BUDGETS.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">What eats your week?</label>
        <textarea
          id="message"
          name="message"
          required
          placeholder="How do customers find you now, and what do you or your staff do by hand that you wish you didn't?"
          {...field("message")}
        />
        {errors.message ? <p className="field__err" id="message-err">{errors.message}</p> : null}
      </div>
      <div className="hp" aria-hidden="true">
        <label htmlFor="company_url">Leave this empty</label>
        <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" />
      </div>
      {status.kind === "err" ? (
        <div className="form__status" data-kind="err" role="alert">
          <strong>That did not go through.</strong>
          {status.message} You can email <a href={`mailto:${email}`}>{email}</a> or call <a href={phone.href}>{phone.display}</a>{" "}
          instead.
        </div>
      ) : null}
      <div className="form__foot">
        <button className="btn btn--ink" type="submit" disabled={status.kind === "sending"}>
          {status.kind === "sending" ? "Sending…" : "Send enquiry"}
          {status.kind === "sending" ? null : <Icon name="arrow" size={18} />}
        </button>
        <p className="form__note">
          We use these details only to reply about your project. See the <a href="/privacy">privacy policy</a>.
        </p>
      </div>
    </form>
  );
}
