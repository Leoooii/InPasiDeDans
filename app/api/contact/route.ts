// Acest endpoint a fost înlocuit de /api/send (folosește Resend).
// Păstrat pentru compatibilitate cu redirect-uri vechi.
export async function POST() {
  return new Response(JSON.stringify({ error: 'Folosiți /api/send' }), {
    status: 410,
    headers: { 'Content-Type': 'application/json' },
  });
}
