"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Copy } from "@/data/content";
import type { Language } from "@/data/rooms";

const links = ["hotel", "rooms", "dining", "wellness", "almaty", "contact"];

export function LanguageSwitcher({ language, onChange }: { language: Language; onChange: (lang: Language) => void }) {
  return (
    <div className="language" aria-label="Language selector">
      {(["en", "ru"] as const).map((lang) => (
        <button
          type="button"
          key={lang}
          className={language === lang ? "is-active" : ""}
          aria-pressed={language === lang}
          onClick={() => onChange(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function MobileMenu({ copy, open, onClose }: { copy: Copy; open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="mobile-menu" initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}>
          <nav aria-label="Mobile navigation">
            {links.map((link, index) => (
              <a href={`#${link}`} key={link} onClick={onClose}><span>0{index + 1}</span>{copy.nav[index]}</a>
            ))}
          </nav>
          <p>Esentai Tower · Almaty</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Header({ copy, language, onLanguage }: { copy: Copy; language: Language; onLanguage: (lang: Language) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#hotel" aria-label="Return to top"><span>THE RITZ-CARLTON</span><small>ALMATY · CONCEPT</small></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link, index) => <a href={`#${link}`} key={link}>{copy.nav[index]}</a>)}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher language={language} onChange={onLanguage} />
          <a className="header-reserve" href="#contact">{copy.reserve}</a>
          <button type="button" className="menu-toggle" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Toggle menu"><span /><span /></button>
        </div>
      </header>
      <MobileMenu copy={copy} open={open} onClose={() => setOpen(false)} />
    </>
  );
}
