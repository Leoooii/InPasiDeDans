import { auth } from '@/lib/firebase';
import type { CacheTag } from '@/lib/public-data';

// Paginile publice sunt în cache; după o salvare din admin cerem regenerarea
// celor care folosesc datele modificate. Eșecul nu blochează salvarea:
// în cel mai rău caz, datele apar pe site după expirarea cache-ului (1h).
export async function reimprospateazaSite(...tags: CacheTag[]) {
  try {
    const token = await auth.currentUser?.getIdToken();
    if (!token) return;
    await fetch('/api/revalidate-content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ tags }),
    });
  } catch (err) {
    console.error('Reîmprospătarea site-ului a eșuat:', err);
  }
}
