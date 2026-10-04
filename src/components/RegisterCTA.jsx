import React from "react";
import { motion } from "framer-motion";
import { EASE, GLYPHS, display, Button } from "./SharedComponents";

export default function RegisterCTA({ registerHref, whatsappHref }) {
  return (
    <section
      id="register"
      className="scroll-mt-16 bg-white px-5 pb-24 lg:px-8 lg:pb-32"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[40px] bg-[#0A3B2C] px-6 py-20 text-center sm:px-12 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#0E7A4E]/50 blur-3xl"
        />
        {GLYPHS.map((x) => (
          <motion.span
            key={x.g}
            aria-hidden="true"
            className={`pointer-events-none absolute hidden font-mono text-3xl font-bold text-[#C8F13C]/25 sm:block ${x.pos}`}
            animate={{ y: [0, -14, 0], rotate: [0, 4, 0] }}
            transition={{ duration: x.d, repeat: Infinity, ease: "easeInOut" }}
          >
            {x.g}
          </motion.span>
        ))}

        <div className="relative mx-auto max-w-3xl">
          <h2
            className="text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl"
            style={display}
          >
            Ready to turn screen time into creative time?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
            Register your child’s interest for the next Uppercore Kids UK
            cohort.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              to={registerHref}
              variant="lime"
              className="w-full sm:w-auto"
            >
              Register now
            </Button>
            {whatsappHref && (
              <Button
                href={whatsappHref}
                variant="ghostLight"
                icon={<FaWhatsapp size={20} />}
                className="w-full sm:w-auto"
              >
                Chat on WhatsApp
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
