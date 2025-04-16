import { PaginationMeta } from './types';

type ApiResponse<T extends Record<string, any>> = {
  message: string;
  data: T;
  pagination?: PaginationMeta;
};

export function createApiResponse<T extends Record<string, any>>(
  message: string,
  data: T,
  pagination?: PaginationMeta,
): ApiResponse<T> {
  return { message, data, ...(pagination && { pagination }) };
}
