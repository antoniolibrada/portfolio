import { PRINCIPLES } from '../../data/content';
import styles from './Principles.module.scss';

export function Principles() {
  return (
    <section id="principles" className={styles['principles']}>
      <div className={styles['principles__inner']}>
        <div className={`${styles['principles__label']} mono`}>04 · How I lead</div>
        <h2 className={`${styles['principles__heading']} display`}>
          Five <em className="serif">opinions</em> I hold loosely.
        </h2>
        <div className={styles['principles__grid']}>
          {PRINCIPLES.map((p) => (
            <div key={p.k} className={styles['principles__item']}>
              <div className={`${styles['principles__num']} mono`}>{p.k}</div>
              <h3 className={`${styles['principles__title']} display`}>{p.h}</h3>
              <p className={styles['principles__body']}>{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
