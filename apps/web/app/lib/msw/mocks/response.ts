export const baseReponse = (result: unknown) => ({
  isSuccess: true,
  code: 200,
  message: "success",
  result,
});

export const paginationResponse = (result: unknown) => ({
  ...baseReponse(result),
  page: 0,
  totalPages: 1,
  totalElements: 1,
  isFirst: true,
  isLast: true,
});

export const errorResponse = ({
  code,
  message,
  error,
}: {
  code: number;
  message: string;
  error?: string;
}) => ({
  isSuccess: false,
  code,
  message,
  error,
});
