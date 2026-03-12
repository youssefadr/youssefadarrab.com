"use client";

import { useEffect, useState } from "react";

interface TerminalTextProps {
  lines: string[];
  className?: string;
  typingSpeed?: number;
  lineDelay?: number;
  startDelay?: number;
}

export default function TerminalText({
  lines,
  className = "",
  typingSpeed = 35,
  lineDelay = 400,
  startDelay = 600,
}: TerminalTextProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentLine >= lines.length) {
        setDone(true);
        return;
      }

      const line = lines[currentLine];

      if (currentChar < line.length) {
        setCurrentChar((c) => c + 1);
      } else {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }
    }, currentLine === 0 && currentChar === 0
      ? startDelay
      : currentChar >= lines[currentLine]?.length
        ? lineDelay
        : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentLine, currentChar, lines, typingSpeed, lineDelay, startDelay]);

  return (
    <div className={`terminal-text ${className}`}>
      {lines.map((line, i) => {
        if (i > currentLine) return null;
        const text = i === currentLine ? line.slice(0, currentChar) : line;
        const showCursor = !done && i === currentLine;
        return (
          <div key={i} className="terminal-line">
            <span className="terminal-prompt">&gt; </span>
            <span>{text}</span>
            {showCursor && <span className="terminal-cursor">▌</span>}
          </div>
        );
      })}
    </div>
  );
}
