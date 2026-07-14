"use client";

import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useWebGL } from "@/hooks/useWebGL";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { FloorProgress } from "@/components/three/FloorProgress";
import { ReducedMotionFallback } from "@/components/three/ReducedMotionFallback";

gsap.registerPlugin(ScrollTrigger);

const SceneCanvas = dynamic(() => import("@/components/three/SceneCanvas"), { ssr: false, loading: () => <ReducedMotionFallback /> });

function rangeOpacity(progress: number, start: number, hold: number, end: number) {
  if (progress <= start || progress >= end) return 0;
  if (progress < hold) return (progress - start) / Math.max(0.001, hold - start);
  return 1 - (progress - hold) / Math.max(0.001, end - hold);
}

export function ScrollChapter({ number, title, text, opacity }: { number: string; title: string; text: string; opacity: number }) {
  return (
    <article className="scroll-chapter" style={{ opacity, transform: `translateY(${(1 - opacity) * 28}px)` }}>
      <span>{number}</span><h2>{title}</h2><p>{text}</p>
    </article>
  );
}

export function TowerJourney({ copy }: { copy: Copy }) {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [sceneActive, setSceneActive] = useState(true);
  const reducedMotion = usePrefersReducedMotion();
  const webgl = useWebGL();

  useEffect(() => {
    if (!section.current || reducedMotion) {
      setProgress(reducedMotion ? 0.72 : 0);
      return;
    }
    const trigger = ScrollTrigger.create({
      trigger: section.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setProgress(self.progress),
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  useEffect(() => {
    const element = section.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setSceneActive(entry.isIntersecting), { rootMargin: "15% 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const heroOpacity = progress < 0.12 ? 1 - progress / 0.12 : 0;
  const portalOpacity = Math.max(0, (progress - 0.84) / 0.13);
  const ascentIndex = progress < 0.67 ? 0 : progress < 0.76 ? 1 : 2;

  return (
    <section ref={section} id="hotel" className={`tower-journey ${reducedMotion ? "is-reduced" : ""}`}>
      <div className="journey-stage">
        <div className="scene-layer">{webgl ? <SceneCanvas progress={progress} reducedMotion={reducedMotion} active={sceneActive} /> : <ReducedMotionFallback />}</div>
        <div className="grain" aria-hidden="true" />
        <div className="hero-content" style={{ opacity: heroOpacity, transform: `translateY(${-progress * 90}px)` }}>
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1><span>{copy.heroTitle[0]}</span><span>{copy.heroTitle[1]}</span></h1>
          <div className="hero-content__lower"><p>{copy.heroLine}</p><div><MagneticButton href="#lobby">{copy.explore}</MagneticButton><MagneticButton href="#contact" variant="line">{copy.reserveStay}</MagneticButton></div></div>
        </div>
        <div className="scroll-indicator" style={{ opacity: heroOpacity }}><span>{copy.scroll}</span><i /></div>
        <div className="chapter-stack">
          {copy.chapters.map((chapter, index) => {
            const starts = [0.12, 0.26, 0.4];
            return <ScrollChapter key={chapter[0]} number={chapter[0]} title={chapter[1]} text={chapter[2]} opacity={rangeOpacity(progress, starts[index], starts[index] + 0.045, starts[index] + 0.16)} />;
          })}
        </div>
        <div className="ascent-copy" style={{ opacity: rangeOpacity(progress, 0.54, 0.59, 0.84) }}>
          <span className="eyebrow">0{ascentIndex + 1} · ASCENT</span><h2>{copy.ascent[ascentIndex][0]}</h2><p>{copy.ascent[ascentIndex][1]}</p>
        </div>
        {progress > 0.5 && <FloorProgress progress={progress} />}
        <div className="portal-transition" style={{ opacity: portalOpacity }}><div className="portal-window"><span>30</span></div><p>SKY LOBBY · {copy.lobbyTitle}</p></div>
      </div>
    </section>
  );
}
