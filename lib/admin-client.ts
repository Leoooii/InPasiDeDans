import { auth } from '@/lib/firebase';

/** Antetul cu ID token-ul adminului logat, pentru rutele /api/admin/*. */
export async function antetAdmin(): Promise<Record<string, string>> {
  await auth.authStateReady();
  const token = await auth.currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
