"use client";

import { useEffect, useRef, useCallback } from "react";

const ASCII_CHARS = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";
const GLITCH_CHARS = "█▓▒░╬╠╣╦╩┼┤├─│▄▀■□";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  char: string;
  r: number;
  g: number;
  b: number;
}

export default function AsciiPortrait({ src, cols = 150 }: { src: string; cols?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const animRef = useRef(0);
  const phaseRef = useRef<"loading" | "scramble" | "revealed">("loading");
  const revealProgressRef = useRef(0);
  const glitchRef = useRef<{ active: boolean; lines: Set<number> }>({ active: false, lines: new Set() });
  const dimsRef = useRef({ rows: 0, cols: 0, charW: 0, charH: 0 });

  const initParticles = useCallback((img: HTMLImageElement) => {
    const fontSize = 7;
    const charW = fontSize * 0.6;
    const charH = fontSize * 0.95;

    const aspect = img.height / img.width;
    const rows = Math.floor(cols * aspect * 0.55);

    // Sample image
    const offscreen = document.createElement("canvas");
    offscreen.width = cols;
    offscreen.height = rows;
    const ctx = offscreen.getContext("2d")!;
    ctx.drawImage(img, 0, 0, cols, rows);
    const imageData = ctx.getImageData(0, 0, cols, rows);

    const particles: Particle[] = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const i = (y * cols + x) * 4;
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];
        const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const charIdx = Math.floor((1 - brightness) * (ASCII_CHARS.length - 1));
        const bx = x * charW;
        const by = y * charH;
        particles.push({
          x: bx, y: by,
          baseX: bx, baseY: by,
          vx: 0, vy: 0,
          char: ASCII_CHARS[charIdx],
          r, g, b,
        });
      }
    }

    particlesRef.current = particles;
    dimsRef.current = { rows, cols, charW, charH };

    // Set canvas size
    const canvas = canvasRef.current!;
    canvas.width = Math.ceil(cols * charW);
    canvas.height = Math.ceil(rows * charH);
  }, [cols]);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const particles = particlesRef.current;
    const mouse = mouseRef.current;
    const { rows, cols: numCols, charH } = dimsRef.current;
    const phase = phaseRef.current;
    const repelRadius = 40;
    const friction = 0.88;
    const springFactor = 0.08;
    const fontSize = 7;

    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${fontSize}px "Courier New", Courier, monospace`;
    ctx.textBaseline = "top";

    const glitch = glitchRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const row = Math.floor(i / numCols);

      // Determine if this particle is visible based on reveal progress
      if (phase === "scramble") {
        const revealedRows = Math.floor(revealProgressRef.current * rows);
        if (row > revealedRows + 12) continue; // not yet visible

        if (row > revealedRows) {
          // Scramble zone
          const intensity = 1 - (row - revealedRows) / 12;
          const randChar = ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)];
          ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${intensity * 0.6})`;
          ctx.fillText(randChar, p.baseX, p.baseY);
          continue;
        }
      }

      // Physics: repel from mouse
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < repelRadius && dist > 0) {
        const force = (repelRadius - dist) / repelRadius;
        const angle = Math.atan2(dy, dx);
        p.vx += Math.cos(angle) * force * 5;
        p.vy += Math.sin(angle) * force * 5;
      }

      // Spring back to origin
      p.vx += (p.baseX - p.x) * springFactor;
      p.vy += (p.baseY - p.y) * springFactor;

      // Friction
      p.vx *= friction;
      p.vy *= friction;

      p.x += p.vx;
      p.y += p.vy;

      // Draw
      if (glitch.active && glitch.lines.has(row)) {
        const gc = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        ctx.fillStyle = Math.random() > 0.5
          ? "rgba(255, 0, 80, 0.7)"
          : "rgba(0, 255, 200, 0.7)";
        ctx.fillText(gc, p.x + (Math.random() - 0.5) * 3, p.y);
      } else {
        ctx.fillStyle = `rgb(${p.r},${p.g},${p.b})`;
        ctx.fillText(p.char, p.x, p.y);
      }
    }

    // Progress the reveal
    if (phase === "scramble") {
      revealProgressRef.current += 0.03;
      if (revealProgressRef.current >= 1) {
        phaseRef.current = "revealed";
      }
    }

    animRef.current = requestAnimationFrame(animate);
  }, []);

  // Load image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      initParticles(img);
      phaseRef.current = "scramble";
      revealProgressRef.current = 0;

      // Start animation loop
      setTimeout(() => {
        animRef.current = requestAnimationFrame(animate);
      }, 300);
    };
    img.src = src;

    return () => cancelAnimationFrame(animRef.current);
  }, [src, initParticles, animate]);

  // Mouse tracking
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Periodic glitch bursts
  useEffect(() => {
    function doGlitch() {
      const lines = new Set<number>();
      const n = 2 + Math.floor(Math.random() * 5);
      for (let i = 0; i < n; i++) {
        lines.add(Math.floor(Math.random() * dimsRef.current.rows));
      }
      glitchRef.current = { active: true, lines };

      setTimeout(() => {
        glitchRef.current = { active: false, lines: new Set() };
      }, 80 + Math.random() * 60);
    }

    function scheduleNext() {
      const delay = 800 + Math.random() * 1500;
      return setTimeout(() => {
        doGlitch();
        timerRef = scheduleNext();
      }, delay);
    }

    let timerRef = scheduleNext();
    return () => clearTimeout(timerRef);
  }, []);

  return (
    <div className="ascii-wrap">
      <div className="ascii-scanline" />
      <canvas
        ref={canvasRef}
        className="ascii-img"
        style={{ cursor: "crosshair" }}
      />
    </div>
  );
}
