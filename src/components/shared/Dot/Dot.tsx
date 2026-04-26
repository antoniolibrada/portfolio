import styles from './Dot.module.scss';

interface DotProps {
  color?: string;
  size?: number;
}

export function Dot({ color = 'var(--teal)', size = 8 }: DotProps) {
  return (
    <span
      className={styles['dot']}
      style={{ background: color, width: size, height: size }}
    />
  );
}
