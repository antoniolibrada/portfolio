import { useState } from 'react';
import { BIO } from '../../data/content';
import styles from './Nav.module.scss';

export function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`${styles['nav']} mono`}>
      <div className={styles['nav__brand']}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="4" cy="4" r="2" fill="var(--moss)" />
          <circle cx="12" cy="7" r="2" fill="var(--teal)" />
          <circle cx="6" cy="12" r="2" fill="var(--sky)" />
          <line x1="4" y1="4" x2="12" y2="7" stroke="var(--teal)" strokeWidth="0.8" />
          <line x1="12" y1="7" x2="6" y2="12" stroke="var(--teal)" strokeWidth="0.8" />
          <line x1="4" y1="4" x2="6" y2="12" stroke="var(--teal)" strokeWidth="0.8" />
        </svg>
        <span className={styles['nav__name']}>{BIO.name}</span>
        <span className={styles['nav__role']}>/ {BIO.role.toLowerCase()}</span>
      </div>

      <div className={`${styles['nav__links']} ${menuOpen ? styles['nav__links--open'] : ''}`}>
        <a href="#work" onClick={() => setMenuOpen(false)}>work</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>about</a>
        <a href="#principles" onClick={() => setMenuOpen(false)}>principles</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>contact</a>
      </div>

      <div className={styles['nav__meta']}>open to advise · {BIO.location}</div>

      <button
        className={styles['nav__hamburger']}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? '✕' : '☰'}
      </button>
    </nav>
  );
}
