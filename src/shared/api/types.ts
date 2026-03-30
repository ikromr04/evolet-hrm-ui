type ApiError = {
  status: string;
  title: string;
  detail: string;

  source?: {
    pointer?: string;
  };
};

type ApiErrors = ApiError[];

type ErrorResponse = {
  errors: ApiError[];
};

export { ApiError, ApiErrors, ErrorResponse };
