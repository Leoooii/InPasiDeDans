import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'public/**', 'sanity/**', 'next-env.d.ts'] },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Cod vechi cu `any`: avertisment, nu eroare, ca să nu oprească build-ul. De curățat treptat.
  { rules: { '@typescript-eslint/no-explicit-any': 'warn' } },
];

export default config;
