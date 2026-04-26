import { useId } from 'react';
import type { CSSProperties } from 'react';
import styles from './Placeholder.module.scss';

type Tone = 'teal' | 'moss' | 'sky';

interface PlaceholderProps {
  label?: string;
  w?: string | number;
  h?: number;
  tone?: Tone;
  style?: CSSProperties;
}

const TONE_FILLS: Record<Tone, string> = {
  moss: 'oklch(0.64 0.13 155)',
  sky: 'oklch(0.74 0.09 225)',
  teal: 'oklch(0.58 0.12 195)',
};

export function Placeholder({ label = 'CASE STUDY', w = '100%', h = 160, tone = 'teal', style }: PlaceholderProps) {
  const id = useId().replace(/:/g, '');
  const fill = TONE_FILLS[tone];

  return (
    <div className={styles['placeholder']} style={{ width: w, height: h, ...style }}>
      <svg width="100%" height="100%" viewBox="0 0 200 100" preserveAspectRatio="none">
        <defs>
          <pattern id={`p${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="6" stroke={fill} strokeOpacity="0.25" strokeWidth="1.2" />
          </pattern>
        </defs>
        <rect width="200" height="100" fill={`url(#p${id})`} />
      </svg>
      <div className={`${styles['placeholder__label']} mono`} style={{ color: fill }}>
        {label}
      </div>
    </div>
  );
}
