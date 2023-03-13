const enum SortOrder {
  descending = -1,
  ascending = 1,
}

// TODO: consider the edge case when n is undefined
// type Obj = {
//   n?: number;
//   c?: string;
// };
//
// const objects: Obj[] = [
//   { n: 1, c: "h" },
//   { n: 2, c: "s" },
//   { n: 3, c: "h" },
// ];
//
// objects.sort(dynamicSort<Obj>("-n"));
export function dynamicSort<
  T extends Partial<Record<Key, unknown>>,
  Key extends string = Extract<keyof T, string>,
>(property: Key | `-${Key}`) {
  let sortOrder = SortOrder.ascending;

  if (property.startsWith("-")) {
    sortOrder = SortOrder.descending;
    property = property.slice(1) as Key;
  }

  return function (a: T, b: T): number {
    const key = property as Key;
    const result = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
    return result * sortOrder;
  };
}
