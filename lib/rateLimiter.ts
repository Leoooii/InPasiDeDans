import { kv } from '@vercel/kv';

const POINTS = 10; // cereri maxime
const DURATION = 60; // secunde

export async function rateLimitMiddleware(ip: string): Promise<void> {
  const key = `rl:${ip}`;

  try {
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, DURATION);
    }
    if (count > POINTS) {
      throw new Error('Too many requests');
    }
  } catch (error) {
    if (error instanceof Error && error.message === 'Too many requests') {
      throw error;
    }
    // KV indisponibil (ex. local dev) — fail open
    console.warn('[rateLimiter] KV unavailable, skipping rate limit:', (error as Error).message);
  }
}
