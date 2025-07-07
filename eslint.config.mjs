import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Extend Next.js and TypeScript configurations
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // Add global ignore patterns
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'build/**',
      'app/**/*generated/**', // Exclude Prisma-generated files
      'app/generated/**', // Additional pattern for safety
      ''
    ],
  },
];

export default eslintConfig;