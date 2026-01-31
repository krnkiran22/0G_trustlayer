import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

// General API rate limiter
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.',
    },
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Analysis-specific rate limiter (more restrictive)
export const analysisLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 analyses per hour
  message: {
    success: false,
    error: {
      message: 'Too many analysis requests. Please try again later.',
    },
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    res.status(429).json({
      success: false,
      error: {
        message: 'Analysis rate limit exceeded. Maximum 10 analyses per hour.',
        retryAfter: '1 hour',
      },
      timestamp: new Date().toISOString(),
    });
  },
});

// Stats endpoint rate limiter
export const statsLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 30, // 30 requests per minute
  message: {
    success: false,
    error: {
      message: 'Too many stats requests.',
    },
    timestamp: new Date().toISOString(),
  },
  standardHeaders: true,
  legacyHeaders: false,
});
