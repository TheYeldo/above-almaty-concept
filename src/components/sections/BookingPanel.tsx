"use client";

import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useMemo, useState } from "react";
import type { Copy } from "@/data/content";

export function BookingPanel({ copy }: { copy: Copy }) {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);
  const [form, setForm] = useState({ arrival: "", departure: "", guests: "2", rooms: "1" });
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!form.arrival || !form.departure || form.departure <= form.arrival || Number(form.guests) < 1) {
      setError(copy.validation);
      setComplete(false);
      return;
    }
    setError("");
    setComplete(true);
  };

  return (
    <section id="contact" className="booking-section">
      <div className="night-scene" aria-hidden="true"><div className="night-mountains" /><div className="night-city" /><div className="night-tower">{Array.from({ length: 44 }).map((_, index) => <i key={index} />)}<span>ALMATY</span></div></div>
      <div className="booking-wrap">
        <span className="eyebrow">Esentai Tower · 43.22° N</span><h2>{copy.bookingTitle}</h2><p>{copy.bookingText}</p>
        <AnimatePresence mode="wait">
          {!complete ? (
            <motion.form key="form" onSubmit={submit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} noValidate>
              <label><span>{copy.arrival}</span><input type="date" min={today} value={form.arrival} onChange={(event) => setForm({ ...form, arrival: event.target.value })} aria-label={copy.arrival} /></label>
              <label><span>{copy.departure}</span><input type="date" min={form.arrival || today} value={form.departure} onChange={(event) => setForm({ ...form, departure: event.target.value })} aria-label={copy.departure} /></label>
              <label><span>{copy.guests}</span><select value={form.guests} onChange={(event) => setForm({ ...form, guests: event.target.value })} aria-label={copy.guests}>{[1, 2, 3, 4, 5, 6].map((value) => <option key={value}>{value}</option>)}</select></label>
              <label><span>{copy.rooms}</span><select value={form.rooms} onChange={(event) => setForm({ ...form, rooms: event.target.value })} aria-label={copy.rooms}>{[1, 2, 3].map((value) => <option key={value}>{value}</option>)}</select></label>
              <button type="submit">{copy.check}<span>↗</span></button>
              {error && <div className="form-error" role="alert">{error}</div>}
            </motion.form>
          ) : (
            <motion.div key="result" className="booking-result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span>✓</span><h3>{copy.available}</h3><p>{copy.availableText}</p><button type="button" onClick={() => setComplete(false)}>{copy.reset}</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
