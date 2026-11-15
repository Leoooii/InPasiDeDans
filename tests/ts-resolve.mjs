// Permite testelor (node --test) să importe fișiere .ts fără extensie și cu aliasul „@/”,
// la fel ca Next.js. Doar pentru teste; Node rulează TypeScript nativ (type stripping).
import { register } from 'node:module';
register('./ts-resolve-hooks.mjs', import.meta.url);
