import { PROJECTS } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Projects.module.scss';

const HUES = [195, 155, 225, 175];

export function Projects() {
  return (
    <section id="work" className={styles.projects}>
      <div className={styles.inner}>
        <div className={`${styles.label} mono`}>
          <Dot color="var(--sky)" />
          03 · Selected nodes
        </div>

        <h2 className={`${styles.heading} display`}>
          What I've been <em className="serif">connecting</em>.
        </h2>

        <div className={styles.grid}>
          {PROJECTS.map((p, i) => {
            const hue = HUES[i % HUES.length];
            return (
              <article key={i} className={styles.card}>
                <div className={styles.cardHeader}>
                  <span
                    className={styles.nodeDot}
                    style={{
                      background: `oklch(0.6 0.14 ${hue})`,
                      boxShadow: `0 0 0 4px oklch(0.6 0.14 ${hue} / 0.18)`,
                    }}
                  />
                  <span
                    className={`${styles.cardTag} mono`}
                    style={{ color: `oklch(0.4 0.1 ${hue})` }}
                  >
                    node · {p.tag}
                  </span>
                  <span className={styles.dashedRule} />
                  <span className={`${styles.year} mono`}>{p.year}</span>
                </div>

                <h3 className={`${styles.title} display`}>{p.title}</h3>
                <p className={styles.blurb}>{p.blurb}</p>

                <div className={styles.cardFooter}>
                  <span
                    className={`${styles.metric} display`}
                    style={{ color: `oklch(0.45 0.12 ${hue})` }}
                  >
                    {p.metric}
                  </span>
                  <span className={`${styles.outcome} mono`}>→ outcome</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
