"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";

interface ToggleSectionProps {
  id: string;
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function ToggleSection({
  id,
  label,
  children,
  defaultOpen = false,
}: ToggleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [revealed, setRevealed] = useState(defaultOpen);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>(undefined);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      const obs = new ResizeObserver(() => {
        if (contentRef.current) {
          setHeight(contentRef.current.scrollHeight);
        }
      });
      obs.observe(contentRef.current);
      return () => obs.disconnect();
    }
  }, []);

  // Trigger the stagger reveal class after opening
  useEffect(() => {
    if (open) {
      // Small delay so the height animation starts first, then children stagger in
      const t = setTimeout(() => setRevealed(true), 60);
      return () => clearTimeout(t);
    } else {
      setRevealed(false);
    }
  }, [open]);

  // Listen for nav clicks — toggle when the nav link for this section is clicked
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === id) {
        setOpen((v) => !v);
      }
    };
    window.addEventListener("toggle-section", handler);
    return () => window.removeEventListener("toggle-section", handler);
  }, [id]);

  return (
    <section id={id} className={open ? "section--open" : ""}>
      <button
        className="section-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`${id}-content`}
      >
        <span className={`toggle-arrow ${open ? "toggle-arrow--open" : ""}`}>
          &#9654;
        </span>
        <span className="label">{label}</span>
      </button>

      <div
        id={`${id}-content`}
        className={`toggle-body ${revealed ? "toggle-body--revealed" : ""}`}
        style={{
          height: open ? (height ?? "auto") : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
    </section>
  );
}
