export interface BaseResponse<T> {
  isSuccess: boolean;
  code: number;
  message: string;
  result: T;
}

interface Pagination {
  page: number;
  totalPages: number;
  totalElements: number;
  isFirst: boolean;
  isLast: boolean;
}

export type PaginationResponse<T> = BaseResponse<T & Pagination>;
