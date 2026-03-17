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
  defaultOpen = true,
}: ToggleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
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

  // Listen for nav clicks — collapse when the nav link for this section is clicked
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === id) {
        setOpen(false);
      }
    };
    window.addEventListener("toggle-section", handler);
    return () => window.removeEventListener("toggle-section", handler);
  }, [id]);

  return (
    <section id={id}>
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
        className="toggle-body"
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
