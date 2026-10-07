import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Logo from "./SharedComponents";
import { NAV, Button, EASE } from "./SharedComponents";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar({ registerHref }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 shadow-[0_1px_0_rgba(10,59,44,0.08)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-sm font-semibold text-[#0A3B2C]/75 transition-colors hover:bg-[#0A3B2C]/5 hover:text-[#0A3B2C]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <Link
          to={registerHref}
          className="inline-flex rounded-full bg-[#0A3B2C] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0E4C39]"
        >
          Register now
        </Link>
      </div>
    </motion.header>
  );
}
