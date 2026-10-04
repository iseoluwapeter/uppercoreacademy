import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const display = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

export const EASE = [0.22, 1, 0.36, 1];

export const GLYPHS = [
  { g: "{ }", pos: "left-[6%] top-[14%]", d: 6 },
  { g: "</>", pos: "right-[8%] top-[18%]", d: 7.5 },
  { g: "( )", pos: "left-[12%] bottom-[16%]", d: 8 },
  { g: "=>", pos: "right-[14%] bottom-[14%]", d: 6.5 },
  { g: ";", pos: "left-[48%] top-[8%]", d: 9 },
];

export const NAV = [
  { label: "Pathway", href: "#pathway" },
  { label: "Programmes", href: "#explore" },
  { label: "How it works", href: "#method" },
  { label: "Who it’s for", href: "#for" },
];

const MotionLink = motion.create(Link); // must live at module level
const MotionA = motion.a;

export function Button({
  to, // internal route, e.g. "/register"
  href, // hash or external link, e.g. "#explore", WhatsApp
  children,
  variant = "dark",
  className = "",
  icon,
  ...rest
}) {
  const styles = {
    dark: "bg-[#0A3B2C] text-white hover:bg-[#0E4C39] focus-visible:outline-[#0A3B2C]",
    lime: "bg-[#C8F13C] text-[#0A3B2C] hover:bg-[#D6F760] focus-visible:outline-[#C8F13C]",
    ghost:
      "bg-transparent text-[#0A3B2C] ring-1 ring-inset ring-[#0A3B2C]/20 hover:bg-[#0A3B2C]/5 focus-visible:outline-[#0A3B2C]",
    ghostLight:
      "bg-transparent text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 focus-visible:outline-white",
  };

  const shared = {
    whileHover: { y: -2 },
    whileTap: { scale: 0.97 },
    className: `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-bold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${styles[variant]} ${className}`,
    ...rest,
  };

  const content = (
    <>
      {icon}
      {children}
    </>
  );

  return to ? (
    <MotionLink to={to} {...shared}>
      {content}
    </MotionLink>
  ) : (
    <MotionA href={href} {...shared}>
      {content}
    </MotionA>
  );
}

export default function Logo({ light = false }) {
  return (
    <a
      href="#top"
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0E7A4E]"
      aria-label="Uppercore Kids UK home"
    >
      {/* <span
        className="grid h-9 w-9 place-items-center rounded-xl bg-[#C8F13C] text-lg font-extrabold leading-none text-[#0A3B2C]"
        style={display}
      >
        U
      </span> */}
      <span className="leading-none">
        <span
          className={`block text-lg font-extrabold tracking-tight ${
            light ? "text-white" : "text-[#0A3B2C]"
          }`}
          style={display}
        >
          Uppercore
        </span>
        <span
          className={`mt-0.5 block text-[11px] font-semibold ${
            light ? "text-[#C8F13C]" : "text-[#0E7A4E]"
          }`}
        >
          Kids
        </span>
      </span>
    </a>
  );
}

export function SectionHeading({ title, text, light = false }) {
  return (
    <div className="max-w-2xl">
      <h2
        className={`text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl lg:text-5xl ${
          light ? "text-white" : "text-[#0A3B2C]"
        }`}
        style={display}
      >
        {title}
      </h2>
      {text && (
        <p
          className={`mt-5 max-w-xl text-lg leading-relaxed ${
            light ? "text-white/75" : "text-[#0F1F18]/70"
          }`}
        >
          {text}
        </p>
      )}
    </div>
  );
}
