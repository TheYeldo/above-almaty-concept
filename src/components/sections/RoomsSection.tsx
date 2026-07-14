"use client";

import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import type { Copy } from "@/data/content";
import { rooms, type Language, type Room } from "@/data/rooms";

gsap.registerPlugin(ScrollTrigger);

export function RoomCard({ room, language, copy, index, active }: { room: Room; language: Language; copy: Copy; index: number; active: boolean }) {
  return (
    <article className={`room-card room-card--${index + 1} ${active ? "is-active" : ""}`} style={{ "--room-tone": room.tone } as React.CSSProperties}>
      <div className="room-card__image">
        <Image src={room.image} alt={`${room.name[language]} concept placeholder interior`} fill sizes="(max-width: 760px) 82vw, 50vw" />
        <span>0{index + 1}</span>
      </div>
      <div className="room-card__content">
        <div><span>{room.area}</span><span>{copy.guests} · {room.guests}</span></div>
        <h3>{room.name[language]}</h3><p>{room.description[language]}</p>
        <div className="room-card__actions"><a href="#contact">{copy.viewRoom}</a><a href="#contact">{copy.reserve}</a></div>
      </div>
    </article>
  );
}

export function RoomsSection({ copy, language }: { copy: Copy; language: Language }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = section.current;
    const row = track.current;
    if (!root || !row || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const context = gsap.context(() => {
      const tween = gsap.to(row, {
        x: () => -(row.scrollWidth - window.innerWidth + Math.min(96, window.innerWidth * 0.08)),
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => setActive(Math.min(rooms.length - 1, Math.round(self.progress * (rooms.length - 1)))),
        },
      });
      return () => tween.kill();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section ref={section} id="rooms" className="rooms-section">
      <div className="rooms-sticky">
        <div className="rooms-heading"><span className="eyebrow">{copy.roomsEyebrow}</span><h2>{copy.roomsTitle}</h2><div className="rooms-index"><b>0{active + 1}</b><span>/ 0{rooms.length}</span></div></div>
        <div ref={track} className="rooms-track">{rooms.map((room, index) => <RoomCard room={room} language={language} copy={copy} index={index} active={active === index} key={room.id} />)}</div>
      </div>
    </section>
  );
}
