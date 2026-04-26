import { STACK } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Stack.module.scss';

export function Stack() {
  return (
    <section className={styles.stack}>
      <div className={styles.inner}>
        <div className={`${styles.label} mono`}>
          <Dot color="var(--moss)" />
          05 · Tools of the trade
        </div>
        <div className={styles.grid}>
          {STACK.map((s) => (
            <div key={s.g}>
              <div className={`${styles.groupName} display`}>{s.g}</div>
              <ul className={styles.list}>
                {s.items.map((it) => (
                  <li key={it} className={styles.item}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
