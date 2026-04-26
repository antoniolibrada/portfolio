import { useId } from 'react';
import type { CSSProperties } from 'react';
import portraitSrc from '../../../assets/portrait.png';
import './Portrait.scss';

type Tone = 'teal' | 'moss' | 'sky' | 'ink';
type Shape = 'blob' | 'square' | 'arch';

interface PortraitProps {
  size?: number;
  tone?: Tone;
  shape?: Shape;
  shadow?: boolean;
  style?: CSSProperties;
}

const TONE_COLORS: Record<Tone, string> = {
  moss: 'oklch(0.64 0.13 155)',
  sky: 'oklch(0.74 0.09 225)',
  ink: 'oklch(0.3 0.05 215)',
  teal: 'oklch(0.58 0.12 195)',
};

export function Portrait({ size = 280, tone = 'teal', shape = 'blob', shadow = true, style }: PortraitProps) {
  const id = useId().replace(/:/g, '');
  const color = TONE_COLORS[tone];
  const w = size;
  const h = Math.round(size * 1.2);

  const bgShape = shape === 'square' ? (
    <rect x="0" y="0" width={w} height={h} fill={color} />
  ) : shape === 'arch' ? (
    <path d={`M 0 ${h} L 0 ${w / 2} A ${w / 2} ${w / 2} 0 0 1 ${w} ${w / 2} L ${w} ${h} Z`} fill={color} />
  ) : (
    <path
      d={`M ${w * 0.5} 0
          C ${w * 0.85} 0 ${w} ${h * 0.18} ${w} ${h * 0.45}
          C ${w} ${h * 0.72} ${w * 0.88} ${h * 0.92} ${w * 0.62} ${h * 0.98}
          C ${w * 0.32} ${h * 1.02} ${w * 0.05} ${h * 0.85} ${w * 0.02} ${h * 0.55}
          C ${w * 0.0}  ${h * 0.22} ${w * 0.2}  0 ${w * 0.5} 0 Z`}
      fill={color}
    />
  );

  return (
    <div className="portrait" style={{ width: w, height: h, ...style }}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="portrait__svg">
        <defs>
          <pattern id={`stripe${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
            <line x1="0" y1="0" x2="0" y2="6" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
          </pattern>
        </defs>
        {bgShape}
        <g opacity="0.6">
          {shape === 'square' && <rect x="0" y="0" width={w} height={h} fill={`url(#stripe${id})`} />}
          {shape === 'arch' && (
            <path d={`M 0 ${h} L 0 ${w / 2} A ${w / 2} ${w / 2} 0 0 1 ${w} ${w / 2} L ${w} ${h} Z`} fill={`url(#stripe${id})`} />
          )}
          {shape === 'blob' && (
            <path
              d={`M ${w * 0.5} 0
                  C ${w * 0.85} 0 ${w} ${h * 0.18} ${w} ${h * 0.45}
                  C ${w} ${h * 0.72} ${w * 0.88} ${h * 0.92} ${w * 0.62} ${h * 0.98}
                  C ${w * 0.32} ${h * 1.02} ${w * 0.05} ${h * 0.85} ${w * 0.02} ${h * 0.55}
                  C ${w * 0.0}  ${h * 0.22} ${w * 0.2}  0 ${w * 0.5} 0 Z`}
              fill={`url(#stripe${id})`}
            />
          )}
        </g>
      </svg>
      <img
        src={portraitSrc}
        alt="Portrait"
        className="portrait__img"
        style={{ filter: shadow ? 'drop-shadow(0 14px 20px rgba(20,40,50,0.25))' : 'none' }}
      />
    </div>
  );
}
