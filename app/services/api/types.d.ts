declare type PaginatedResult<T> = {
  results: Array<T>;
  count: int;
  next: string;
  previous: string;
};
