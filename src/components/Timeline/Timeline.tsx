import { TIMELINE } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import './Timeline.scss';

export function Timeline() {
  return (
    <section className="timeline">
      <div className="timeline__inner">
        <div className="timeline__label mono">
          <Dot color="var(--teal)" />
          02 · Trajectory
        </div>
        <div className="timeline__rows">
          {TIMELINE.map((t, i) => (
            <div key={i} className="timeline__row">
              <div className="timeline__year mono">{t.year}</div>
              <div>
                <div className="timeline__role display">{t.role}</div>
                <div className="timeline__note">{t.note}</div>
              </div>
              <div className="timeline__org mono">@ {t.org}</div>
            </div>
          ))}
          <div className="timeline__terminator" />
        </div>
      </div>
    </section>
  );
}
