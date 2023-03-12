export function dynamicSort<
  T extends Record<string, string | number | symbol>,
  Key extends string = Extract<keyof T, string>,
>(property: Key | `-${Key}`) {
  let sortOrder = 1;

  if (property.startsWith("-")) {
    sortOrder = -1;
    property = property.slice(1) as Key;
  }

  return function (a: T, b: T): number {
    const result =
      <number>a[property] < <number>b[property]
        ? -1
        : <number>a[property] > <number>b[property]
        ? 1
        : 0;
    return result * sortOrder;
  };
}
