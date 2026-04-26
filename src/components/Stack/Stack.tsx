import { STACK } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import styles from './Stack.module.scss';

export function Stack() {
  return (
    <section className={styles['stack']}>
      <div className={styles['stack__inner']}>
        <div className={`${styles['stack__label']} mono`}>
          <Dot color="var(--moss)" />
          05 · Tools of the trade
        </div>
        <div className={styles['stack__grid']}>
          {STACK.map((s) => (
            <div key={s.g}>
              <div className={`${styles['stack__group-name']} display`}>{s.g}</div>
              <ul className={styles['stack__list']}>
                {s.items.map((it) => (
                  <li key={it} className={styles['stack__item']}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
