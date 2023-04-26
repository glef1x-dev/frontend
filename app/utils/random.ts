export function randomInRange(min: number, max: number): number {
  // [min, max)
  return Math.random() * (max - min) + min;
}
