import * as React from "react";
import { LinearProgress } from "@mui/material";

export default function StatusBar() {
  const [progress, setProgress] = React.useState<number>(0);

  React.useEffect(() => {
    const computeProgress = () => {
      // The scrollTop gives length of window that has been scrolled
      const scrolled = document.documentElement.scrollTop;
      // scrollHeight gives total length of the window and
      // The clientHeight gives the length of viewport
      const scrollLength =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = `${(100 * scrolled) / scrollLength}`;

      setProgress(parseFloat(progress));
    };

    // Adding event listener on mounting
    window.addEventListener("scroll", computeProgress);

    // Removing event listener upon unmounting
    return () => window.removeEventListener("scroll", computeProgress);
  });

  return (
    <div
      style={{
        position: "sticky",
        width: "100vw",
        top: 0,
      }}
    >
      <LinearProgress variant="determinate" value={progress} />
    </div>
  );
}
