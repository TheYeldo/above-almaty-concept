import Image from "next/image";
import type { Copy } from "@/data/content";
import { TextReveal } from "@/components/ui/TextReveal";

export function WellnessSection({ copy }: { copy: Copy }) {
  return (
    <section id="wellness" className="wellness">
      <div className="wellness-image"><Image src="/images/wellness/pool.webp" alt="Stylised indoor pool concept placeholder" fill sizes="100vw" /><div className="water-caustics" /><div className="water-haze" /></div>
      <div className="wellness-copy"><TextReveal className="eyebrow">{copy.wellnessEyebrow}</TextReveal><TextReveal as="h2">{copy.wellnessTitle}</TextReveal><TextReveal as="p">{copy.wellnessText}</TextReveal></div>
      <div className="wellness-list">{copy.wellnessItems.map((item, index) => <span key={item}><i>0{index + 1}</i>{item}</span>)}</div>
    </section>
  );
}
