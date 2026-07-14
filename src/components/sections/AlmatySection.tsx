"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export function AlmatySection({ copy }: { copy: Copy }) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!section.current) return;
    const trigger = ScrollTrigger.create({ trigger: section.current, start: "top bottom", end: "bottom top", scrub: true, onUpdate: (self) => setProgress(self.progress) });
    return () => trigger.kill();
  }, []);

  const sunX = 10 + progress * 68;
  const sunY = 68 - Math.sin(progress * Math.PI) * 42;
  return (
    <section id="almaty" ref={section} className="almaty-section" style={{ "--day": progress, "--sun-x": `${sunX}%`, "--sun-y": `${sunY}%` } as React.CSSProperties}>
      <div className="almaty-sky"><div className="almaty-sun" /><div className="almaty-ridge ridge-back" /><div className="almaty-ridge ridge-front" /><div className="almaty-city" /></div>
      <div className="almaty-copy"><span className="eyebrow">43.2389° N · 76.8897° E</span><h2>{copy.almatyTitle}</h2><p>{copy.almatyText[0]}<br />{copy.almatyText[1]}</p></div>
      <div className="directions">{copy.directions.map((direction, index) => <span key={direction}><i>0{index + 1}</i>{direction}</span>)}</div>
    </section>
  );
}
