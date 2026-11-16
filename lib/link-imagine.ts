// Linkuri de imagine lipite în admin (imgur etc.). Întoarce adresa directă a pozei
// sau un mesaj de eroare pe înțeles.

export type RezultatLink = { url: string } | { eroare: string };

export function linkImagine(text: string): RezultatLink {
  const brut = text.trim();
  if (!brut) return { eroare: 'Lipește un link.' };

  let u: URL;
  try {
    u = new URL(brut);
  } catch {
    return { eroare: 'Linkul nu e valid. Trebuie să înceapă cu https://' };
  }
  if (u.protocol !== 'https:' && u.protocol !== 'http:') return { eroare: 'Linkul trebuie să înceapă cu https://' };
  u.protocol = 'https:';

  const gazda = u.hostname.replace(/^www\./, '').replace(/^m\./, '');
  if (gazda === 'imgur.com' || gazda === 'i.imgur.com') {
    const parti = u.pathname.split('/').filter(Boolean);
    if (parti[0] === 'a' || parti[0] === 'gallery') {
      return {
        eroare: 'E un album imgur, nu o poză. Deschide poza, apasă click dreapta pe ea → „Copiază adresa imaginii” și lipește linkul acela.',
      };
    }
    const fisier = parti[parti.length - 1];
    if (!fisier) return { eroare: 'Nu găsesc poza în linkul imgur.' };
    const [id, ext] = fisier.split('.');
    if (!/^[A-Za-z0-9]{5,10}$/.test(id)) return { eroare: 'Nu găsesc poza în linkul imgur.' };
    return { url: `https://i.imgur.com/${id}.${ext && /^(jpe?g|png|gif|webp)$/i.test(ext) ? ext.toLowerCase() : 'jpeg'}` };
  }

  return { url: u.toString() };
}
