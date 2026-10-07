import React from "react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiBarChart2,
  FiCpu,
  FiMonitor,
  FiPenTool,
  FiPlay,
} from "react-icons/fi";

export const EASE = [0.22, 1, 0.36, 1];

export const display = {
  fontFamily: "'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif",
};

// Must be created once, at module level (not inside a component).
export const MotionLink = motion.create(Link); // framer-motion < 11.11: motion(Link)

/*--- course styling ---- */

export const COURSE_ICONS = {
  "scratch-programming": FiPlay,
  "frontend-development": FiMonitor,
  "ai-creation": FiCpu,
  "graphics-design": FiPenTool,
  "data-analysis": FiBarChart2,
};

export const COURSE_TONE = {
  "scratch-programming": "lime",
  "frontend-development": "forest",
  "ai-creation": "mint",
  "graphics-design": "white",
  "data-analysis": "forest",
};

export const COURSE_SPAN = {
  "scratch-programming": "lg:col-span-7",
  "frontend-development": "lg:col-span-5",
  "ai-creation": "lg:col-span-4",
  "graphics-design": "lg:col-span-4",
  "data-analysis": "lg:col-span-4",
};

export const TONES = {
  lime: {
    card: "bg-[#C8F13C] text-[#0A3B2C]",
    chip: "bg-[#0A3B2C] text-[#C8F13C]",
    pill: "bg-[#0A3B2C]/10 text-[#0A3B2C]",
    body: "text-[#0A3B2C]/80",
    ghost: "text-[#0A3B2C]/10",
    rule: "border-[#0A3B2C]/15",
  },
  mint: {
    card: "bg-[#E4F3E9] text-[#0A3B2C]",
    chip: "bg-[#0A3B2C] text-white",
    pill: "bg-[#0A3B2C]/10 text-[#0A3B2C]",
    body: "text-[#0F1F18]/70",
    ghost: "text-[#0A3B2C]/10",
    rule: "border-[#0A3B2C]/15",
  },
  forest: {
    card: "bg-[#0A3B2C] text-white",
    chip: "bg-[#C8F13C] text-[#0A3B2C]",
    pill: "bg-white/10 text-white/90",
    body: "text-white/75",
    ghost: "text-white/10",
    rule: "border-white/15",
  },
  white: {
    card: "bg-white text-[#0A3B2C] ring-1 ring-inset ring-[#0A3B2C]/12",
    chip: "bg-[#C8F13C] text-[#0A3B2C]",
    pill: "bg-[#0A3B2C]/5 text-[#0A3B2C]",
    body: "text-[#0F1F18]/70",
    ghost: "text-[#0A3B2C]/5",
    rule: "border-[#0A3B2C]/10",
  },
};

/* --- fonts ---- */

export function FontStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap');
      html { scroll-behavior: smooth; }
      @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
    `}</style>
  );
}

export const bodyFont = {
  fontFamily: "'Figtree', ui-sans-serif, system-ui, sans-serif",
};

export function CtaLink({
  to,
  href,
  variant = "dark",
  className = "",
  icon,
  children,
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
  const props = {
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
    <MotionLink to={to} {...props}>
      {content}
    </MotionLink>
  ) : (
    <motion.a href={href} {...props}>
      {content}
    </motion.a>
  );
}

export function ScrollManager({ offset = 76 }) {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const t = setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 60);
    return () => clearTimeout(t);
  }, [pathname, hash, offset]);

  return null;
}
