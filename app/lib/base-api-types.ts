export interface PaginatedResult<T> {
  results: Array<T>;
  count: number;
  next: string;
  previous: string;
}
