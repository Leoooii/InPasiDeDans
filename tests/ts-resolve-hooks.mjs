import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const radacina = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function resolve(specifier, context, next) {
  let spec = specifier;
  if (spec.startsWith('@/')) spec = pathToFileURL(path.join(radacina, spec.slice(2))).href;
  if ((spec.startsWith('.') || spec.startsWith('file:')) && !path.extname(spec)) {
    const baza = spec.startsWith('file:') ? fileURLToPath(spec) : path.resolve(path.dirname(fileURLToPath(context.parentURL)), spec);
    for (const ext of ['.ts', '.tsx', '/index.ts']) {
      if (existsSync(baza + ext)) return next(pathToFileURL(baza + ext).href, context);
    }
  }
  return next(spec, context);
}
