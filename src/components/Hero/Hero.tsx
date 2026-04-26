import { ConstellationField } from '../ConstellationField/ConstellationField';
import { Nav } from '../Nav/Nav';
import { Dot } from '../shared/Dot/Dot';
import { Pill } from '../shared/Pill/Pill';
import { Portrait } from '../shared/Portrait/Portrait';
import { BIO } from '../../data/content';
import styles from './Hero.module.scss';

const STATS = [
  ['∙ yrs shipping', BIO.years],
  ['∙ reports', BIO.reports],
  ['∙ squads', BIO.teams],
  ['∙ attrition \'24', '3.6%'],
] as const;

export function Hero() {
  return (
    <section className={styles['hero']}>
      <ConstellationField />
      <Nav />

      <div className={styles['hero__content']}>
        <div className={styles['hero__left']}>
          <div className={`${styles['hero__kicker']} mono`}>
            <Dot color="var(--moss)" size={10} />
            online · available april→
          </div>

          <h1 className={`${styles['hero__headline']} display`}>
            Engineering<br />is a
            <span className={styles['hero__spacer']} />
            <em className={`serif ${styles['hero__team-sport']}`}>team sport</em>.<br />
            I help teams <span className={styles['hero__connect']}>connect</span>.
          </h1>

          <p className={styles['hero__body']}>
            {BIO.name}, engineering manager at Helio. {BIO.reports} direct reports across {BIO.teams} platform squads.
            Below: recent work, how I lead, and a few ways to say hello.
          </p>

          <div className={styles['hero__pills']}>
            <Pill style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
              recent work ↓
            </Pill>
            <Pill>download résumé</Pill>
            <Pill>{BIO.email}</Pill>
          </div>
        </div>

        <div className={styles['hero__portrait-wrap']}>
          <Portrait size={320} tone="sky" shape="blob" />
          <div className={`${styles['hero__badge']} mono`}>
            <Dot color="oklch(0.65 0.2 145)" />
            reply ≤ 24h
          </div>
        </div>
      </div>

      <div className={styles['hero__stats-strip']}>
        {STATS.map(([k, v], i) => (
          <div key={i} className={styles['hero__stat']} style={{ borderLeft: i ? '1px dashed var(--rule)' : 'none' }}>
            <div className={`${styles['hero__stat-key']} mono`}>{k}</div>
            <div className={`${styles['hero__stat-val']} display`}>{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
