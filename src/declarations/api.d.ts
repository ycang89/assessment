export interface ListResponse<T> {
  TotalNumberOfResults: number;
  Page: number;
  PageSize: number;
  ResultItems: T[];
}
