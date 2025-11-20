export interface Meta {
  status: 'success' | 'error';
  message: string | null;
  code: number;
}

export interface ResponseWrapper<T> {
  meta: Meta;
  data?: T;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ErrorResponse {
  meta: Meta;
  errors?: ValidationError[];
}
