"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "light" | "line";
  className?: string;
  onClick?: () => void;
};

export function MagneticButton({ children, href, variant = "light", className = "", onClick }: Props) {
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.3 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 18, mass: 0.3 });

  const move = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * 0.08);
    y.set((event.clientY - rect.top - rect.height / 2) * 0.08);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };
  const classes = `magnetic-button magnetic-button--${variant} ${className}`;

  if (href) {
    return (
      <motion.a href={href} className={classes} style={{ x, y }} onMouseMove={move} onMouseLeave={reset}>
        <span>{children}</span><span aria-hidden="true">↗</span>
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} className={classes} style={{ x, y }} onMouseMove={move} onMouseLeave={reset}>
      <span>{children}</span><span aria-hidden="true">↗</span>
    </motion.button>
  );
}
