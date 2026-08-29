import { useEffect, useRef, useState } from "react";
import contact from "../../data/contact.js";
import SectionHeading from "../../components/common/SectionHeading.jsx";
import useScrollReveal from "../../hooks/useScrollReveal.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+\d][\d\s-]{7,}$/;
const SUCCESS_RESET_MS = 3000;

// =========================================================
//                          Contact
// ---------------------------------------------------------
// Two real submit paths, matching the previous site's data:
//   - "email"    -> POST to Formspree, JSON response
//   - "whatsapp" -> opens a pre-filled wa.me deep link
// =========================================================
export default function Contact() {
  const [mode, setMode] = useState("email");
  const [values, setValues] = useState({ name: "", contact: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const headingRef = useScrollReveal();
  const formRef = useScrollReveal({ delay: 120 });
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(resetTimerRef.current);
  }, []);

  function succeed() {
    setStatus("success");
    clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => setStatus("idle"), SUCCESS_RESET_MS);
  }

  function updateField(field, value) {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: null }));
    if (status === "success" || status === "error") {
      clearTimeout(resetTimerRef.current);
      setStatus("idle");
    }
  }

  function validate() {
    const next = {};
    if (!values.name.trim()) next.name = "Please enter your name.";

    if (!values.contact.trim()) {
      next.contact = mode === "email" ? "Please enter your email." : "Please enter your WhatsApp number.";
    } else if (mode === "email" && !EMAIL_RE.test(values.contact.trim())) {
      next.contact = "That doesn't look like a valid email.";
    } else if (mode === "whatsapp" && !PHONE_RE.test(values.contact.trim())) {
      next.contact = "Please include a valid phone number, with country code.";
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      next.message = "Message should be at least 10 characters.";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    if (mode === "whatsapp") {
      const text = encodeURIComponent(
        `Hi Ubaid,\n\nMy name is ${values.name.trim()}.\n\n${values.message.trim()}\n\n— My WhatsApp: ${values.contact.trim()}`
      );
      window.open(`https://wa.me/${contact.whatsappNumber}?text=${text}`, "_blank");
      succeed();
      setValues({ name: "", contact: "", message: "" });
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(contact.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });

      if (res.ok) {
        succeed();
        setValues({ name: "", contact: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const submitLabel = {
    idle: mode === "email" ? "Send Message" : "Continue on WhatsApp",
    sending: "Sending…",
    success: "Sent!",
    error: "Try Again",
  }[status];

  const submitIcon = {
    idle: mode === "email" ? "fa-solid fa-paper-plane" : "fa-brands fa-whatsapp",
    sending: "fa-solid fa-spinner fa-spin",
    success: "fa-solid fa-check",
    error: "fa-solid fa-rotate-right",
  }[status];

  return (
    <section id="contact" className="section-y bg-cream-soft/60">
      <div className="container-custom">
        <div ref={headingRef} className="opacity-0">
          <SectionHeading
            eyebrow="Contact"
            title="Let's Build Something"
            description={`Based in ${contact.location}. Prefer email or WhatsApp - pick whichever's easier for you.`}
          />
        </div>

        <div ref={formRef} className="mx-auto mt-10 max-w-xl opacity-0">
          <div className="mb-6 flex gap-2 rounded-full bg-white/60 p-1.5">
            {["email", "whatsapp"].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setStatus("idle");
                  setErrors({});
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  mode === m ? "bg-teal text-cream" : "text-ink-soft hover:text-teal"
                }`}
              >
                <i
                  className={m === "email" ? "fa-solid fa-envelope" : "fa-brands fa-whatsapp"}
                  aria-hidden="true"
                />{" "}
                {m === "email" ? "Email" : "WhatsApp"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <div>
              <label htmlFor="cf-name" className="mb-1.5 block text-sm font-semibold text-ink">
                Name
              </label>
              <input
                id="cf-name"
                name="name"
                type="text"
                value={values.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "cf-name-error" : undefined}
                className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none transition-colors focus:border-teal ${
                  errors.name ? "border-red-400" : "border-ink/10"
                }`}
              />
              {errors.name && (
                <p id="cf-name-error" className="mt-1 text-xs font-medium text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cf-contact" className="mb-1.5 block text-sm font-semibold text-ink">
                {mode === "email" ? "Email" : "WhatsApp Number"}
              </label>
              <input
                id="cf-contact"
                name={mode === "email" ? "email" : "phone"}
                type={mode === "email" ? "email" : "tel"}
                placeholder={mode === "email" ? "you@example.com" : "+92 300 1234567"}
                value={values.contact}
                onChange={(e) => updateField("contact", e.target.value)}
                aria-invalid={Boolean(errors.contact)}
                aria-describedby={errors.contact ? "cf-contact-error" : undefined}
                className={`w-full rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none transition-colors focus:border-teal ${
                  errors.contact ? "border-red-400" : "border-ink/10"
                }`}
              />
              {errors.contact && (
                <p id="cf-contact-error" className="mt-1 text-xs font-medium text-red-500">
                  {errors.contact}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cf-message" className="mb-1.5 block text-sm font-semibold text-ink">
                Message
              </label>
              <textarea
                id="cf-message"
                name="message"
                rows={5}
                value={values.message}
                onChange={(e) => updateField("message", e.target.value)}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "cf-message-error" : undefined}
                className={`w-full resize-none rounded-xl border bg-white/80 px-4 py-3 text-sm outline-none transition-colors focus:border-teal ${
                  errors.message ? "border-red-400" : "border-ink/10"
                }`}
              />
              {errors.message && (
                <p id="cf-message-error" className="mt-1 text-xs font-medium text-red-500">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className={`mt-2 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-cream shadow-soft transition-all duration-300 disabled:opacity-70 ${
                status === "success" ? "bg-teal-dark" : "bg-teal hover:bg-teal-dark"
              }`}
            >
              <i className={submitIcon} aria-hidden="true" />
              {submitLabel}
            </button>

            <div role="status" aria-live="polite">
              {status === "success" && mode === "whatsapp" && (
                <p className="text-sm font-medium text-teal">
                  Redirected to WhatsApp. If it didn't open, try again.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-500">
                  Something went wrong sending that - please try again.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
