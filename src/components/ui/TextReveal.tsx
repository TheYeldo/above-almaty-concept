"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, type Ref, useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  as?: "div" | "h2" | "p" | "small";
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function TextReveal({ as = "div", children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(
      element,
      { yPercent: 24, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay]);

  if (as === "h2") return <h2 ref={ref as Ref<HTMLHeadingElement>} className={className}>{children}</h2>;
  if (as === "p") return <p ref={ref as Ref<HTMLParagraphElement>} className={className}>{children}</p>;
  if (as === "small") return <small ref={ref as Ref<HTMLElement>} className={className}>{children}</small>;
  return <div ref={ref as Ref<HTMLDivElement>} className={className}>{children}</div>;
}
