import { TIMELINE } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Timeline.module.scss';

export function Timeline() {
  return (
    <section className={styles['timeline']}>
      <div className={styles['timeline__inner']}>
        <div className={`${styles['timeline__label']} mono`}>
          <Dot color="var(--teal)" />
          02 · Trajectory
        </div>
        <div className={styles['timeline__rows']}>
          {TIMELINE.map((t, i) => (
            <div key={i} className={styles['timeline__row']}>
              <div className={`${styles['timeline__year']} mono`}>{t.year}</div>
              <div>
                <div className={`${styles['timeline__role']} display`}>{t.role}</div>
                <div className={styles['timeline__note']}>{t.note}</div>
              </div>
              <div className={`${styles['timeline__org']} mono`}>@ {t.org}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
