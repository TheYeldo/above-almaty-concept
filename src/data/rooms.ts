export type Language = "en" | "ru";

export type Room = {
  id: string;
  name: Record<Language, string>;
  area: string;
  guests: string;
  image: string;
  tone: string;
  description: Record<Language, string>;
};

export const rooms: Room[] = [
  {
    id: "mountain",
    name: { en: "Deluxe Mountain View", ru: "Deluxe с видом на горы" },
    area: "40–46 m²",
    guests: "2 + 1",
    image: "/images/rooms/mountain.webp",
    tone: "#8c8d86",
    description: {
      en: "Morning light, restrained stone and an uninterrupted line to the peaks.",
      ru: "Утренний свет, спокойный камень и непрерывная линия к горным вершинам.",
    },
  },
  {
    id: "city",
    name: { en: "Deluxe City View", ru: "Deluxe с видом на город" },
    area: "42–48 m²",
    guests: "2 + 1",
    image: "/images/rooms/city.webp",
    tone: "#6f7778",
    description: {
      en: "A composed city retreat with Almaty unfolding far below.",
      ru: "Сдержанное городское пространство с панорамой Алматы далеко внизу.",
    },
  },
  {
    id: "club",
    name: { en: "Club Room", ru: "Club Room" },
    area: "46–52 m²",
    guests: "2",
    image: "/images/rooms/club.webp",
    tone: "#806f5f",
    description: {
      en: "Private Club access and a quieter, more personal cadence of service.",
      ru: "Доступ в Club Lounge и более камерный, персональный ритм сервиса.",
    },
  },
  {
    id: "executive",
    name: { en: "Executive Suite", ru: "Executive Suite" },
    area: "82–94 m²",
    guests: "3",
    image: "/images/rooms/executive.webp",
    tone: "#75695e",
    description: {
      en: "Separate living and sleeping spaces framed by two distinct horizons.",
      ru: "Отдельные гостиная и спальня, раскрытые к двум разным горизонтам.",
    },
  },
  {
    id: "grand",
    name: { en: "Grand Suite", ru: "Grand Suite" },
    area: "115–130 m²",
    guests: "4",
    image: "/images/rooms/grand.webp",
    tone: "#574b42",
    description: {
      en: "A generous residential plan for long evenings above the city.",
      ru: "Просторная резиденциальная планировка для долгих вечеров над городом.",
    },
  },
];
