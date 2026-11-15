import 'server-only';
import type { NextRequest } from 'next/server';
import { emailDinToken } from '@/lib/firebase-admin-rest';

/**
 * Cererea vine de la adminul logat? Browserul trimite ID token-ul Firebase în
 * `Authorization: Bearer ...` (vezi `antetAdmin()` din lib/admin-client.ts).
 */
export async function cerereDeLaAdmin(req: NextRequest): Promise<boolean> {
  const idToken = req.headers.get('authorization')?.replace(/^Bearer /, '');
  if (!idToken || !process.env.NEXT_PUBLIC_ADMIN_EMAIL) return false;
  const email = await emailDinToken(idToken).catch(() => null);
  return email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;
}
