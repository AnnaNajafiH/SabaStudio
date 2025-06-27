import { ApiResponse } from '../types';

/**
 * Create a standardized API response
 */
export const createResponse = <T>(
  status: 'success' | 'fail' | 'error',
  message?: string,
  data?: T,
  error?: string
): ApiResponse<T> => {
  const response: ApiResponse<T> = { status };
  if (message !== undefined) response.message = message;
  if (data !== undefined) response.data = data;
  if (error !== undefined) response.error = error;
  return response;
};

/**
 * Create a success response
 */
export const success = <T>(data?: T, message?: string): ApiResponse<T> => {
  return createResponse('success', message, data);
};

/**
 * Create a fail response (client error)
 */
export const fail = (message: string, data?: any): ApiResponse => {
  return createResponse('fail', message, data);
};

/**
 * Create an error response (server error)
 */
export const error = (message: string, error?: string): ApiResponse => {
  return createResponse('error', message, undefined, error);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate a random string
 */
export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * Delay function for testing
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
