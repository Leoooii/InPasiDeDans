import { construiesteLlmsTxt } from '@/lib/llms';

export const revalidate = 3600;

export async function GET() {
  const text = await construiesteLlmsTxt({ complet: true });
  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
