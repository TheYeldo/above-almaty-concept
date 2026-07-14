import { HotelExperience } from "@/components/HotelExperience";

const hotelConceptSchema = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "The Ritz-Carlton, Almaty — Independent Concept",
  description:
    "An independent portfolio concept exploring a cinematic digital experience for a luxury hotel in Almaty.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Esentai Tower, 77/7 Al-Farabi Avenue",
    addressLocality: "Almaty",
    addressCountry: "KZ",
  },
  isAccessibleForFree: true,
};

export default function Home() {
  return (
    <>
      <HotelExperience />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelConceptSchema) }}
      />
    </>
  );
}
