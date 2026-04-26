import { STACK } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import './Stack.scss';

export function Stack() {
  return (
    <section className="stack">
      <div className="stack__inner">
        <div className="stack__label mono">
          <Dot color="var(--moss)" />
          05 · Tools of the trade
        </div>
        <div className="stack__grid">
          {STACK.map((s) => (
            <div key={s.g}>
              <div className="stack__group-name display">{s.g}</div>
              <ul className="stack__list">
                {s.items.map((it) => (
                  <li key={it} className="stack__item">{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
