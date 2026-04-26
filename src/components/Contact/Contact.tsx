import { BIO, LINKS } from '../../data/content';
import './Contact.scss';

export function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="contact__inner">
        <div className="contact__label mono">06 · Say hi</div>

        <h2 className="contact__heading display">
          Let's talk about<br />
          <em className="serif">teams, systems,</em> or<br />
          <span className="contact__underline">something new</span>.
        </h2>

        <div className="contact__links">
          {LINKS.map((l) => (
            <a key={l.label} href="#" className="contact__link">
              <span className="contact__link-label mono">{l.label}</span>
              <span className="contact__link-value">{l.value} →</span>
            </a>
          ))}
        </div>

        <div className="contact__footer mono">
          <span>© {BIO.name} · 2026</span>
          <span>made with care · no cookies · no scroll-jack</span>
        </div>
      </div>
    </section>
  );
}
