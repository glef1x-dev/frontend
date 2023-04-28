import {
  CanvasAnimation,
  ConditionalCanvasAnimation,
  EventType,
} from "~/types";
import { randomInRange } from "~/utils/random";
import { isTodayChristmasDay, isTodayMyBirthday } from "~/utils/datetime";

const defaultOptions = {
  animationDurationInMilliseconds: 15_000,
};

const animatedEvents: Array<ConditionalCanvasAnimation> = [
  {
    type: EventType.BIRTHDAY,
    preconditionFn: isTodayMyBirthday,
    name: "fireworks",
    render(
      confetti,
      { animationDurationInMilliseconds } = defaultOptions
    ): void {
      const animationEndUnix = Date.now() + animationDurationInMilliseconds;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const interval = setInterval(() => {
        const timeLeftInSeconds = animationEndUnix - Date.now();

        if (timeLeftInSeconds <= 0) {
          return clearInterval(interval);
        }

        const particleCount =
          50 * (timeLeftInSeconds / animationDurationInMilliseconds);
        // since particles fall down, start a bit higher than random
        void confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          })
        );
        void confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          })
        );
      }, 250);
    },
  },
  {
    type: EventType.XMAS,
    preconditionFn: isTodayChristmasDay,
    name: "snowfall",
    render(): void {
      // TODO - add snowfall animation
      // https://www.kirilv.com/canvas-confetti/
    },
  },
];

function nonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function getCanvasAnimations(): Array<CanvasAnimation> {
  return animatedEvents
    .map((e): null | CanvasAnimation => {
      const { preconditionFn, ...rest } = e;
      if (!preconditionFn()) {
        return null;
      }
      return rest;
    })
    .filter(nonNullable);
}
