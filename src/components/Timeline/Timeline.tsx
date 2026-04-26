import { TIMELINE } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Timeline.module.scss';

export function Timeline() {
  return (
    <section className={styles.timeline}>
      <div className={styles.inner}>
        <div className={`${styles.label} mono`}>
          <Dot color="var(--teal)" />
          02 · Trajectory
        </div>
        <div className={styles.rows}>
          {TIMELINE.map((t, i) => (
            <div key={i} className={styles.row}>
              <div className={`${styles.year} mono`}>{t.year}</div>
              <div>
                <div className={`${styles.role} display`}>{t.role}</div>
                <div className={styles.note}>{t.note}</div>
              </div>
              <div className={`${styles.org} mono`}>@ {t.org}</div>
            </div>
          ))}
          <div className={styles.terminator} />
        </div>
      </div>
    </section>
  );
}
