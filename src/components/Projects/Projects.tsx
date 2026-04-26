import { PROJECTS } from '../../data/content';
import { Dot } from '../shared/Dot/Dot';
import './Projects.scss';

const HUES = [195, 155, 225, 175];

export function Projects() {
  return (
    <section id="work" className="projects">
      <div className="projects__inner">
        <div className="projects__label mono">
          <Dot color="var(--sky)" />
          03 · Selected nodes
        </div>

        <h2 className="projects__heading display">
          What I've been <em className="serif">connecting</em>.
        </h2>

        <div className="projects__grid">
          {PROJECTS.map((p, i) => {
            const hue = HUES[i % HUES.length];
            return (
              <article key={i} className="projects__card">
                <div className="projects__card-header">
                  <span
                    className="projects__node-dot"
                    style={{
                      background: `oklch(0.6 0.14 ${hue})`,
                      boxShadow: `0 0 0 4px oklch(0.6 0.14 ${hue} / 0.18)`,
                    }}
                  />
                  <span
                    className="projects__card-tag mono"
                    style={{ color: `oklch(0.4 0.1 ${hue})` }}
                  >
                    node · {p.tag}
                  </span>
                  <span className="projects__dashed-rule" />
                  <span className="projects__year mono">{p.year}</span>
                </div>

                <h3 className="projects__title display">{p.title}</h3>
                <p className="projects__blurb">{p.blurb}</p>

                <div className="projects__card-footer">
                  <span
                    className="projects__metric display"
                    style={{ color: `oklch(0.45 0.12 ${hue})` }}
                  >
                    {p.metric}
                  </span>
                  <span className="projects__outcome mono">→ outcome</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
