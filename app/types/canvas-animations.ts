import type { CreateTypes as CanvasConfetti } from "canvas-confetti";

export enum EventType {
  BIRTHDAY = "birthday",
  XMAS = "xmas",
}

export type RenderOptions = {
  animationDurationInMilliseconds: number;
};

export interface CanvasAnimation {
  type: EventType;
  render: (confetti: CanvasConfetti, options?: RenderOptions) => void;
  name?: string;
}

export interface ConditionalCanvasAnimation extends CanvasAnimation {
  preconditionFn: () => boolean;
}
