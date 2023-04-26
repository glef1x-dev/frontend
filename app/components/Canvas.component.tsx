import { create as createConfetti } from "canvas-confetti";
import { useEffect, useRef } from "react";

import { CanvasAnimation } from "~/types";

export interface CanvasProps {
  animation: CanvasAnimation;
}

export function Canvas({ animation }: CanvasProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const confetti = createConfetti(canvasRef.current as HTMLCanvasElement, {
    resize: true,
    disableForReducedMotion: true,
  });

  useEffect(() => {
    animation.render(confetti, {
      animationDurationInMilliseconds: 5000,
    });
  }, [confetti, animation]);

  return <canvas className="fixed inset-0 z-20" ref={canvasRef} />;
}
