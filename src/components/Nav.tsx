"use client";

import Link from "next/link";

function handleNavClick(sectionId: string) {
  window.dispatchEvent(
    new CustomEvent("toggle-section", { detail: sectionId })
  );
}

export default function Nav() {
  return (
    <nav className="top-nav">
      <Link href="/" className="top-nav-home">YA</Link>
      <Link href="/#blog" onClick={() => handleNavClick("blog")}>Blog</Link>
      <Link
        href="/#experience"
        onClick={() => handleNavClick("experience")}
      >
        Experience
      </Link>
      <Link
        href="/#education"
        onClick={() => handleNavClick("education")}
      >
        Education
      </Link>
      <Link href="/#publications" onClick={() => handleNavClick("publications")}>Publications</Link>
    </nav>
  );
}
