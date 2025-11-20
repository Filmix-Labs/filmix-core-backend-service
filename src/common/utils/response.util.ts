export function formatResponse<T>(
  status: 'success' | 'error',
  code: number,
  message: string,
  data?: T,
) {
  return {
    status,
    code,
    message,
    data: data || null,
  };
}
