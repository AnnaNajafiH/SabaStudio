import rateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware for contact form submissions
 * Prevents spam and abuse by limiting submissions per IP
 */
export const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many contact form submissions. Please try again later.',
    data: null
  },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Less restrictive rate limit for admin operations
 */
export const adminRateLimit = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 50, // Allow more requests for admin operations
  message: {
    status: 'error',
    message: 'Too many requests. Please try again later.',
    data: null
  },
  standardHeaders: true,
  legacyHeaders: false,
});
