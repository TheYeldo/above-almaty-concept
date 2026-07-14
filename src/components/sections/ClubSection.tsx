"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import type { Copy } from "@/data/content";
import { TextReveal } from "@/components/ui/TextReveal";

gsap.registerPlugin(ScrollTrigger);

export function ClubSection({ copy }: { copy: Copy }) {
  const section = useRef<HTMLElement>(null);
  const numeral = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!section.current || !numeral.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(numeral.current, { yPercent: 16 }, { yPercent: -14, ease: "none", scrollTrigger: { trigger: section.current, start: "top bottom", end: "bottom top", scrub: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  return (
    <section ref={section} className="club-section">
      <div ref={numeral} className="club-numeral" aria-hidden="true">26</div>
      <div className="club-copy"><TextReveal className="eyebrow">{copy.clubEyebrow}</TextReveal><TextReveal as="h2">{copy.clubTitle}</TextReveal><TextReveal as="p">{copy.clubText}</TextReveal></div>
      <div className="club-features">{copy.clubFeatures.map((feature, index) => <span key={feature}><i>0{index + 1}</i>{feature}</span>)}</div>
      <div className="club-lamp" aria-hidden="true" /><div className="club-table" aria-hidden="true" />
    </section>
  );
}
