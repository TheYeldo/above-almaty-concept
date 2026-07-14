"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const element = cursor.current;
    if (!element) return;
    const move = (event: PointerEvent) => {
      element.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target as HTMLElement;
      element.classList.toggle("is-discover", Boolean(target.closest("[data-cursor='discover']")));
      element.classList.toggle("is-link", Boolean(target.closest("a,button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  return <div ref={cursor} className="custom-cursor" aria-hidden="true"><span>Discover</span></div>;
}
