import { BIO, LINKS } from '../../data/content';
import styles from './Contact.module.scss';

export function Contact() {
  return (
    <section id="contact" className={styles['contact']}>
      <div className={styles['contact__inner']}>
        <div className={`${styles['contact__label']} mono`}>06 · Say hi</div>

        <h2 className={`${styles['contact__heading']} display`}>
          Let's talk about<br />
          <em className="serif">teams, systems,</em> or<br />
          <span className={styles['contact__underline']}>something new</span>.
        </h2>

        <div className={styles['contact__links']}>
          {LINKS.map((l) => (
            <a key={l.label} href="#" className={styles['contact__link']}>
              <span className={`${styles['contact__link-label']} mono`}>{l.label}</span>
              <span className={styles['contact__link-value']}>{l.value} →</span>
            </a>
          ))}
        </div>

        <div className={`${styles['contact__footer']} mono`}>
          <span>© {BIO.name} · 2026</span>
          <span>made with care · no cookies · no scroll-jack</span>
        </div>
      </div>
    </section>
  );
}
