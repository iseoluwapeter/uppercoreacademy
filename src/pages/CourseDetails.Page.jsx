import React from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MotionConfig, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiAward,
  FiCalendar,
  FiCheck,
  FiClock,
  FiMonitor,
  FiTool,
  FiUsers,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  getCourse,
  uppercoreKidsCourses,
  uppercoreKidsProgramme,
} from "../components/courses";
import {
  COURSE_ICONS,
  CtaLink,
  EASE,
  FontStyles,
  MotionLink,
  bodyFont,
  display,
} from "../components/CoursesUi";
import Logo from "../components/SharedComponents";

function Header({ registerTo }) {
  return (
    <header className="sticky top-0 z-40 bg-white/85 shadow-[0_1px_0_rgba(10,59,44,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <Link
            to="/#explore"
            className="hidden rounded-full px-4 py-2 text-sm font-semibold text-[#0A3B2C]/75 transition-colors hover:bg-[#0A3B2C]/5 hover:text-[#0A3B2C] sm:inline-flex"
          >
            All courses
          </Link>
          <Link
            to={registerTo}
            className="inline-flex rounded-full bg-[#0A3B2C] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0E4C39]"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2
      className="text-2xl font-extrabold tracking-tight text-[#0A3B2C] sm:text-3xl lg:text-4xl"
      style={display}
    >
      {children}
    </h2>
  );
}

function NotFound() {
  return (
    <div
      className="grid min-h-screen place-items-center bg-[#F4FAF6] px-5 text-center"
      style={bodyFont}
    >
      <div>
        <p className="text-sm font-bold text-[#0E7A4E]">Course not found</p>
        <h1
          className="mt-3 text-4xl font-extrabold text-[#0A3B2C]"
          style={display}
        >
          We couldn’t find that course
        </h1>
        <p className="mt-3 text-[#0F1F18]/70">
          It may have been renamed or removed.
        </p>
        <div className="mt-8">
          <CtaLink to="/#explore" variant="dark">
            See all courses
          </CtaLink>
        </div>
      </div>
    </div>
  );
}

