"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    let active = true;
    const timer = window.setInterval(() => {
      setProgress((value) => Math.min(value + Math.max(1, (88 - value) * 0.16), 88));
    }, 45);

    Promise.resolve(document.fonts?.ready)
      .then(() => new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))))
      .then(() => {
        if (!active) return;
        window.clearInterval(timer);
        setProgress(100);
        window.setTimeout(() => active && setVisible(false), 260);
      });

    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: "-3%" }}
          transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
          aria-label="Loading experience"
        >
          <div className="preloader__mountain" aria-hidden="true">
            <svg viewBox="0 0 800 180" role="presentation">
              <motion.path
                d="M0 162 L78 128 L139 144 L220 72 L274 112 L352 36 L409 96 L481 58 L552 122 L623 86 L690 136 L800 108"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: progress / 100 }}
                transition={{ ease: "easeOut", duration: 0.45 }}
              />
              <motion.path
                d="M0 162 H800"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: Math.max(0, (progress - 62) / 38) }}
              />
            </svg>
          </div>
          <div className="preloader__title">The Ritz-Carlton, Almaty</div>
          <div className="preloader__meta"><span>Above the city</span><span>{Math.round(progress)}%</span></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
