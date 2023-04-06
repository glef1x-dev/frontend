import { useEffect, useRef, useState } from "react";
import styles from "./ScrollProgressBar.module.css";

export default function ScrollProgressBar(): JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const onScroll = () =>
      requestAnimationFrame(() => {
        const scrolled = document.documentElement.scrollTop;
        const scrollLength =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const progress = (100 * scrolled) / scrollLength;

        setProgress(progress);

        if (ref.current) {
          ref.current.style.width = `${progress}%`;
        }
      });

    // Adding event listener on mounting
    window.addEventListener("scroll", onScroll);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);

  return (
    <div
      aria-valuenow={progress}
      aria-valuemin={0}
      ref={ref}
      aria-valuemax={100}
      className={styles.scrollProgressBar}
    />
  );
}
