import { PRINCIPLES } from '../../data/content';
import styles from './Principles.module.scss';

export function Principles() {
  return (
    <section id="principles" className={styles.principles}>
      <div className={styles.inner}>
        <div className={`${styles.label} mono`}>04 · How I lead</div>
        <h2 className={`${styles.heading} display`}>
          Five <em className="serif">opinions</em> I hold loosely.
        </h2>
        <div className={styles.grid}>
          {PRINCIPLES.map((p) => (
            <div key={p.k} className={styles.item}>
              <div className={`${styles.num} mono`}>{p.k}</div>
              <h3 className={`${styles.title} display`}>{p.h}</h3>
              <p className={styles.body}>{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
