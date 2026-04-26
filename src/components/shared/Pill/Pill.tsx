import type { CSSProperties, ReactNode } from 'react';
import styles from './Pill.module.scss';

interface PillProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  style?: CSSProperties;
}

export function Pill({ children, onClick, active, style }: PillProps) {
  return (
    <button
      className={`${styles.pill} mono ${active ? styles.active : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
