"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/experience/", label: "Experience" },
  { href: "/publications/", label: "Publications" },
  { href: "/articles/", label: "Articles" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="site-nav">
      <div className="nav-inner">
        <Link href="/" className="nav-logo">
          Youssef Adarrab
        </Link>
        <button
          className="mobile-menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? "\u2715" : "\u2630"}
        </button>
        <div className={`nav-links ${open ? "open" : ""}`}>
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="/resume/youssef-adarrab-cv.pdf"
            className="nav-link"
            download
          >
            CV &darr;
          </a>
        </div>
      </div>
    </nav>
  );
}
