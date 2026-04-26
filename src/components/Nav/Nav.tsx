import { BIO } from '../../data/content';
import styles from './Nav.module.scss';

export function Nav() {
  return (
    <nav className={`${styles.nav} mono`}>
      <div className={styles.brand}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="4" cy="4" r="2" fill="var(--moss)" />
          <circle cx="12" cy="7" r="2" fill="var(--teal)" />
          <circle cx="6" cy="12" r="2" fill="var(--sky)" />
          <line x1="4" y1="4" x2="12" y2="7" stroke="var(--teal)" strokeWidth="0.8" />
          <line x1="12" y1="7" x2="6" y2="12" stroke="var(--teal)" strokeWidth="0.8" />
          <line x1="4" y1="4" x2="6" y2="12" stroke="var(--teal)" strokeWidth="0.8" />
        </svg>
        <span className={styles.name}>{BIO.name}</span>
        <span className={styles.role}>/ {BIO.role.toLowerCase()}</span>
      </div>

      <div className={styles.links}>
        <a href="#work">work</a>
        <a href="#about">about</a>
        <a href="#principles">principles</a>
        <a href="#contact">contact</a>
      </div>

      <div className={styles.meta}>open to advise · {BIO.location}</div>
    </nav>
  );
}
