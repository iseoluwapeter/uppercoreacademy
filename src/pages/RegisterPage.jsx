import React from "react";
import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiInfo,
  FiLoader,
  FiLock,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { supabase } from "../components/supabaseClient";
import Logo from "../components/SharedComponents";
import { Link, useSearchParams } from "react-router-dom";
import { getCourse, uppercoreKidsCourses } from "../components/courses";
import { CtaLink } from "../components/CoursesUi";

const EASE = [0.22, 1, 0.36, 1];
const display = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

// Form config

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

const AGES = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

const INITIAL = {
  course_id: "",
  parent_name: "",
  email: "",
  phone: "",
  country: "",
  child_name: "",
  age: "",
  school_year: "",
  experience: "",
  availability: "",
  expectations: "",
  consent: false,
  company: "",
};

const REQUIRED = [
  "course_id",
  "parent_name",
  "email",
  "phone",
  "country",
  "child_name",
  "age",
  "school_year",
  "experience",
  "availability",
  "consent",
];

function validate(v) {
  const e = {};
  if (!getCourse(v.course_id))
    e.course_id = "Choose the course you’d like to register for.";
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
  if (!v.experience) e.experience = "Choose one option.";
  if (!v.availability) e.availability = "Choose one option.";
  if (!v.consent) e.consent = "Please confirm so we can contact you.";
  return e;
}

const ageText = (c) => c.ageRange.replace(" years", "");

function waLink(base, text) {
  const sep = base.includes("?") ? "&" : "?";
  return `${base}${sep}text=${encodeURIComponent(text)}`;
}

// UI pieces

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

