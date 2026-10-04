import React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Logo from "./SharedComponents";
import { NAV, Button, EASE } from "./SharedComponents";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

// export default function Navbar({ registerHref }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <motion.header
//       initial={{ y: -24, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.6, ease: EASE }}
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//         scrolled || open
//           ? "bg-white/85 shadow-[0_1px_0_rgba(10,59,44,0.08)] backdrop-blur-xl"
//           : "bg-transparent"
//       }`}
//     >
//       <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-5 lg:px-8">
//         <Logo />

//         <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
//           {NAV.map((l) => (
//             <a
//               key={l.href}
//               href={l.href}
//               className="rounded-full px-4 py-2 text-sm font-semibold text-[#0A3B2C]/75 transition-colors hover:bg-[#0A3B2C]/5 hover:text-[#0A3B2C]"
//             >
//               {l.label}
//             </a>
//           ))}
//         </nav>

//         <div className="flex items-center gap-2">
//           <Link
//             to={registerHref}
//             className="hidden rounded-full bg-[#0A3B2C] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0E4C39] sm:inline-flex"
//           >
//             Register now
//           </Link>
//           <button
//             type="button"
//             onClick={() => setOpen((o) => !o)}
//             aria-expanded={open}
//             aria-label={open ? "Close menu" : "Open menu"}
//             className="grid h-10 w-10 place-items-center rounded-full text-[#0A3B2C] ring-1 ring-[#0A3B2C]/15 lg:hidden"
//           >
//             {open ? <FiX size={20} /> : <FiMenu size={20} />}
//           </button>
//         </div>
//       </div>

//       <AnimatePresence>
//         {open && (
//           <motion.nav
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: EASE }}
//             className="overflow-hidden lg:hidden"
//             aria-label="Mobile"
//           >
//             <div className="flex flex-col gap-1 px-5 pb-5 pt-2">
//               {NAV.map((l) => (
//                 <a
//                   key={l.href}
//                   href={l.href}
//                   onClick={() => setOpen(false)}
//                   className="rounded-xl px-3 py-3 text-base font-semibold text-[#0A3B2C] hover:bg-[#0A3B2C]/5"
//                 >
//                   {l.label}
//                 </a>
//               ))}
//               <Link
//                 to={registerHref}
//                 className="mt-2 rounded-full bg-[#0A3B2C] px-5 py-3 text-center font-bold text-white"
//               >
//                 Register now
//               </Link>
//             </div>
//           </motion.nav>
//         )}
//       </AnimatePresence>
//     </motion.header>
//   );
// }

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
