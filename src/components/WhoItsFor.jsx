import React from "react";
import { SectionHeading, EASE, display } from "./SharedComponents";
import { motion } from "framer-motion";
import { FiCheck, FiCode } from "react-icons/fi";

const FOR_ITEMS = [
  "Enjoys computers and technology",
  "Loves games and creative activities",
  "Is curious about how things work",
  "Enjoys making things",
  "Wants to learn something beyond school",
  "Is interested in technology but doesn’t know where to start",
];

export default function WhoItsFor({ whatsappHref }) {
  return (
    <section id="for" className="scroll-mt-16 bg-white py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <div>
          <SectionHeading
            title="Is Uppercore right for your child?"
            text="It’s a good fit if your child…"
          />

          <motion.ul
            className="mt-9 grid gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {FOR_ITEMS.map((t) => (
              <motion.li
                key={t}
                variants={{
                  hidden: { opacity: 0, x: -18 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.5, ease: EASE },
                  },
                }}
                className="flex items-center gap-4 rounded-2xl bg-[#F4FAF6] px-5 py-4"
              >
                <motion.span
                  variants={{
                    hidden: { scale: 0 },
                    show: {
                      scale: 1,
                      transition: {
                        type: "spring",
                        stiffness: 420,
                        damping: 16,
                        delay: 0.1,
                      },
                    },
                  }}
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#0A3B2C] text-[#C8F13C]"
                >
                  <FiCheck />
                </motion.span>
                <span className="text-base font-semibold text-[#0A3B2C] sm:text-lg">
                  {t}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative overflow-hidden rounded-[32px] bg-[#0A3B2C] p-9 sm:p-11"
        >
          <FiCode
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-10 text-[15rem] text-white/5"
          />
          <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-[#C8F13C] text-2xl text-[#0A3B2C]">
            <FiCheck />
          </span>
          <p
            className="relative mt-8 text-3xl font-extrabold leading-tight text-white sm:text-4xl"
            style={display}
          >
            No previous coding experience is required for beginner programmes.
          </p>
          {whatsappHref && (
            <div className="relative mt-9">
              <Button
                href={whatsappHref}
                variant="lime"
                icon={<FaWhatsapp size={20} />}
              >
                Ask us a question
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
