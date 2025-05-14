import { RateLimiterMemory } from 'rate-limiter-flexible';

// Configurează limitarea la 10 cereri pe 60 de secunde per IP
const rateLimiter = new RateLimiterMemory({
  points: 10, // Număr maxim de cereri
  duration: 60, // Perioada în secunde
});

export async function rateLimitMiddleware(ip: string): Promise<void> {
  try {
    await rateLimiter.consume(ip);
  } catch (error) {
    throw new Error('Too many requests');
  }
}