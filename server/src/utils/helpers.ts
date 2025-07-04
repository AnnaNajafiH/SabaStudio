//The helpers.ts file is a crucial utility module that:
// ✅ Standardizes API responses
// ✅ Provides common utility functions
// ✅ Ensures type safety
// ✅ Promotes code reusability
// ✅ Maintains consistency across your entire backend


import { ApiResponse } from '../types';


// Create a standardized API response:
export const createResponse = <T>(
  success: boolean,
  message?: string,
  data?: T,
  error?: string
): ApiResponse<T> => {
  const response: ApiResponse<T> = { success };
  if (message !== undefined) response.message = message;
  if (data !== undefined) response.data = data;
  if (error !== undefined) response.error = error;
  return response;
};

// Create a success response:
export const success = <T>(data?: T, message?: string): ApiResponse<T> => {
  return createResponse(true, message, data);
};

// Create a fail response (client error):
export const fail = (message: string, data?: any): ApiResponse => {
  return createResponse(false, message, data);
};

// Create an error response (server error):
export const error = (message: string, error?: string): ApiResponse => {
  return createResponse(false, message, undefined, error);
};


// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


// Generate a random string

export const generateRandomString = (length: number = 10): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};


// Generate URL-friendly slug from text

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')         // Replace spaces with hyphens
    .replace(/-+/g, '-')          // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '');     // Remove leading/trailing hyphens
};

/**
 * Calculate pagination metadata
 */
export const calculatePagination = (
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;
  
  return {
    currentPage: page,
    totalPages,
    totalItems: total,
    itemsPerPage: limit,
    hasNext,
    hasPrev,
    nextPage: hasNext ? page + 1 : null,
    prevPage: hasPrev ? page - 1 : null
  };
};

/**
 * Delay function for testing
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
