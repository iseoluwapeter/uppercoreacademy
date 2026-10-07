import React from "react";
import { motion } from "framer-motion";
import { FiArrowUpRight, FiClock, FiUsers } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import {
  uppercoreKidsCourses,
  uppercoreKidsProgramme,
} from "../components/courses";
import {
  COURSE_ICONS,
  COURSE_SPAN,
  COURSE_TONE,
  CtaLink,
  EASE,
  MotionLink,
  TONES,
  display,
} from "../components/CoursesUi";

export default function CoursesSection({ whatsappHref = "" }) {
  return (
    <section id="explore" className="scroll-mt-16 bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="max-w-2xl">
          <h2
            className="text-3xl font-extrabold leading-[1.08] tracking-tight text-[#0A3B2C] sm:text-4xl lg:text-5xl"
            style={display}
          >
            Explore our courses
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#0F1F18]/70">
            Open any course to see exactly what your child will learn, the
            projects they’ll build, how long it runs and what it costs, before
            you register.
          </p>
        </div>

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.09 } },
          }}
        >
          {uppercoreKidsCourses.map((c, i) => {
            const tone = TONES[COURSE_TONE[c.id]];
            const Icon = COURSE_ICONS[c.id];
            const big = i === 0;
            return (
              <MotionLink
                key={c.id}
                to={`/courses/${c.id}`}
                aria-label={`${c.title}: view course details`}
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.97 },
                  show: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.65, ease: EASE },
                  },
                }}
                whileHover={{ y: -6 }}
                className={`group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-[28px] p-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E7A4E] ${tone.card} ${COURSE_SPAN[c.id]} ${
                  [
                    "scratch-programming",
                    "frontend-development",
                    "data-analysis",
                  ].includes(c.id)
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <Icon
                  aria-hidden="true"
                  className={`pointer-events-none absolute -bottom-10 -right-8 text-[13rem] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${tone.ghost}`}
                />

                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl text-xl ${tone.chip}`}
                  >
                    <Icon />
                  </span>
                  <span
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${tone.pill}`}
                  >
                    <FiUsers /> Ages {c.ageRange.replace(" years", "")}
                  </span>
                </div>

                <div className="relative mt-12">
                  <h3
                    className={`font-extrabold tracking-tight ${big ? "text-3xl sm:text-4xl" : "text-2xl"}`}
                    style={display}
                  >
                    {c.title}
                  </h3>
                  <p
                    className={`mt-2 max-w-md text-base leading-relaxed ${tone.body}`}
                  >
                    {c.tagline}
                  </p>

                  <p
                    className={`mt-4 flex items-center gap-2 text-sm font-semibold ${tone.body}`}
                  >
                    <FiClock className="shrink-0" />
                    {c.duration}, {c.sessions.replace(" per week", " a week")}
                  </p>

                  <div
                    className={`mt-5 flex items-center justify-between border-t pt-4 ${tone.rule}`}
                  >
                    <span className="text-xl font-extrabold" style={display}>
                      {c.price.display}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm font-bold">
                      View course
                      <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </MotionLink>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="mt-6 flex flex-col gap-5 rounded-[28px] bg-[#F4FAF6] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p
              className="text-xl font-extrabold text-[#0A3B2C]"
              style={display}
            >
              Not sure which course is right?
            </p>
            <p className="mt-1.5 max-w-xl text-base text-[#0F1F18]/70">
              {uppercoreKidsProgramme.notSure}
            </p>
          </div>
          {whatsappHref && (
            <CtaLink
              href={whatsappHref}
              variant="dark"
              icon={<FaWhatsapp size={20} />}
              className="shrink-0"
            >
              Ask us on WhatsApp
            </CtaLink>
          )}
        </motion.div>
      </div>
    </section>
  );
}
