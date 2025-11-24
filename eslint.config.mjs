// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier/flat';
import * as mdx from 'eslint-plugin-mdx';

export default defineConfig([
    ...nextVitals,
    ...nextTs,

    // Wyłącza reguły kolidujące z Prettierem
    prettierConfig,

    // Prettier jako reguła dla „normalnych” plików (ts/tsx/js/jsx itp.)
    {
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'warn',
        },
    },

    // 🔑 MDX – powiedz ESLintowi jak lintować pliki .mdx
    {
        ...mdx.flat, // bazowy config z eslint-plugin-mdx (flat config)
        files: ['**/*.mdx'],
    },

    // 🔑 Prettier + specjalne reguły dla .mdx
    {
        files: ['**/*.mdx'],
        plugins: {
            prettier: prettierPlugin,
        },
        rules: {
            'prettier/prettier': 'warn', // Prettier działa też na .mdx
            'max-len': 'off', // niech Prettier decyduje o długości
        },
    },

    // Ignory Next.js
    globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
