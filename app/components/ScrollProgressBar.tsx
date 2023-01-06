import { LinearProgress } from "@mui/material";
import { LinearProgressProps } from "@mui/material/LinearProgress/LinearProgress.js";
import { useEffect, useState } from "react";

export default function ScrollProgressBar(
  props: LinearProgressProps
): JSX.Element {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const computeProgress = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (100 * scrolled) / scrollLength;

      setProgress(progress);
    };

    // Adding event listener on mounting
    window.addEventListener("scroll", computeProgress);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", computeProgress);
  });

  return <LinearProgress {...props} variant="determinate" value={progress} />;
}
