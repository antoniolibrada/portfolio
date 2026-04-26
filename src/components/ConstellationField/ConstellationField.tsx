import { useRef, useEffect } from 'react';
import styles from './ConstellationField.module.scss';
import { ConstellationField as ConstellationFieldCore } from '../../../src-vanilla/constellation';

export function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const field = new ConstellationFieldCore();
    field.mount(canvas);
    return () => field.destroy();
  }, []);

  return <canvas ref={canvasRef} className={styles['constellation-field__canvas']} />;
}
