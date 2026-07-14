"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { content } from "@/data/content";
import type { Language } from "@/data/rooms";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { Preloader } from "@/components/layout/Preloader";
import { Header } from "@/components/layout/Header";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Footer } from "@/components/layout/Footer";
import { TowerJourney } from "@/components/sections/TowerJourney";
import { SkyLobby } from "@/components/sections/SkyLobby";
import { RoomsSection } from "@/components/sections/RoomsSection";
import { AlmatySection } from "@/components/sections/AlmatySection";

const DiningSection = dynamic(() => import("@/components/sections/DiningSection").then((mod) => mod.DiningSection));
const WellnessSection = dynamic(() => import("@/components/sections/WellnessSection").then((mod) => mod.WellnessSection));
const ClubSection = dynamic(() => import("@/components/sections/ClubSection").then((mod) => mod.ClubSection));
const BookingPanel = dynamic(() => import("@/components/sections/BookingPanel").then((mod) => mod.BookingPanel));

export function HotelExperience() {
  const [language, setLanguage] = useState<Language>("en");
  const copy = content[language];

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <Header copy={copy} language={language} onLanguage={setLanguage} />
      <main>
        <TowerJourney copy={copy} />
        <SkyLobby copy={copy} />
        <RoomsSection copy={copy} language={language} />
        <AlmatySection copy={copy} />
        <DiningSection copy={copy} />
        <WellnessSection copy={copy} />
        <ClubSection copy={copy} />
        <BookingPanel copy={copy} />
      </main>
      <Footer copy={copy} />
    </SmoothScrollProvider>
  );
}
