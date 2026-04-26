import { PROJECTS } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Projects.module.scss';

const HUES = [195, 155, 225, 175];

export function Projects() {
  return (
    <section id="work" className={styles['projects']}>
      <div className={styles['projects__inner']}>
        <div className={`${styles['projects__label']} mono`}>
          <Dot color="var(--sky)" />
          03 · Selected nodes
        </div>

        <h2 className={`${styles['projects__heading']} display`}>
          What I've been <em className="serif">connecting</em>.
        </h2>

        <div className={styles['projects__grid']}>
          {PROJECTS.map((p, i) => {
            const hue = HUES[i % HUES.length];
            return (
              <article key={i} className={styles['projects__card']}>
                <div className={styles['projects__card-header']}>
                  <span
                    className={styles['projects__node-dot']}
                    style={{
                      background: `oklch(0.6 0.14 ${hue})`,
                      boxShadow: `0 0 0 4px oklch(0.6 0.14 ${hue} / 0.18)`,
                    }}
                  />
                  <span
                    className={`${styles['projects__card-tag']} mono`}
                    style={{ color: `oklch(0.4 0.1 ${hue})` }}
                  >
                    node · {p.tag}
                  </span>
                  <span className={styles['projects__dashed-rule']} />
                  <span className={`${styles['projects__year']} mono`}>{p.year}</span>
                </div>

                <h3 className={`${styles['projects__title']} display`}>{p.title}</h3>
                <p className={styles['projects__blurb']}>{p.blurb}</p>

                <div className={styles['projects__card-footer']}>
                  <span
                    className={`${styles['projects__metric']} display`}
                    style={{ color: `oklch(0.45 0.12 ${hue})` }}
                  >
                    {p.metric}
                  </span>
                  <span className={`${styles['projects__outcome']} mono`}>→ outcome</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
