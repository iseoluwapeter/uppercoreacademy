import React from "react";
import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiLoader,
  FiLock,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "../components/supabaseClient";
import Logo from "../components/SharedComponents";

/* -------------------------------------------------------------------------- */
/*  Tokens (shared with the landing page)                                      */
/*  forest #0A3B2C · green #0E7A4E · lime #C8F13C · mint #F4FAF6 / #E4F3E9     */
/* -------------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];
const display = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

/* -------------------------------------------------------------------------- */
/*  Form config                                                                */
/* -------------------------------------------------------------------------- */

const INTERESTS = [
  "Scratch & Games",
  "Web Development",
  "AI Creation",
  "Graphics & Digital Design",
  "Cybersecurity",
  "Data & Analytics",
  "Not sure yet",
];

const EXPERIENCE = [
  { value: "none", label: "No" },
  { value: "beginner", label: "Yes, beginner" },
  { value: "intermediate", label: "Yes, intermediate" },
  { value: "not_sure", label: "Not sure" },
];

const AVAILABILITY = [
  { value: "weekday", label: "Weekday" },
  { value: "weekend", label: "Weekend" },
  { value: "either", label: "Either" },
];

const AGES = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const INITIAL = {
  parent_name: "",
  email: "",
  phone: "",
  country: "",
  child_name: "",
  age: "",
  school_year: "",
  interests: [],
  experience: "",
  availability: "",
  expectations: "",
  consent: false,
  company: "", // honeypot: real people never fill this in
};

// Order used for "focus the first error" and for the progress bar.
const REQUIRED = [
  "parent_name",
  "email",
  "phone",
  "country",
  "child_name",
  "age",
  "school_year",
  "interests",
  "experience",
  "availability",
  "consent",
];

function validate(v) {
  const e = {};
  if (v.parent_name.trim().length < 2)
    e.parent_name = "Enter the parent or guardian’s name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim()))
    e.email = "Enter a valid email address.";
  const digits = v.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15)
    e.phone =
      "Enter a phone number with country code, for example +44 7700 900123.";
  if (!v.country) e.country = "Choose a country.";
  if (v.child_name.trim().length < 1) e.child_name = "Enter your child’s name.";
  if (!v.age) e.age = "Choose your child’s age.";
  if (v.school_year.trim().length < 1)
    e.school_year = "Enter your child’s current school year.";
  if (v.interests.length === 0)
    e.interests = "Pick at least one interest, or choose “Not sure yet”.";
  if (!v.experience) e.experience = "Choose one option.";
  if (!v.availability) e.availability = "Choose one option.";
  if (!v.consent) e.consent = "Please confirm so we can contact you.";
  return e;
}

/* -------------------------------------------------------------------------- */
/*  UI pieces                                                                  */
/* -------------------------------------------------------------------------- */

const inputClass = (hasError) =>
  `w-full rounded-xl bg-white px-4 text-base text-[#0F1F18] ring-1 ring-inset transition-shadow placeholder:text-[#0F1F18]/40 focus:outline-none focus:ring-2 ${
    hasError
      ? "ring-[#B42318] focus:ring-[#B42318]"
      : "ring-[#0A3B2C]/20 hover:ring-[#0A3B2C]/40 focus:ring-[#0E7A4E]"
  }`;

