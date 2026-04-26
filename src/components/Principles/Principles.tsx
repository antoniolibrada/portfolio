import { PRINCIPLES } from '../../data/content';
import './Principles.scss';

export function Principles() {
  return (
    <section id="principles" className="principles">
      <div className="principles__inner">
        <div className="principles__label mono">04 · How I lead</div>
        <h2 className="principles__heading display">
          Five <em className="serif">opinions</em> I hold loosely.
        </h2>
        <div className="principles__grid">
          {PRINCIPLES.map((p) => (
            <div key={p.k} className="principles__item">
              <div className="principles__num mono">{p.k}</div>
              <h3 className="principles__title display">{p.h}</h3>
              <p className="principles__body">{p.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
