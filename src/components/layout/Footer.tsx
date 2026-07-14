import type { Copy } from "@/data/content";

export function Footer({ copy }: { copy: Copy }) {
  return (
    <footer className="footer">
      <div className="footer__top">
        <div><span className="eyebrow">The Ritz-Carlton, Almaty</span><h2>Above the city.<br />Close to the mountains.</h2></div>
        <address>Esentai Tower<br />77/7 Al-Farabi Avenue<br />Almaty, Kazakhstan<br /><a href="tel:+77270000000">+7 727 000 00 00</a></address>
      </div>
      <div className="footer__links"><a href="#rooms">Rooms</a><a href="#dining">Dining</a><a href="#wellness">Wellness</a><a href="#almaty">Almaty</a><a href="#contact">Contact</a></div>
      <div className="footer__legal"><span>{copy.footerConcept}</span><div><a href="#contact">Instagram</a><a href="#contact">Privacy</a><a href="#contact">Accessibility</a><a href="#hotel">Language</a></div></div>
    </footer>
  );
}
