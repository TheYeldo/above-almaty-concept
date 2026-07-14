"use client";

import { useState } from "react";
import type { Copy } from "@/data/content";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export function SkyLobby({ copy }: { copy: Copy }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="lobby" className="sky-lobby">
      <div className="lobby-panorama" aria-hidden="true"><div className="lobby-mountains" /><div className="lobby-window-bars" /></div>
      <ImageReveal className="lobby-interior">
        <div className="lobby-ceiling" /><div className="lobby-sofa lobby-sofa--one" /><div className="lobby-sofa lobby-sofa--two" /><div className="lobby-table" /><div className="lobby-light" />
      </ImageReveal>
      <div className="lobby-copy">
        <TextReveal className="eyebrow">{copy.lobbyEyebrow}</TextReveal>
        <TextReveal as="h2">{copy.lobbyTitle}</TextReveal>
        <TextReveal as="p">{copy.lobbyText}</TextReveal>
        <TextReveal as="small">{copy.lobbyTea}</TextReveal>
      </div>
      <div className="hotspots">
        {copy.hotspots.map((hotspot, index) => (
          <button
            type="button"
            key={hotspot[0]}
            className={`hotspot hotspot--${index + 1} ${active === index ? "is-active" : ""}`}
            onMouseEnter={() => setActive(index)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(index)}
            onBlur={() => setActive(null)}
            aria-label={`${hotspot[0]}: ${hotspot[1]}`}
          >
            <i /><span><b>{hotspot[0]}</b><em>{hotspot[1]}</em></span>
          </button>
        ))}
      </div>
    </section>
  );
}
