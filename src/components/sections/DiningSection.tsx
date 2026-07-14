"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Copy } from "@/data/content";
import { TextReveal } from "@/components/ui/TextReveal";

const images = ["/images/dining/vista.webp", "/images/dining/skybar.webp", "/images/dining/seven.webp", "/images/dining/private.webp"];

export function DiningSection({ copy }: { copy: Copy }) {
  const [active, setActive] = useState(0);
  return (
    <section id="dining" className={`dining dining--${active + 1}`}>
      <div className="dining-heading"><TextReveal className="eyebrow">{copy.diningEyebrow}</TextReveal><TextReveal as="h2">{copy.diningTitle}</TextReveal></div>
      <div className="dining-visual" data-cursor="discover">
        <AnimatePresence mode="wait">
          <motion.div key={active} className="dining-image" initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.05 }} animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} exit={{ clipPath: "inset(100% 0 0 0)" }} transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}>
            <Image src={images[active]} alt={`${copy.dining[active][0]} concept placeholder`} fill sizes="(max-width: 760px) 100vw, 68vw" />
            <div className="dining-glint" />
          </motion.div>
        </AnimatePresence>
        <span className="dining-discover">{copy.discover}</span>
      </div>
      <div className="dining-list">
        {copy.dining.map((item, index) => (
          <button type="button" onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} className={active === index ? "is-active" : ""} key={item[0]}>
            <span>0{index + 1}</span><b>{item[0]}</b><em>{item[1]}</em><i>↗</i>
          </button>
        ))}
      </div>
    </section>
  );
}
