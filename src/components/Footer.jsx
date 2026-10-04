import React from "react";
import Logo from "./SharedComponents";
import { NAV } from "./SharedComponents";

const Footer = () => {
  return (
    <footer className="bg-[#0A3B2C] py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm text-white/65">
            Practical technology programmes for children in the UK.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-semibold text-white/75 hover:text-[#C8F13C]"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 px-5 pt-6 lg:px-8">
        <p className="text-sm text-white/50">
          © {new Date().getFullYear()} Uppercore Academy. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
