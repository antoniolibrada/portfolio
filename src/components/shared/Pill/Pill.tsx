import type { CSSProperties, ReactNode } from 'react';
import './Pill.scss';

interface PillProps {
  children: ReactNode;
  onClick?: () => void;
  active?: boolean;
  style?: CSSProperties;
}

export function Pill({ children, onClick, active, style }: PillProps) {
  return (
    <button
      className={`pill mono${active ? ' pill--active' : ''}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </button>
  );
}
