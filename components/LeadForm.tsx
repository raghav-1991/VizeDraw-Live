"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  variant?: "demo" | "contact";
  submitLabel?: string;
};

const reasons = [
  "Request a demo",
  "Pricing inquiry",
  "Book workflow review",
  "Technical support",
  "Partnership opportunity",
  "Other",
];

const fieldBase =
  "w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-sm text-vellum placeholder:text-graphite-2 outline-none transition-colors focus:border-blueprint/60";

export default function LeadForm({
  variant = "demo",
  submitLabel = "Request demo",
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [honeypot, setHoneypot] = useState("");

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  return (
    <div className="relative rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ ease: [0.22, 1, 0.36, 1] }}
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
              className="grid h-16 w-16 place-items-center rounded-full border border-blueprint/40 bg-blueprint/10"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <motion.path
                  d="M4 12.5l5 5L20 6.5"
                  stroke="#6fcfd1"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                />
              </svg>
            </motion.div>
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-vellum">
              Request received
            </h3>
            <p className="mt-3 max-w-sm text-sm text-graphite">
              Thanks — we typically reply within one business day. A confirmation
              has been noted for your team&apos;s drawing workflow review.
            </p>
            <button
              onClick={() => setStatus("idle")}
              data-cursor="hover"
              className="mt-7 text-sm font-medium text-blueprint-soft"
            >
              Send another →
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="First name" name="firstName" placeholder="Jordan" />
              <Field label="Last name" name="lastName" placeholder="Rivera" />
            </div>
            <Field
              label="Work email"
              name="email"
              type="email"
              placeholder="you@company.com"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Company" name="company" placeholder="Acme Builders" />
              <Field
                label="Phone (optional)"
                name="phone"
                placeholder="+1 555 0100"
              />
            </div>

            {variant === "contact" && (
              <label className="grid gap-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-2">
                  Reason for contact
                </span>
                <div className="relative">
                  <select
                    className={`${fieldBase} appearance-none pr-10`}
                    defaultValue={reasons[0]}
                  >
                    {reasons.map((r) => (
                      <option key={r} className="bg-ink text-vellum">
                        {r}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-graphite-2">
                    ▾
                  </span>
                </div>
              </label>
            )}

            <label className="grid gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-2">
                Message
              </span>
              <textarea
                name="message"
                rows={4}
                placeholder="Tell us about your drawing packages, current tools, and the workflow you want to improve."
                className={`${fieldBase} resize-none`}
              />
            </label>

            {/* honeypot — hidden from users */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              aria-hidden
            />

            <motion.button
              onClick={handleSubmit}
              disabled={status === "sending"}
              whileTap={{ scale: 0.98 }}
              data-cursor="hover"
              className="group relative mt-2 inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blueprint px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-blueprint-soft disabled:opacity-70"
            >
              {status === "sending" ? "Sending…" : submitLabel}
              {status !== "sending" && (
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              )}
            </motion.button>
            <p className="text-center text-xs text-graphite-2">
              By submitting you agree to be contacted about VizeDraw. No spam.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-graphite-2">
        {label}
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={fieldBase}
      />
    </label>
  );
}
