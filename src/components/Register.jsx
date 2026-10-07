import React from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiCode,
  FiCompass,
  FiCpu,
  FiEdit3,
  FiGlobe,
  FiLayers,
  FiMenu,
  FiMessageCircle,
  FiMonitor,
  FiPenTool,
  FiPlay,
  FiRefreshCw,
  FiShield,
  FiTarget,
  FiTool,
  FiUsers,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "./Footer";
import Logo from "./SharedComponents";
import { display, EASE, Button, SectionHeading } from "./SharedComponents";
import RegisterCTA from "./RegisterCTA";
import WhoItsFor from "./WhoItsFor";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import CoursesSection from "./CoursesSection";

function useTypewriter(text, { speed = 45, delay = 400 } = {}) {
  const [out, setOut] = useState("");
  useEffect(() => {
    let i = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setOut(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      clearInterval(interval);
    };
  }, [text, speed, delay]);
  return { out, done: out.length === text.length };
}

/* -------------------------------------------------------------------------- */
/*  Hero project window: the page’s one memorable moment                       */
/* -------------------------------------------------------------------------- */

function GameScene() {
  const [score, setScore] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScore((s) => s + 10), 1400);
    return () => clearInterval(t);
  }, []);

  const blocks = [
    { c: "bg-[#FFBF00] text-[#4A3500] rounded-t-2xl", t: "when flag clicked" },
    { c: "bg-[#FF9F1A] text-[#4A2A00]", t: "forever" },
    { c: "bg-[#4C97FF] text-white ml-4", t: "move 10 steps" },
    { c: "bg-[#4C97FF] text-white ml-4", t: "if on edge, bounce" },
    { c: "bg-[#9966FF] text-white ml-4", t: "change score by 10" },
  ];

  return (
    <div className="grid h-full grid-cols-[0.95fr_1.05fr] gap-3">
      <div className="flex flex-col gap-1.5 overflow-hidden rounded-2xl bg-[#F4FAF6] p-3">
        {blocks.map((b, i) => (
          <motion.div
            key={b.t}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4, ease: EASE }}
            className={`rounded-lg px-3 py-2 text-[11px] font-bold shadow-sm ${b.c}`}
          >
            {b.t}
          </motion.div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#BFE6FF] to-[#E4F6E9]">
        <div className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold text-[#0A3B2C] shadow-sm">
          Score {score}
        </div>

        <motion.div
          className="absolute left-4 top-8 h-4 w-14 rounded-full bg-white/80"
          animate={{ x: [-10, 18, -10] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-6 top-16 h-3 w-10 rounded-full bg-white/70"
          animate={{ x: [8, -12, 8] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        {[26, 48, 70].map((left, i) => (
          <motion.span
            key={left}
            className="absolute bottom-[88px] h-4 w-4 rounded-full border-2 border-[#E6A800] bg-[#FFD84D]"
            style={{ left: `${left}%` }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.25 }}
          />
        ))}

        <div className="absolute inset-x-0 bottom-0 h-10 border-t-4 border-[#C8F13C] bg-[#0E7A4E]" />

        <motion.div
          className="absolute bottom-9"
          animate={{ left: ["6%", "68%", "6%"] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            animate={{ y: [0, -16, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeOut" }}
            className="relative h-11 w-11 rounded-2xl bg-[#FF7A59]"
          >
            <span className="absolute left-2 top-3 h-3 w-3 rounded-full bg-white">
              <span className="absolute right-0.5 top-1 h-1.5 w-1.5 rounded-full bg-[#0F1F18]" />
            </span>
            <span className="absolute right-2 top-3 h-3 w-3 rounded-full bg-white">
              <span className="absolute right-0.5 top-1 h-1.5 w-1.5 rounded-full bg-[#0F1F18]" />
            </span>
            <span className="absolute bottom-2.5 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-[#0F1F18]/70" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function WebScene() {
  const lines = [
    {
      delay: 0.3,
      parts: [
        ["<h1>", "text-[#C8F13C]"],
        ["Hi, I’m Tobi", "text-white"],
        ["</h1>", "text-[#C8F13C]"],
      ],
    },
    {
      delay: 1.1,
      parts: [
        ["<p>", "text-[#7FD6A8]"],
        ["I build games and websites.", "text-white/90"],
        ["</p>", "text-[#7FD6A8]"],
      ],
    },
    {
      delay: 1.9,
      parts: [
        ["<button>", "text-[#FFB59F]"],
        ["See my work", "text-white/90"],
        ["</button>", "text-[#FFB59F]"],
      ],
    },
  ];

  return (
    <div className="grid h-full grid-cols-[1fr_1fr] gap-3">
      <div className="overflow-hidden rounded-2xl bg-[#0A2A20] p-4 font-mono text-[11px] leading-6 sm:text-xs">
        {lines.map((l) => (
          <motion.div
            key={l.delay}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: l.delay, duration: 0.4 }}
            className="mb-2 break-words"
          >
            {l.parts.map(([text, color]) => (
              <span key={text} className={color}>
                {text}
              </span>
            ))}
          </motion.div>
        ))}
        <motion.span
          className="inline-block h-4 w-1.5 translate-y-0.5 bg-[#C8F13C]"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      <div className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-[#0A3B2C]/10">
        <div className="flex items-center gap-2 border-b border-[#0A3B2C]/10 bg-[#F4FAF6] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#0A3B2C]/20" />
          <span className="truncate rounded-full bg-white px-3 py-0.5 text-[10px] font-semibold text-[#0A3B2C]/60 ring-1 ring-[#0A3B2C]/10">
            tobi-portfolio
          </span>
        </div>
        <div className="flex flex-1 flex-col items-start justify-center gap-2 bg-gradient-to-br from-white to-[#E4F3E9] p-4">
          <motion.h4
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: EASE }}
            className="text-xl font-extrabold leading-tight text-[#0A3B2C]"
            style={display}
          >
            Hi, I’m Tobi
          </motion.h4>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5, ease: EASE }}
            className="text-xs text-[#0F1F18]/70"
          >
            I build games and websites.
          </motion.p>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 2.1,
              type: "spring",
              stiffness: 300,
              damping: 18,
            }}
            className="mt-1 rounded-full bg-[#0A3B2C] px-3.5 py-1.5 text-xs font-bold text-white"
          >
            See my work
          </motion.span>
        </div>
      </div>
    </div>
  );
}

function AiScene() {
  const prompt = "A story about a robot who learns to dance";
  const { out, done } = useTypewriter(prompt, { speed: 38, delay: 350 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setReady(true), 1100);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="rounded-2xl bg-[#F4FAF6] p-3 ring-1 ring-[#0A3B2C]/10">
        <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold text-[#0A3B2C]/60">
          <FiEdit3 /> Your idea
        </p>
        <p className="min-h-[2.5rem] text-sm font-semibold leading-snug text-[#0A3B2C]">
          {out}
          <motion.span
            className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-[#0E7A4E]"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          />
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <AnimatePresence mode="wait">
          {!ready ? (
            <motion.div
              key="thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: done ? 1 : 0.35 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2 text-sm font-semibold text-[#0A3B2C]/60"
            >
              <span>{done ? "Creating" : "Waiting for your idea"}</span>
              {done &&
                [0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-[#0E7A4E]"
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.12,
                    }}
                  />
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="flex w-full items-center gap-4 rounded-2xl bg-white p-3 shadow-[0_12px_30px_-14px_rgba(10,59,44,0.4)] ring-1 ring-[#0A3B2C]/10"
            >
              <div className="relative grid h-24 w-24 shrink-0 place-items-end justify-items-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#C8F13C] to-[#0E7A4E]">
                <span className="absolute left-3 top-3 h-5 w-5 rounded-full bg-white/70" />
                <motion.div
                  className="mb-2 flex origin-bottom flex-col items-center"
                  animate={{ rotate: [-8, 8, -8] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <span className="mb-0.5 h-2 w-0.5 bg-white" />
                  <span className="relative h-7 w-9 rounded-lg bg-white">
                    <span className="absolute left-1.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#0A3B2C]" />
                    <span className="absolute right-1.5 top-2.5 h-1.5 w-1.5 rounded-full bg-[#0A3B2C]" />
                  </span>
                  <span className="mt-0.5 h-6 w-7 rounded-md bg-[#0A3B2C]" />
                </motion.div>
              </div>
              <div className="min-w-0">
                <p
                  className="text-base font-extrabold text-[#0A3B2C]"
                  style={display}
                >
                  Zed the Dancing Robot
                </p>
                <p className="mt-1 text-xs leading-relaxed text-[#0F1F18]/70">
                  Zed had two left feet, until the night the music came on and
                  every wire in his body began to sway.
                </p>
                <div className="mt-2 flex gap-1.5">
                  {["Story", "Illustration"].map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-[#E4F3E9] px-2.5 py-0.5 text-[10px] font-bold text-[#0A3B2C]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const TABS = [
  {
    id: "game",
    label: "Game",
    icon: FiPlay,
    caption: "Build your own game",
    Scene: GameScene,
  },
  {
    id: "web",
    label: "Website",
    icon: FiMonitor,
    caption: "Publish your first website",
    Scene: WebScene,
  },
  {
    id: "ai",
    label: "AI project",
    icon: FiCpu,
    caption: "Create with AI",
    Scene: AiScene,
  },
];

function ProjectWindow() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const t = setInterval(() => setActive((a) => (a + 1) % TABS.length), 7500);
    return () => clearInterval(t);
  }, [touched]);

  const { Scene } = TABS[active];

  return (
    <div className="relative mx-auto w-full max-w-140">
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-16 z-10 hidden items-center gap-3 rounded-2xl bg-[#0A3B2C] px-4 py-3 shadow-[0_18px_40px_-18px_rgba(10,59,44,0.7)] sm:flex"
      >
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-[#C8F13C]">
          <FiCheck />
        </span>
        <span>
          <span className="block text-sm font-bold text-white">
            No experience needed
          </span>
          <span className="block text-xs text-white/60">
            For beginner programmes
          </span>
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 36, rotate: 1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}
        className="relative overflow-hidden rounded-3xl bg-white shadow-[0_40px_90px_-40px_rgba(10,59,44,0.55)] ring-1 ring-[#0A3B2C]/10"
      >
        <div className="flex items-center gap-3 border-b border-[#0A3B2C]/10 bg-[#F4FAF6] px-4 py-3">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A59]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#FFD84D]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#0E7A4E]" />
          </div>
          <p className="truncate text-xs font-semibold text-[#0A3B2C]/60">
            my-first-project
          </p>
        </div>

        <div
          role="tablist"
          aria-label="Example projects"
          className="flex flex-wrap gap-1.5 px-4 pt-4"
        >
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => {
                setTouched(true);
                setActive(i);
              }}
              className="relative rounded-full px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7A4E]"
            >
              {i === active && (
                <motion.span
                  layoutId="hero-tab-pill"
                  className="absolute inset-0 rounded-full bg-[#0A3B2C]"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span
                className={`relative z-10 flex items-center gap-1.5 transition-colors ${
                  i === active
                    ? "text-white"
                    : "text-[#0A3B2C]/70 hover:text-[#0A3B2C]"
                }`}
              >
                <tab.icon /> {tab.label}
              </span>
            </button>
          ))}
        </div>

        <div className="relative h-[330px] p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={TABS[active].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-4"
              role="tabpanel"
            >
              <Scene />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t border-[#0A3B2C]/10 bg-[#F4FAF6] px-4 py-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={TABS[active].id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="text-sm font-bold text-[#0A3B2C]"
            >
              {TABS[active].caption}
            </motion.p>
          </AnimatePresence>
          <span className="text-xs font-semibold text-[#0E7A4E]">
            Made by an Uppercore student
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                       */
/* -------------------------------------------------------------------------- */

function Hero({ registerHref }) {
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const item = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
  };
  const line = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
  };

  return (
    <section className="relative overflow-hidden bg-[#F4FAF6] pb-20 pt-32 lg:pb-28 lg:pt-40">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,59,44,0.12) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 70% 30%, black 10%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 30%, black 10%, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#C8F13C]/40 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-[1.02fr_1fr] lg:px-8">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A3B2C] ring-1 ring-[#0A3B2C]/10"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0E7A4E] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#0E7A4E]" />
            </span>
            Second cohort open for registration
          </motion.div>

          <h1
            className="mt-7 text-[2.75rem] font-extrabold leading-[1.02] tracking-tight text-[#0A3B2C] sm:text-6xl lg:text-[4.5rem]"
            style={display}
          >
            {["Turn screen time", "into creative time."].map((t) => (
              <span key={t} className="block overflow-hidden pb-1.5">
                <motion.span variants={line} className="block">
                  {t}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-[#0F1F18]/75 sm:text-xl"
          >
            Technology is already part of your child’s world. We help them move
            from simply consuming technology to creating with it.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to={registerHref} variant="dark">
              Join the Second Cohort
            </Button>
            <Button href="#explore" variant="ghost">
              See what they can build
            </Button>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-[#0A3B2C]/80"
          >
            {[
              [FiUsers, "Ages 8–17"],
              [FiGlobe, "Online classes"],
              [FiLayers, "Practical, project-based learning"],
            ].map(([Icon, label]) => (
              <li key={label} className="flex items-center gap-2">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#0E7A4E] ring-1 ring-[#0A3B2C]/10">
                  <Icon />
                </span>
                {label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <ProjectWindow />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pathway: Discover → Build → Specialise (a true sequence)                   */
/* -------------------------------------------------------------------------- */

const STAGES = [
  {
    icon: FiCompass,
    title: "Discover",
    text: "Find what interests them.",
    tags: ["Scratch", "Games", "AI", "Digital creativity"],
  },
  {
    icon: FiTool,
    title: "Build",
    text: "Turn ideas into real projects.",
    tags: ["Websites", "Games", "Designs", "Interactive projects"],
  },
  {
    icon: FiTarget,
    title: "Specialise",
    text: "Go deeper into what they love.",
    tags: [
      "Web development",
      "AI",
      "Data",
      "Cybersecurity",
      "Creative technology",
    ],
  },
];

function Pathway() {
  return (
    <section
      id="pathway"
      className="relative scroll-mt-16 overflow-hidden bg-[#0A3B2C] py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/2 h-[380px] w-[380px] -translate-y-1/2 rounded-full bg-[#0E7A4E]/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          light
          title="Your child is already using technology. What if they could learn to create with it?"
          text="Uppercore Kids helps children explore technology through practical projects that build creativity, problem-solving and digital skills."
        />

        <div className="relative mt-16 grid gap-12 lg:grid-cols-3 lg:gap-x-8">
          {/* connecting line, drawn on scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-7 left-7 top-7 w-px -translate-x-1/2 bg-white/15 lg:hidden"
          >
            <motion.div
              className="h-full w-full origin-top bg-[#C8F13C]"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute left-7 top-7 hidden h-px bg-white/15 lg:block lg:right-[calc(33.333%-3.1rem)]"
          >
            <motion.div
              className="h-full w-full origin-left bg-[#C8F13C]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>

          {STAGES.map((s, i) => (
            <div key={s.title} className="relative flex gap-5 lg:block">
              <motion.div
                initial={{ backgroundColor: "#12503D", color: "#FFFFFF" }}
                whileInView={{ backgroundColor: "#C8F13C", color: "#0A3B2C" }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: i * 0.7, duration: 0.4 }}
                className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full text-2xl ring-4 ring-[#0A3B2C]"
              >
                <s.icon />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-white text-xs font-extrabold text-[#0A3B2C]">
                  {i + 1}
                </span>
              </motion.div>

              <div className="lg:mt-8">
                <h3
                  className="text-2xl font-extrabold text-white"
                  style={display}
                >
                  {s.title}
                </h3>
                <p className="mt-2 text-lg text-white/75">{s.text}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold text-white/90 ring-1 ring-white/10"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Explore: programme bento                                                   */
/* -------------------------------------------------------------------------- */

const TONES = {
  lime: {
    card: "bg-[#C8F13C] text-[#0A3B2C]",
    chip: "bg-[#0A3B2C] text-[#C8F13C]",
    tag: "bg-[#0A3B2C]/10 text-[#0A3B2C]",
    body: "text-[#0A3B2C]/80",
    ghost: "text-[#0A3B2C]/10",
  },
  mint: {
    card: "bg-[#E4F3E9] text-[#0A3B2C]",
    chip: "bg-[#0A3B2C] text-white",
    tag: "bg-[#0A3B2C]/10 text-[#0A3B2C]",
    body: "text-[#0F1F18]/70",
    ghost: "text-[#0A3B2C]/10",
  },
  forest: {
    card: "bg-[#0A3B2C] text-white",
    chip: "bg-[#C8F13C] text-[#0A3B2C]",
    tag: "bg-white/10 text-white/90",
    body: "text-white/75",
    ghost: "text-white/10",
  },
  white: {
    card: "bg-white text-[#0A3B2C] ring-1 ring-inset ring-[#0A3B2C]/12",
    chip: "bg-[#C8F13C] text-[#0A3B2C]",
    tag: "bg-[#0A3B2C]/5 text-[#0A3B2C]",
    body: "text-[#0F1F18]/70",
    ghost: "text-[#0A3B2C]/5",
  },
};

const PROGRAMMES = [
  {
    icon: FiPlay,
    title: "Games & Scratch",
    outcome: "Build three games of your own.",
    tags: ["Scratch", "Game mechanics", "Animation"],
    span: "lg:col-span-5",
    tone: "lime",
  },
  {
    icon: FiMonitor,
    title: "Web development",
    outcome: "Build and publish your first website.",
    tags: ["HTML", "CSS", "JavaScript"],
    span: "lg:col-span-4",
    tone: "mint",
  },
  {
    icon: FiCpu,
    title: "AI creation",
    outcome: "Create your own AI-powered project.",
    tags: ["Stories", "Images", "Simple AI apps"],
    span: "lg:col-span-3",
    tone: "forest",
  },
  {
    icon: FiPenTool,
    title: "Digital design",
    outcome: "Design your own brand and digital poster.",
    tags: ["Graphics", "Branding", "Posters"],
    span: "lg:col-span-3",
    tone: "white",
  },
  {
    icon: FiBarChart2,
    title: "Data & analytics",
    outcome: "Analyse real-world data and build a dashboard.",
    tags: ["Spreadsheets", "Charts", "Dashboards"],
    span: "lg:col-span-4",
    tone: "mint",
  },
  {
    icon: FiShield,
    title: "Cybersecurity",
    outcome: "Become a Cyber Defender and learn to protect yourself online.",
    tags: ["Passwords", "Phishing", "Online safety"],
    span: "lg:col-span-5",
    tone: "forest",
  },
];

// function Explore() {
//   return (
//     <section id="explore" className="scroll-mt-16 bg-white py-24 lg:py-32">
//       <div className="mx-auto max-w-7xl px-5 lg:px-8">
//         <SectionHeading
//           title="What can your child explore?"
//           text="Your child doesn’t have to know what they want to specialise in yet. That’s part of the journey."
//         />

//         <motion.div
//           className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12"
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true, amount: 0.15 }}
//           variants={{
//             hidden: {},
//             show: { transition: { staggerChildren: 0.09 } },
//           }}
//         >
//           {PROGRAMMES.map((p) => {
//             const tone = TONES[p.tone];
//             return (
//               <motion.article
//                 key={p.title}
//                 variants={{
//                   hidden: { opacity: 0, y: 28, scale: 0.97 },
//                   show: {
//                     opacity: 1,
//                     y: 0,
//                     scale: 1,
//                     transition: { duration: 0.65, ease: EASE },
//                   },
//                 }}
//                 whileHover={{ y: -6 }}
//                 className={`group relative flex min-h-[250px] flex-col justify-between overflow-hidden rounded-[28px] p-7 ${tone.card} ${p.span}`}
//               >
//                 <p.icon
//                   aria-hidden="true"
//                   className={`pointer-events-none absolute -bottom-8 -right-6 text-[11rem] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${tone.ghost}`}
//                 />

//                 <span
//                   className={`relative grid h-12 w-12 place-items-center rounded-2xl text-xl ${tone.chip}`}
//                 >
//                   <p.icon />
//                 </span>

//                 <div className="relative mt-10">
//                   <h3
//                     className="text-2xl font-extrabold tracking-tight"
//                     style={display}
//                   >
//                     {p.title}
//                   </h3>
//                   <p
//                     className={`mt-2 max-w-sm text-base leading-relaxed ${tone.body}`}
//                   >
//                     {p.outcome}
//                   </p>
//                   <ul className="mt-5 flex flex-wrap gap-2">
//                     {p.tags.map((t) => (
//                       <li
//                         key={t}
//                         className={`rounded-full px-3 py-1 text-xs font-bold ${tone.tag}`}
//                       >
//                         {t}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </motion.article>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

const METHOD = [
  {
    icon: FiBookOpen,
    title: "Learn",
    text: "A new concept, explained simply and shown in action.",
  },
  {
    icon: FiTool,
    title: "Build",
    text: "They put it to work straight away in a real project.",
  },
  {
    icon: FiMessageCircle,
    title: "Get feedback",
    text: "Instructors review the work and point out what’s working and what to try next.",
  },
  {
    icon: FiRefreshCw,
    title: "Improve",
    text: "They revise the project, fixing and upgrading it as they go.",
  },
  {
    icon: FiAward,
    title: "Showcase",
    text: "They present what they made to their family.",
  },
];

const STEP_MS = 3400;

function Method({ studentProjects }) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    const t = setInterval(
      () => setActive((a) => (a + 1) % METHOD.length),
      STEP_MS,
    );
    return () => clearInterval(t);
  }, [touched]);

  const Current = METHOD[active];

  return (
    <section id="method" className="scroll-mt-16 bg-[#F4FAF6] py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <SectionHeading
          title="We don’t just teach. We help them create."
          text="Every programme follows the same loop, so each child finishes with something real to show for it."
        />

        <div
          role="tablist"
          aria-label="How every programme works"
          className="mt-14 grid gap-3 sm:grid-cols-5"
        >
          {METHOD.map((m, i) => {
            const isActive = i === active;
            const isDone = i < active;
            return (
              <button
                key={m.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setTouched(true);
                  setActive(i);
                }}
                className="group relative rounded-2xl bg-white p-4 text-left ring-1 ring-[#0A3B2C]/10 transition-shadow hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E7A4E]"
              >
                <span
                  className={`grid h-10 w-10 place-items-center rounded-xl text-lg transition-colors duration-300 ${
                    isActive || isDone
                      ? "bg-[#0A3B2C] text-[#C8F13C]"
                      : "bg-[#E4F3E9] text-[#0A3B2C]"
                  }`}
                >
                  <m.icon />
                </span>
                <span
                  className="mt-3 block text-base font-extrabold text-[#0A3B2C]"
                  style={display}
                >
                  {m.title}
                </span>

                <span className="absolute inset-x-4 bottom-0 h-1 overflow-hidden rounded-full bg-[#0A3B2C]/10">
                  {isDone && (
                    <span className="block h-full w-full bg-[#0E7A4E]" />
                  )}
                  {isActive && (
                    <motion.span
                      key={`${active}-${touched}`}
                      className="block h-full bg-[#0E7A4E]"
                      initial={{ width: touched ? "100%" : "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: touched ? 0.35 : STEP_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 min-h-[120px] overflow-hidden rounded-3xl bg-[#0A3B2C] p-8 sm:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={Current.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8"
              role="tabpanel"
            >
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[#C8F13C] text-3xl text-[#0A3B2C]">
                <Current.icon />
              </span>
              <div>
                <h3
                  className="text-2xl font-extrabold text-white"
                  style={display}
                >
                  {Current.title}
                </h3>
                <p className="mt-1.5 max-w-2xl text-lg text-white/75">
                  {Current.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {studentProjects.length > 0 && (
          <div className="mt-20">
            <h3
              className="text-2xl font-extrabold text-[#0A3B2C] sm:text-3xl"
              style={display}
            >
              Built by Uppercore students
            </h3>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {studentProjects.map((p, i) => (
                <motion.figure
                  key={p.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="overflow-hidden rounded-3xl bg-white ring-1 ring-[#0A3B2C]/10"
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="p-5">
                    <p
                      className="text-base font-extrabold text-[#0A3B2C]"
                      style={display}
                    >
                      {p.title}
                    </p>
                    {p.by && (
                      <p className="mt-0.5 text-sm text-[#0F1F18]/60">{p.by}</p>
                    )}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function UppercoreKidsLanding({
  registerTo = "/register",
  whatsappHref = "",
  studentProjects = [],
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,800&family=Figtree:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
      `}</style>

      <div
        id="top"
        className="overflow-x-hidden bg-white text-[#0F1F18] antialiased"
        style={{
          fontFamily: "'Figtree', ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <Navbar registerHref={registerTo} />
        <main>
          <Hero registerHref={registerTo} />
          <Pathway />
          {/* <Explore /> */}
          <CoursesSection />
          <Method studentProjects={studentProjects} />
          <WhoItsFor whatsappHref={whatsappHref} />
          <RegisterCTA registerHref={registerTo} whatsappHref={whatsappHref} />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
