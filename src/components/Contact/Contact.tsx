import { BIO, LINKS } from '../../data/content';
import styles from './Contact.module.scss';

export function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={`${styles.label} mono`}>06 · Say hi</div>

        <h2 className={`${styles.heading} display`}>
          Let's talk about<br />
          <em className="serif">teams, systems,</em> or<br />
          <span className={styles.underline}>something new</span>.
        </h2>

        <div className={styles.links}>
          {LINKS.map((l) => (
            <a key={l.label} href="#" className={styles.link}>
              <span className={`${styles.linkLabel} mono`}>{l.label}</span>
              <span className={styles.linkValue}>{l.value} →</span>
            </a>
          ))}
        </div>

        <div className={`${styles.footer} mono`}>
          <span>© {BIO.name} · 2026</span>
          <span>made with care · no cookies · no scroll-jack</span>
        </div>
      </div>
    </section>
  );
}