export default function CourseDetailsPage({ whatsappHref = "" }) {
  const { courseId } = useParams();
  const course = getCourse(courseId);

  if (!course) return <NotFound />;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const Icon = COURSE_ICONS[course.id];
  const registerTo = `/register?course=${course.id}`;
  const others = uppercoreKidsCourses.filter((c) => c.id !== course.id);

  const facts = [
    { icon: FiUsers, label: "Recommended ages", value: course.ageRange },
    { icon: FiCalendar, label: "Duration", value: course.duration },
    {
      icon: FiClock,
      label: "Classes",
      value: `${course.sessions}, ${course.sessionDuration.replace(" per class", "")} each`,
    },
    { icon: FiMonitor, label: "Format", value: course.format },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <FontStyles />
      <div
        className="min-h-screen bg-white pb-28 text-[#0F1F18] antialiased lg:pb-0"
        style={bodyFont}
      >
        <Header registerTo={registerTo} />

        {/* ---- hero ----- */}
        <section className="relative overflow-hidden bg-[#F4FAF6]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full bg-[#C8F13C]/35 blur-3xl"
          />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:px-8 lg:pb-28 lg:pt-14">
            <motion.div
              initial="hidden"
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to="/#explore"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0A3B2C]/70 hover:text-[#0A3B2C]"
                >
                  <FiArrowLeft /> All courses
                </Link>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-6 flex flex-wrap items-center gap-2"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A3B2C] text-xl text-[#C8F13C]">
                  <Icon />
                </span>
                <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-[#0A3B2C] ring-1 ring-[#0A3B2C]/10">
                  {course.level}
                </span>
                <span className="rounded-full bg-white px-3.5 py-1.5 text-sm font-bold text-[#0A3B2C] ring-1 ring-[#0A3B2C]/10">
                  Ages {course.ageRange.replace(" years", "")}
                </span>
              </motion.div>

              <h1
                className="mt-6 text-[2.5rem] font-extrabold leading-[1.04] tracking-tight text-[#0A3B2C] sm:text-5xl lg:text-6xl"
                style={display}
              >
                <span className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    variants={{
                      hidden: { y: "110%" },
                      show: {
                        y: "0%",
                        transition: { duration: 0.8, ease: EASE },
                      },
                    }}
                  >
                    {course.title}
                  </motion.span>
                </span>
              </h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-4 text-xl font-semibold text-[#0E7A4E]"
              >
                {course.tagline}
              </motion.p>
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-4 max-w-2xl text-lg leading-relaxed text-[#0F1F18]/75"
              >
                {course.description}
              </motion.p>

              <motion.dl
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  show: { opacity: 1, y: 0 },
                }}
                className="mt-9 grid gap-3 sm:grid-cols-2"
              >
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-start gap-3 rounded-2xl bg-white p-4 ring-1 ring-[#0A3B2C]/10"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#E4F3E9] text-[#0A3B2C]">
                      <f.icon />
                    </span>
                    <div>
                      <dt className="text-xs font-semibold text-[#0F1F18]/55">
                        {f.label}
                      </dt>
                      <dd className="mt-0.5 font-bold text-[#0A3B2C]">
                        {f.value}
                      </dd>
                    </div>
                  </div>
                ))}
              </motion.dl>
            </motion.div>

            {/* enrol card */}
            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.3 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="rounded-[32px] bg-[#0A3B2C] p-8 shadow-[0_40px_90px_-40px_rgba(10,59,44,0.7)] sm:p-9">
                <p className="text-sm font-semibold text-white/65">
                  Course fee
                </p>
                <p
                  className="mt-1 text-5xl font-extrabold tracking-tight text-white"
                  style={display}
                >
                  {course.price.display}
                </p>
                <p className="mt-1.5 text-sm text-white/65">
                  per child, for the full {course.duration}
                </p>

                <ul className="mt-7 space-y-3.5 border-t border-white/10 pt-7">
                  {[
                    `${course.totalClasses} live classes`,
                    `${course.totalHours} hours of teaching`,
                    `${course.projects.length} projects built along the way`,
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-center gap-3 text-white/90"
                    >
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#C8F13C] text-[#0A3B2C]">
                        <FiCheck size={14} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <CtaLink to={registerTo} variant="lime" className="w-full">
                    Register for this course
                  </CtaLink>
                  {whatsappHref && (
                    <CtaLink
                      href={whatsappHref}
                      variant="ghostLight"
                      icon={<FaWhatsapp size={20} />}
                      className="w-full"
                    >
                      Ask a question
                    </CtaLink>
                  )}
                </div>
                <p className="mt-5 text-center text-xs text-white/55">
                  Registration takes about two minutes.
                </p>
              </div>
            </motion.aside>
          </div>
        </section>

        {/* ---- what they learn --- */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <Reveal>
                <SectionTitle>What your child will learn</SectionTitle>
                <p className="mt-4 max-w-sm text-lg text-[#0F1F18]/70">
                  Every concept is practised straight away in a real project.
                </p>
              </Reveal>

              <motion.ul
                className="grid gap-3 sm:grid-cols-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.07 } },
                }}
              >
                {course.whatTheyWillLearn.map((t) => (
                  <motion.li
                    key={t}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: EASE },
                      },
                    }}
                    className="flex items-start gap-3.5 rounded-2xl bg-[#F4FAF6] px-5 py-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#0A3B2C] text-[#C8F13C]">
                      <FiCheck size={14} />
                    </span>
                    <span className="font-semibold text-[#0A3B2C]">{t}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </section>

        {/* ---- projects ----- */}
        <section className="bg-[#E4F3E9] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle>Projects they’ll build</SectionTitle>
              <p className="mt-4 max-w-xl text-lg text-[#0F1F18]/70">
                Children finish with real work to show their family, not just
                notes.
              </p>
            </Reveal>

            <motion.ol
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {course.projects.map((p, i) => {
                const last = i === course.projects.length - 1;
                return (
                  <motion.li
                    key={p}
                    variants={{
                      hidden: { opacity: 0, y: 22 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.55, ease: EASE },
                      },
                    }}
                    whileHover={{ y: -4 }}
                    className={`relative overflow-hidden rounded-3xl p-6 ${
                      last
                        ? "bg-[#0A3B2C] text-white sm:col-span-2 lg:col-span-1"
                        : "bg-white text-[#0A3B2C]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -right-2 -top-4 text-8xl font-extrabold ${
                        last ? "text-white/10" : "text-[#0A3B2C]/5"
                      }`}
                      style={display}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        last
                          ? "bg-[#C8F13C] text-[#0A3B2C]"
                          : "bg-[#E4F3E9] text-[#0A3B2C]"
                      }`}
                    >
                      {last && <FiAward />} Project {i + 1}
                    </span>
                    <p
                      className="relative mt-8 text-xl font-extrabold leading-snug"
                      style={display}
                    >
                      {p}
                    </p>
                  </motion.li>
                );
              })}
            </motion.ol>
          </div>
        </section>

        {/* ----- outcome + who it's for --- */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto grid max-w-7xl gap-5 px-5 lg:grid-cols-2 lg:px-8">
            <Reveal className="rounded-[32px] bg-[#0A3B2C] p-9 sm:p-11">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#C8F13C] text-xl text-[#0A3B2C]">
                <FiAward />
              </span>
              <h3
                className="mt-7 text-2xl font-extrabold text-white"
                style={display}
              >
                By the end of the course
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-white/80">
                {course.outcome}
              </p>
            </Reveal>

            <Reveal
              delay={0.1}
              className="rounded-[32px] bg-[#F4FAF6] p-9 sm:p-11"
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0A3B2C] text-xl text-[#C8F13C]">
                <FiUsers />
              </span>
              <h3
                className="mt-7 text-2xl font-extrabold text-[#0A3B2C]"
                style={display}
              >
                Is it right for your child?
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-[#0F1F18]/75">
                {course.recommendedFor}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ---- needs ------- */}
        <section className="bg-[#F4FAF6] py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal>
              <SectionTitle>What your child will need</SectionTitle>
            </Reveal>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <Reveal className="rounded-[28px] bg-white p-8 ring-1 ring-[#0A3B2C]/10">
                <p className="flex items-center gap-2 text-sm font-bold text-[#0E7A4E]">
                  <FiTool /> For this course
                </p>
                <ul className="mt-5 space-y-3.5">
                  {course.whatYouNeed.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-[#0A3B2C]"
                    >
                      <FiCheck className="mt-1 shrink-0 text-[#0E7A4E]" />
                      <span className="font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal
                delay={0.1}
                className="rounded-[28px] bg-white p-8 ring-1 ring-[#0A3B2C]/10"
              >
                <p className="flex items-center gap-2 text-sm font-bold text-[#0E7A4E]">
                  <FiMonitor /> For every Uppercore course
                </p>
                <ul className="mt-5 space-y-3.5">
                  {uppercoreKidsProgramme.everyCourseNeeds.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-3 text-[#0A3B2C]"
                    >
                      <FiCheck className="mt-1 shrink-0 text-[#0E7A4E]" />
                      <span className="font-medium">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 rounded-2xl bg-[#F4FAF6] px-4 py-3 text-sm text-[#0F1F18]/70">
                  {uppercoreKidsProgramme.howItWorks}
                </p>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- other courses ---- */}
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <SectionTitle>Looking at other options?</SectionTitle>
                <p className="mt-3 max-w-xl text-lg text-[#0F1F18]/70">
                  {uppercoreKidsProgramme.notSure}
                </p>
              </div>
            </Reveal>

            <motion.div
              className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.07 } },
              }}
            >
              {others.map((c) => {
                const OtherIcon = COURSE_ICONS[c.id];
                return (
                  <MotionLink
                    key={c.id}
                    // to={`/courses/${c.id}`}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      show: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5, ease: EASE },
                      },
                    }}
                    whileHover={{ y: -4 }}
                    className="group rounded-3xl bg-white p-5 ring-1 ring-inset ring-[#0A3B2C]/12 transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7A4E]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#E4F3E9] text-lg text-[#0A3B2C] transition-colors group-hover:bg-[#C8F13C]">
                      <OtherIcon />
                    </span>
                    <p
                      className="mt-4 font-extrabold text-[#0A3B2C]"
                      style={display}
                    >
                      {c.shortTitle}
                    </p>
                    <p className="mt-1 text-sm text-[#0F1F18]/60">
                      Ages {c.ageRange.replace(" years", "")}
                    </p>
                    <p className="mt-3 font-bold text-[#0E7A4E]">
                      {c.price.display}
                    </p>
                  </MotionLink>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* --- final CTA ----- */}
        <section className="px-5 pb-20 lg:px-8 lg:pb-28">
          <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-[#0A3B2C] px-6 py-16 text-center sm:px-12 lg:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-[260px] w-[560px] -translate-x-1/2 rounded-full bg-[#0E7A4E]/50 blur-3xl"
            />
            <div className="relative mx-auto max-w-2xl">
              <h2
                className="text-3xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-5xl"
                style={display}
              >
                Ready to register for {course.shortTitle}?
              </h2>
              <p className="mt-5 text-lg text-white/75">
                {course.duration} of live classes, {course.price.display} per
                child
              </p>
              <div className="mt-9 flex justify-center">
                <CtaLink to={registerTo} variant="lime">
                  Register for this course
                </CtaLink>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ------ sticky mobile register bar -------- */}
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#0A3B2C]/10 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-md items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#0F1F18]/55">
                {course.shortTitle}
              </p>
              <p
                className="text-xl font-extrabold leading-none text-[#0A3B2C]"
                style={display}
              >
                {course.price.display}
              </p>
            </div>
            <CtaLink
              to={registerTo}
              variant="dark"
              className="px-5 py-3 text-sm"
            >
              Register for this course
            </CtaLink>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
