import { rateLimit } from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60000,
  limit: 10, 
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error : 'You have exceeded the maximum amount of requests per minute.' }
});