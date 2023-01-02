export interface PaginatedResult<T> {
  results: Array<T>;
  /** doesn't exist when using cursor pagination for infinite scroll */
  count?: number;
  next?: string;
  previous?: string;
}
