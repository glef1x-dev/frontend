import { useEffect, useRef, useState } from 'react';
import styles from './ScrollProgressBar.module.css';

export default function ScrollProgressBar(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [progressState, setProgressState] = useState<number>(0);

  useEffect(() => {
    const onScroll = (): number => requestAnimationFrame(() => {
      const scrolled = document.documentElement.scrollTop;
      const scrollLength = document.documentElement.scrollHeight
          - document.documentElement.clientHeight;
      const progress = (100 * scrolled) / scrollLength;

      setProgressState(progress);

      if (ref.current) {
        ref.current.style.width = `${progress}%`;
      }
    });
    window.addEventListener('scroll', onScroll);

    return (): void => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return (
    <div
      aria-valuenow={progressState}
      aria-valuemin={0}
      ref={ref}
      aria-valuemax={100}
      className={styles.scrollProgressBar}
    />
  );
}