// Shown under the course picker once a course is chosen.
function CourseSummary({ course }) {
  const rows = [
    ["Fee", course.price.display],
    ["Duration", course.duration],
    [
      "Classes",
      `${course.sessions}, ${course.sessionDuration.replace(" per class", "")} each`,
    ],
    [
      "Total teaching",
      `${course.totalClasses} classes, ${course.totalHours} hours`,
    ],
  ];
  return (
    <motion.div
      key={course.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE }}
      className="mt-4 rounded-2xl bg-[#F4FAF6] p-5 ring-1 ring-[#0A3B2C]/10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-[#0E7A4E]">
            Selected course
          </p>
          <p
            className="mt-0.5 text-lg font-extrabold text-[#0A3B2C]"
            style={display}
          >
            {course.title}
          </p>
        </div>
        {/* opens in a new tab so the form isn't lost */}
        <Link
          to={`/courses/${course.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 text-sm font-bold text-[#0E7A4E] underline-offset-2 hover:underline"
        >
          Full details <FiExternalLink />
        </Link>
      </div>
      <dl className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-xs font-semibold text-[#0F1F18]/55">{k}</dt>
            <dd className="text-sm font-bold text-[#0A3B2C]">{v}</dd>
          </div>
        ))}
      </dl>
    </motion.div>
  );
}

/*  Confirmation: course summary + how to pay                                  */

function CopyRow({ label, value }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked: the value is still visible to copy by hand */
    }
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-[#0A3B2C]/10">
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#0F1F18]/55">{label}</p>
        <p className="truncate text-base font-bold text-[#0A3B2C]">{value}</p>
      </div>
      <button
        type="button"
        onClick={copy}
        className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#E4F3E9] px-3.5 py-2 text-sm font-bold text-[#0A3B2C] transition-colors hover:bg-[#C8F13C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7A4E]"
      >
        {copied ? (
          <>
            <FiCheck /> Copied
          </>
        ) : (
          <>
            <FiCopy /> Copy
          </>
        )}
      </button>
    </div>
  );
}

function Success({ course, childName, homeHref, whatsappHref, bankDetails }) {
  const burst = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);
  const firstName = childName.trim().split(/\s+/)[0];
  const reference = `${firstName} - ${course.shortTitle}`;
  const proofText = `Hello Uppercore, I have paid ${course.price.display} for ${childName.trim()} (${course.title}). Payment reference: ${reference}.`;

  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="px-6 py-10 sm:px-10 sm:py-14"
      role="status"
    >
      <div className="flex flex-col items-center text-center">
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
          Registration Received 🎉
        </h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-[#0F1F18]/70">
          Thank you for registering {childName.trim()} with Uppercore Kids.
          Everything you need to know is below.
        </p>
      </div>

      {/* what they registered for */}
      <div className="mx-auto mt-9 max-w-xl rounded-3xl bg-[#F4FAF6] p-6 ring-1 ring-[#0A3B2C]/10">
        <p className="text-xs font-semibold text-[#0E7A4E]">Course selected</p>
        <p
          className="mt-0.5 text-xl font-extrabold text-[#0A3B2C]"
          style={display}
        >
          {course.title}
        </p>
        <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {[
            ["Course fee", course.price.display],
            ["Duration", course.duration],
            [
              "Classes",
              `${course.sessions}, ${course.sessionDuration.replace(" per class", "")} each`,
            ],
            ["Format", course.format],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-xs font-semibold text-[#0F1F18]/55">{k}</dt>
              <dd className="font-bold text-[#0A3B2C]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* payment */}
      <div className="mx-auto mt-5 max-w-xl rounded-3xl bg-[#0A3B2C] p-6 sm:p-7">
        {bankDetails ? (
          <>
            <p className="text-lg font-extrabold text-white" style={display}>
              Pay {course.price.display} to confirm {firstName}’s place
            </p>
            <p className="mt-1 text-sm text-white/70">
              Pay by bank transfer to the account below.
            </p>
            <div className="mt-5 space-y-2.5">
              <CopyRow label="Account name" value={bankDetails.accountName} />
              <CopyRow label="Bank" value={bankDetails.bank} />
              <CopyRow
                label="Account number"
                value={bankDetails.accountNumber}
              />
              <CopyRow
                label="Payment reference (please use this)"
                value={reference}
              />
            </div>

            <ol className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm text-white/85">
              {[
                "Make the transfer using the payment reference above.",
                "Send us your proof of payment on WhatsApp.",
                "We confirm your place and send the class schedule and onboarding details.",
              ].map((t, i) => (
                <li key={t} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#C8F13C] text-xs font-extrabold text-[#0A3B2C]">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{t}</span>
                </li>
              ))}
            </ol>

            {whatsappHref && (
              <div className="mt-6">
                <CtaLink
                  href={waLink(whatsappHref, proofText)}
                  variant="lime"
                  icon={<FaWhatsapp size={20} />}
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  I’ve made payment: send proof
                </CtaLink>
              </div>
            )}
            <p className="mt-4 flex items-start gap-2 text-xs text-white/60">
              <FiInfo className="mt-0.5 shrink-0" />
              Paying from outside Nigeria? Transfers can take longer and may
              carry extra charges from your bank or transfer service.
            </p>
          </>
        ) : (
          <>
            <p className="text-lg font-extrabold text-white" style={display}>
              What happens next
            </p>
            <p className="mt-2 text-white/75">
              We’ll send you the payment details and the class schedule for{" "}
              {course.shortTitle}.
            </p>
            {whatsappHref && (
              <div className="mt-5">
                <CtaLink
                  href={whatsappHref}
                  variant="lime"
                  icon={<FaWhatsapp size={20} />}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Message us on WhatsApp
                </CtaLink>
              </div>
            )}
          </>
        )}
      </div>

      <p className="mx-auto mt-6 max-w-xl text-center text-sm text-[#0F1F18]/60">
        We’ll only contact you if something needs your attention.
      </p>
      <div className="mt-6 flex justify-center">
        <Link
          to={homeHref}
          className="rounded-full px-6 py-3 text-sm font-bold text-[#0A3B2C] ring-1 ring-inset ring-[#0A3B2C]/20 transition-colors hover:bg-[#0A3B2C]/5"
        >
          Back to home
        </Link>
      </div>
    </motion.div>
  );
}

export default function RegisterPage({
  homeHref = "/",
  whatsappHref = "",
  privacyHref = "",
  bankDetails = null,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [values, setValues] = useState(() => {
    const fromUrl = searchParams.get("course");
    return { ...INITIAL, course_id: getCourse(fromUrl) ? fromUrl : "" };
  });
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const errors = useMemo(() => validate(values), [values]);
  const err = (name) => ((touched[name] || attempted) && errors[name]) || "";

  const course = getCourse(values.course_id);
  const ageNum = Number(values.age);
  const ageOutOfRange = Boolean(
    course && values.age && (ageNum < course.ageMin || ageNum > course.ageMax),
  );

  const completed = REQUIRED.filter((n) => !errors[n]).length;
  const progress = Math.round((completed / REQUIRED.length) * 100);

  const setField = (name, value) => setValues((v) => ({ ...v, [name]: value }));
  const touch = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const selectCourse = (id) => {
    setField("course_id", id);
    touch("course_id");
    setSearchParams({ course: id }, { replace: true });
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
      if (course)
        setSubmitted({ course, childName: values.child_name || "your child" });
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
      // Insert only: the anon key is not allowed to read rows back (see the SQL files).
      const { error } = await supabase.from("registrations").insert([
        {
          course_id: course.id,
          course_title: course.title,
          fee_amount: course.price.amount,
          fee_currency: course.price.currency,
          parent_name: values.parent_name.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          country: values.country,
          child_name: values.child_name.trim(),
          age: Number(values.age),
          school_year: values.school_year.trim(),
          experience: values.experience,
          availability: values.availability,
          expectations: values.expectations.trim() || null,
          consent: true,
        },
      ]);

      if (error) {
        setServerError(
          error.code === "23505"
            ? "This child is already registered for this course with this email address, so there’s nothing more to do."
            : "Your registration wasn’t saved. Check your connection and try again.",
        );
        setStatus("idle");
        return;
      }

      setSubmitted({ course, childName: values.child_name.trim() });
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
          <Link
            to={course ? `/courses/${course.id}` : homeHref}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[#0A3B2C]/75 transition-colors hover:bg-[#0A3B2C]/5 hover:text-[#0A3B2C]"
          >
            <FiArrowLeft /> {course ? "Back to course" : "Back to home"}
          </Link>
        </header>

        <main className="relative mx-auto grid max-w-7xl gap-8 px-5 pb-24 pt-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14 lg:px-8 lg:pt-8">
          {/* ---- side panel ------- */}
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
                Register your child
              </h1>
              <p className="relative mt-4 text-base leading-relaxed text-white/75">
                Choose a course, tell us a little about your child and you’ll
                see your fee and next steps straight away.
              </p>

              <ol className="relative mt-9 space-y-5">
                {[
                  [
                    "Choose a course",
                    "You can read the full details before you decide.",
                  ],
                  ["Register", "It takes about two minutes."],
                  [
                    "Confirm your place",
                    "Your fee and payment steps appear as soon as you submit.",
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
            </div>
          </motion.aside>

          {/* ------ form ----- */}
          <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_-40px_rgba(10,59,44,0.4)] ring-1 ring-[#0A3B2C]/10"
          >
            <AnimatePresence mode="wait">
              {status === "success" && submitted ? (
                <Success
                  course={submitted.course}
                  childName={submitted.childName}
                  homeHref={homeHref}
                  whatsappHref={whatsappHref}
                  bankDetails={bankDetails}
                />
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

                    <FormSection title="Course">
                      <fieldset
                        className="min-w-0"
                        aria-describedby={
                          err("course_id") ? "f-course_id-error" : undefined
                        }
                      >
                        <Legend hint="Not sure yet? Browse the course pages first, then come back.">
                          Which course would you like to register for?
                        </Legend>
                        <div className="mt-3 grid grid-cols-1 gap-2.5">
                          {uppercoreKidsCourses.map((c) => {
                            const checked = values.course_id === c.id;
                            return (
                              <label
                                key={c.id}
                                className="block min-w-0 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name="course_id"
                                  value={c.id}
                                  checked={checked}
                                  onChange={() => selectCourse(c.id)}
                                  className="peer sr-only"
                                />
                                <motion.span
                                  whileTap={{ scale: 0.99 }}
                                  className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-3.5 ring-1 ring-inset ring-[#0A3B2C]/20 transition-colors hover:ring-[#0A3B2C]/40 peer-checked:bg-[#E4F3E9] peer-checked:ring-2 peer-checked:ring-[#0A3B2C] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0E7A4E]"
                                >
                                  <span className="flex min-w-0 items-center gap-3">
                                    <span
                                      className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ring-1 ring-inset transition-colors ${
                                        checked
                                          ? "bg-[#0A3B2C] text-[#C8F13C] ring-[#0A3B2C]"
                                          : "ring-[#0A3B2C]/30"
                                      }`}
                                    >
                                      {checked && <FiCheck size={12} />}
                                    </span>
                                    <span className="min-w-0">
                                      <span className="block font-bold leading-snug text-[#0A3B2C]">
                                        {c.title}
                                      </span>
                                      <span className="block text-xs text-[#0F1F18]/60">
                                        Ages {ageText(c)}, {c.duration}
                                      </span>
                                    </span>
                                  </span>
                                  <span
                                    className="shrink-0 whitespace-nowrap font-extrabold text-[#0A3B2C]"
                                    style={display}
                                  >
                                    {c.price.display}
                                  </span>
                                </motion.span>
                              </label>
                            );
                          })}
                        </div>
                        <ErrorText
                          id="f-course_id-error"
                          error={err("course_id")}
                        />
                      </fieldset>

                      <AnimatePresence mode="wait">
                        {course && <CourseSummary course={course} />}
                      </AnimatePresence>
                    </FormSection>

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

                      <AnimatePresence initial={false}>
                        {ageOutOfRange && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="flex items-start gap-2.5 rounded-2xl bg-[#FFF6DB] px-4 py-3 text-sm font-medium text-[#6B4E00]">
                              <FiInfo className="mt-0.5 shrink-0" />
                              <span>
                                {course.title} is designed for ages{" "}
                                {ageText(course)}. You can still register, and
                                we’ll advise on the best fit for your child.
                              </span>
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </FormSection>

                    <FormSection title="Experience and schedule">
                      <fieldset
                        className="min-w-0"
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
                        className="min-w-0"
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
                        ) : course ? (
                          `Register for ${course.shortTitle}`
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
