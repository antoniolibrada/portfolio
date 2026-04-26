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
    <section className={styles.hero}>
      <ConstellationField />
      <Nav />

      <div className={styles.content}>
        <div className={styles.left}>
          <div className={`${styles.kicker} mono`}>
            <Dot color="var(--moss)" size={10} />
            online · available april→
          </div>

          <h1 className={`${styles.headline} display`}>
            Engineering<br />is a
            <span className={styles.spacer} />
            <em className={`serif ${styles.teamSport}`}>team sport</em>.<br />
            I help teams <span className={styles.connect}>connect</span>.
          </h1>

          <p className={styles.body}>
            {BIO.name}, engineering manager at Helio. {BIO.reports} direct reports across {BIO.teams} platform squads.
            Below: recent work, how I lead, and a few ways to say hello.
          </p>

          <div className={styles.pills}>
            <Pill style={{ background: 'var(--ink)', color: 'var(--paper)', borderColor: 'var(--ink)' }}>
              recent work ↓
            </Pill>
            <Pill>download résumé</Pill>
            <Pill>{BIO.email}</Pill>
          </div>
        </div>

        <div className={styles.portraitWrap}>
          <Portrait size={320} tone="sky" shape="blob" />
          <div className={`${styles.badge} mono`}>
            <Dot color="oklch(0.65 0.2 145)" />
            reply ≤ 24h
          </div>
        </div>
      </div>

      <div className={styles.statsStrip}>
        {STATS.map(([k, v], i) => (
          <div key={i} className={styles.stat} style={{ borderLeft: i ? '1px dashed var(--rule)' : 'none' }}>
            <div className={`${styles.statKey} mono`}>{k}</div>
            <div className={`${styles.statVal} display`}>{v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