function ErrorText({ id, error }) {
  return (
    <AnimatePresence initial={false}>
      {error && (
        <motion.p
          id={id}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-[#B42318]"
        >
          <FiAlertCircle className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </motion.p>
      )}
    </AnimatePresence>
  );
}

function Field({ name, label, hint, error, optional, children }) {
  const id = `f-${name}`;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-baseline justify-between text-sm font-bold text-[#0A3B2C]"
      >
        <span>{label}</span>
        {optional && (
          <span className="text-xs font-semibold text-[#0F1F18]/50">
            Optional
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p className="mt-1.5 text-xs text-[#0F1F18]/55">{hint}</p>
      )}
      <ErrorText id={`${id}-error`} error={error} />
    </div>
  );
}

function Legend({ children, hint }) {
  return (
    <>
      <legend className="text-sm font-bold text-[#0A3B2C]">{children}</legend>
      {hint && <p className="mb-3 mt-0.5 text-xs text-[#0F1F18]/55">{hint}</p>}
    </>
  );
}

const pillClass =
  "flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-[#0A3B2C]/80 ring-1 ring-inset ring-[#0A3B2C]/20 transition-colors hover:ring-[#0A3B2C]/40 peer-checked:bg-[#0A3B2C] peer-checked:text-white peer-checked:ring-[#0A3B2C] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0E7A4E]";

function CheckMark({ show }) {
  return (
    <AnimatePresence initial={false}>
      {show && (
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 14, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="overflow-hidden"
        >
          <FiCheck />
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="space-y-5 border-t border-[#0A3B2C]/10 pt-8 first:border-0 first:pt-0">
      <h3
        className="text-xl font-extrabold tracking-tight text-[#0A3B2C]"
        style={display}
      >
        {title}
      </h3>
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Success                                                                    */
/* -------------------------------------------------------------------------- */

function Success({ homeHref, whatsappHref }) {
  const burst = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="flex flex-col items-center px-4 py-10 text-center sm:px-10 sm:py-16"
      role="status"
    >
      <div className="relative grid h-24 w-24 place-items-center">
        {burst.map((a, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className={`absolute h-2.5 w-2.5 rounded-full ${i % 2 ? "bg-[#0E7A4E]" : "bg-[#C8F13C]"}`}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: Math.cos(a) * 62,
              y: Math.sin(a) * 62,
              opacity: 0,
              scale: 1,
            }}
            transition={{ delay: 0.35, duration: 0.8, ease: "easeOut" }}
          />
        ))}
        <svg viewBox="0 0 52 52" className="h-20 w-20" aria-hidden="true">
          <motion.circle
            cx="26"
            cy="26"
            r="24"
            fill="#C8F13C"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            style={{ transformOrigin: "26px 26px" }}
          />
          <motion.path
            d="M15 27l8 8 14-16"
            fill="none"
            stroke="#0A3B2C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      </div>

      <h2
        className="mt-8 text-3xl font-extrabold leading-tight tracking-tight text-[#0A3B2C] sm:text-4xl"
        style={display}
      >
        You’re on the Uppercore Kids UK list! 🎉
      </h2>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-[#0F1F18]/70">
        Thank you for registering your interest. We’ll contact you with the
        cohort schedule, programme options and next steps.
      </p>

      <div className="mt-9 flex flex-col gap-3 sm:flex-row">
        {whatsappHref && (
          <motion.a
            href={whatsappHref}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A3B2C] px-6 py-3.5 font-bold text-white transition-colors hover:bg-[#0E4C39]"
          >
            <FaWhatsapp size={20} /> Message us on WhatsApp
          </motion.a>
        )}
        <motion.a
          href={homeHref}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center justify-center rounded-full px-6 py-3.5 font-bold text-[#0A3B2C] ring-1 ring-inset ring-[#0A3B2C]/20 transition-colors hover:bg-[#0A3B2C]/5"
        >
          Back to home
        </motion.a>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Page                                                                       */
/*                                                                             */
/*  Props                                                                      */
/*   homeHref      Where the logo / back link goes (default "/")               */
/*   whatsappHref  e.g. "https://wa.me/44XXXXXXXXXX"; hidden when empty        */
/*   privacyHref   Link to your privacy policy; shown in the consent text      */
/* -------------------------------------------------------------------------- */

export default function RegisterPage({
  homeHref = "/",
  whatsappHref = "",
  privacyHref = "",
}) {
  const [values, setValues] = useState(INITIAL);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [serverError, setServerError] = useState("");

  const errors = useMemo(() => validate(values), [values]);
  const err = (name) => ((touched[name] || attempted) && errors[name]) || "";

  const completed = REQUIRED.filter((n) => !errors[n]).length;
  const progress = Math.round((completed / REQUIRED.length) * 100);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const toggleInterest = (label) => {
    touch("interests");
    setValues((v) => {
      const has = v.interests.includes(label);
      if (label === "Not sure yet")
        return { ...v, interests: has ? [] : ["Not sure yet"] };
      const base = v.interests.filter((i) => i !== "Not sure yet");
      return {
        ...v,
        interests: has ? base.filter((i) => i !== label) : [...base, label],
      };
    });
  };

  // Props shared by the plain inputs and selects
  const fp = (name) => ({
    id: `f-${name}`,
    name,
    value: values[name],
    onChange: (e) => setField(name, e.target.value),
    onBlur: () => touch(name),
    "aria-invalid": err(name) ? true : undefined,
    "aria-describedby": err(name) ? `f-${name}-error` : undefined,
  });

  const focusField = (name) => {
    const el = document.querySelector(`[name="${name}"]`);
    if (el) {
      el.focus({ preventScroll: true });
      el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setAttempted(true);
    setServerError("");

    // Honeypot filled: it's a bot. Pretend success, save nothing.
    if (values.company) {
      setStatus("success");
      return;
    }

    const firstError = REQUIRED.find((n) => errors[n]);
    if (firstError) {
      focusField(firstError);
      return;
    }

    setStatus("submitting");
    try {
      // Insert only: the anon key is not allowed to read rows back (see the SQL file).
      const { error } = await supabase.from("registrations").insert([
        {
          parent_name: values.parent_name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          country: values.country,
          child_name: values.child_name.trim(),
          age: Number(values.age),
          school_year: values.school_year.trim(),
          interests: values.interests,
          experience: values.experience,
          availability: values.availability,
          expectations: values.expectations.trim() || null,
          consent: true,
        },
      ]);

      if (error) {
        setServerError(
          error.code === "23505"
            ? "This child is already registered with this email address, so there’s nothing more to do. We’ll be in touch soon."
            : "Your registration wasn’t saved. Check your connection and try again.",
        );
        setStatus("idle");
        return;
      }

      setStatus("success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setServerError(
        "Your registration wasn’t saved. Check your connection and try again.",
      );
      setStatus("idle");
    }
  }

  const submitting = status === "submitting";

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <div
        className="relative min-h-screen overflow-x-hidden bg-[#F4FAF6] text-[#0F1F18] antialiased"
        style={{
          fontFamily: "'Figtree', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#C8F13C]/35 blur-3xl"
        />

        <header className="relative z-10 mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo href={homeHref} />
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#0A3B2C]/75 transition-colors hover:bg-[#0A3B2C]/5 hover:text-[#0A3B2C]"
          >
            <FiArrowLeft /> Back to home
          </a>
        </header>

        <main className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-24 pt-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8 lg:pt-8">
          {/* ------------------------------ side panel ------------------------------ */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="lg:sticky lg:top-8 lg:self-start"
          >
            <div className="relative overflow-hidden rounded-[32px] bg-[#0A3B2C] p-8 sm:p-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#0E7A4E]/50 blur-3xl"
              />
              <h1
                className="relative text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl"
                style={display}
              >
                Register your child’s interest
              </h1>
              <p className="relative mt-4 text-base leading-relaxed text-white/75">
                It takes about two minutes. Tell us a little about your child
                and we’ll contact you with the cohort schedule, programme
                options and next steps.
              </p>

              <ol className="relative mt-9 space-y-5">
                {[
                  ["You register", "We receive your details straight away."],
                  [
                    "We contact you",
                    "A personal follow-up by WhatsApp or email.",
                  ],
                  [
                    "Your child joins",
                    "They learn by building and finish with a project to showcase.",
                  ],
                ].map(([t, d], i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.15,
                      duration: 0.5,
                      ease: EASE,
                    }}
                    className="flex gap-4"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#C8F13C] text-sm font-extrabold text-[#0A3B2C]">
                      {i + 1}
                    </span>
                    <span>
                      <span className="block font-bold text-white">{t}</span>
                      <span className="block text-sm text-white/65">{d}</span>
                    </span>
                  </motion.li>
                ))}
              </ol>

              <p className="relative mt-9 rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold text-white/90">
                Ages 8–17 · Online · No previous coding experience needed for
                beginner programmes
              </p>
            </div>
          </motion.aside>

          {/* -------------------------------- form --------------------------------- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-40px_rgba(10,59,44,0.4)] ring-1 ring-[#0A3B2C]/10"
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <Success homeHref={homeHref} whatsappHref={whatsappHref} />
              ) : (
                <motion.div
                  key="form"
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="border-b border-[#0A3B2C]/10 px-6 py-4 sm:px-10">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#0A3B2C]/60">
                      <span>Your progress</span>
                      <span aria-live="polite">{progress}% complete</span>
                    </div>
                    <div
                      className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#0A3B2C]/10"
                      role="progressbar"
                      aria-valuenow={progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label="Form completion"
                    >
                      <motion.div
                        className="h-full rounded-full bg-[#0E7A4E]"
                        animate={{ width: `${progress}%` }}
                        transition={{
                          type: "spring",
                          stiffness: 140,
                          damping: 22,
                        }}
                      />
                    </div>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-8 px-6 py-8 sm:px-10 sm:py-10"
                  >
                    {/* honeypot */}
                    <div
                      aria-hidden="true"
                      className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
                    >
                      <label htmlFor="f-company">Company</label>
                      <input
                        id="f-company"
                        name="company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={values.company}
                        onChange={(e) => setField("company", e.target.value)}
                      />
                    </div>

                    <FormSection title="Parent or guardian">
                      <Field
                        name="parent_name"
                        label="Full name"
                        error={err("parent_name")}
                      >
                        <input
                          {...fp("parent_name")}
                          type="text"
                          autoComplete="name"
                          placeholder="e.g. Funke Adeyemi"
                          className={`${inputClass(err("parent_name"))} h-12`}
                        />
                      </Field>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field name="email" label="Email" error={err("email")}>
                          <input
                            {...fp("email")}
                            type="email"
                            autoComplete="email"
                            inputMode="email"
                            placeholder="you@example.com"
                            className={`${inputClass(err("email"))} h-12`}
                          />
                        </Field>
                        <Field
                          name="phone"
                          label="WhatsApp / phone"
                          hint="Include the country code."
                          error={err("phone")}
                        >
                          <input
                            {...fp("phone")}
                            type="tel"
                            autoComplete="tel"
                            inputMode="tel"
                            placeholder="+44 7700 900123"
                            className={`${inputClass(err("phone"))} h-12`}
                          />
                        </Field>
                      </div>

                      <Field
                        name="country"
                        label="Country"
                        error={err("country")}
                      >
                        <select
                          {...fp("country")}
                          autoComplete="country-name"
                          className={`${inputClass(err("country"))} h-12 ${values.country ? "" : "text-[#0F1F18]/40"}`}
                        >
                          <option value="" disabled>
                            Select a country
                          </option>
                          <option value="UK">United Kingdom</option>
                          <option value="Nigeria">Nigeria</option>
                          <option value="Other">Other</option>
                        </select>
                      </Field>
                    </FormSection>

                    <FormSection title="Your child">
                      <Field
                        name="child_name"
                        label="Child’s name"
                        error={err("child_name")}
                      >
                        <input
                          {...fp("child_name")}
                          type="text"
                          autoComplete="off"
                          placeholder="First name is fine"
                          className={`${inputClass(err("child_name"))} h-12`}
                        />
                      </Field>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field name="age" label="Age" error={err("age")}>
                          <select
                            {...fp("age")}
                            className={`${inputClass(err("age"))} h-12 ${values.age ? "" : "text-[#0F1F18]/40"}`}
                          >
                            <option value="" disabled>
                              Select age
                            </option>
                            {AGES.map((a) => (
                              <option key={a} value={a}>
                                {a} years old
                              </option>
                            ))}
                          </select>
                        </Field>
                        <Field
                          name="school_year"
                          label="Current school year"
                          error={err("school_year")}
                        >
                          <input
                            {...fp("school_year")}
                            type="text"
                            autoComplete="off"
                            placeholder="e.g. Year 6"
                            className={`${inputClass(err("school_year"))} h-12`}
                          />
                        </Field>
                      </div>
                    </FormSection>

                    <FormSection title="Interests and experience">
                      <fieldset
                        aria-describedby={
                          err("interests") ? "f-interests-error" : undefined
                        }
                      >
                        <Legend hint="Pick as many as you like.">
                          What would your child be interested in?
                        </Legend>
                        <div className="flex flex-wrap gap-2">
                          {INTERESTS.map((label) => {
                            const checked = values.interests.includes(label);
                            return (
                              <label key={label} className="cursor-pointer">
                                <input
                                  type="checkbox"
                                  name="interests"
                                  checked={checked}
                                  onChange={() => toggleInterest(label)}
                                  className="peer sr-only"
                                />
                                <motion.span
                                  whileTap={{ scale: 0.95 }}
                                  className={pillClass}
                                >
                                  <CheckMark show={checked} />
                                  {label}
                                </motion.span>
                              </label>
                            );
                          })}
                        </div>
                        <ErrorText
                          id="f-interests-error"
                          error={err("interests")}
                        />
                      </fieldset>

                      <fieldset
                        aria-describedby={
                          err("experience") ? "f-experience-error" : undefined
                        }
                      >
                        <Legend>
                          Has your child done any coding or technology classes
                          before?
                        </Legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {EXPERIENCE.map((o) => (
                            <label key={o.value} className="cursor-pointer">
                              <input
                                type="radio"
                                name="experience"
                                value={o.value}
                                checked={values.experience === o.value}
                                onChange={() => {
                                  setField("experience", o.value);
                                  touch("experience");
                                }}
                                className="peer sr-only"
                              />
                              <motion.span
                                whileTap={{ scale: 0.95 }}
                                className={pillClass}
                              >
                                <CheckMark
                                  show={values.experience === o.value}
                                />
                                {o.label}
                              </motion.span>
                            </label>
                          ))}
                        </div>
                        <ErrorText
                          id="f-experience-error"
                          error={err("experience")}
                        />
                      </fieldset>

                      <fieldset
                        aria-describedby={
                          err("availability")
                            ? "f-availability-error"
                            : undefined
                        }
                      >
                        <Legend>When would classes suit you best?</Legend>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {AVAILABILITY.map((o) => (
                            <label key={o.value} className="cursor-pointer">
                              <input
                                type="radio"
                                name="availability"
                                value={o.value}
                                checked={values.availability === o.value}
                                onChange={() => {
                                  setField("availability", o.value);
                                  touch("availability");
                                }}
                                className="peer sr-only"
                              />
                              <motion.span
                                whileTap={{ scale: 0.95 }}
                                className={pillClass}
                              >
                                <CheckMark
                                  show={values.availability === o.value}
                                />
                                {o.label}
                              </motion.span>
                            </label>
                          ))}
                        </div>
                        <ErrorText
                          id="f-availability-error"
                          error={err("availability")}
                        />
                      </fieldset>
                    </FormSection>

                    <FormSection title="One last thing">
                      <Field
                        name="expectations"
                        label="What would you like your child to gain from Uppercore Kids?"
                        optional
                        hint={`${values.expectations.length}/1000`}
                      >
                        <textarea
                          {...fp("expectations")}
                          rows={4}
                          maxLength={1000}
                          placeholder="For example: more confidence with technology, a skill they can show off, something creative to do after school."
                          className={`${inputClass(false)} resize-y py-3 leading-relaxed`}
                        />
                      </Field>

                      <div>
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            name="consent"
                            checked={values.consent}
                            onChange={(e) => {
                              setField("consent", e.target.checked);
                              touch("consent");
                            }}
                            aria-describedby={
                              err("consent") ? "f-consent-error" : undefined
                            }
                            className="peer sr-only"
                          />
                          <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-white text-transparent ring-1 ring-inset ring-[#0A3B2C]/30 transition-colors peer-checked:bg-[#0A3B2C] peer-checked:text-[#C8F13C] peer-checked:ring-[#0A3B2C] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0E7A4E]">
                            <FiCheck />
                          </span>
                          <span className="text-sm leading-relaxed text-[#0F1F18]/75">
                            I’m this child’s parent or guardian, and I agree to
                            Uppercore contacting me about this registration.
                            {privacyHref && (
                              <>
                                {" "}
                                <a
                                  href={privacyHref}
                                  className="font-semibold text-[#0E7A4E] underline underline-offset-2"
                                >
                                  Read our privacy policy
                                </a>
                                .
                              </>
                            )}
                          </span>
                        </label>
                        <ErrorText
                          id="f-consent-error"
                          error={err("consent")}
                        />
                      </div>
                    </FormSection>

                    <AnimatePresence>
                      {serverError && (
                        <motion.div
                          role="alert"
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex items-start gap-2.5 rounded-2xl bg-[#FDECEA] px-4 py-3.5 text-sm font-medium text-[#8A1C12]"
                        >
                          <FiAlertCircle className="mt-0.5 shrink-0" />
                          <span>{serverError}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div>
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        whileHover={submitting ? undefined : { y: -2 }}
                        whileTap={submitting ? undefined : { scale: 0.98 }}
                        className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-[#0A3B2C] text-base font-bold text-white transition-colors hover:bg-[#0E4C39] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0A3B2C] disabled:cursor-not-allowed disabled:opacity-80"
                      >
                        {submitting ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 0.9,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="grid"
                            >
                              <FiLoader size={20} />
                            </motion.span>
                            Submitting…
                          </>
                        ) : (
                          "Submit registration"
                        )}
                      </motion.button>
                      <p className="mt-4 flex items-center justify-center gap-2 text-xs text-[#0F1F18]/55">
                        <FiLock /> We only use these details to contact you
                        about Uppercore programmes.
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        </main>
      </div>
    </MotionConfig>
  );
}
