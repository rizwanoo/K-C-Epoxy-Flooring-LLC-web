import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      {
        name: 'inject-og-origin',
        apply: 'build',
        transformIndexHtml(html: string): string {
          const rawHost =
            process.env.VERCEL_PROJECT_PRODUCTION_URL ||
            process.env.VERCEL_URL ||
            process.env.APP_URL ||
            '';
          if (!rawHost || rawHost.includes('MY_APP_URL')) {
            return html;
          }
          const baseUrl = rawHost.startsWith('http')
            ? rawHost.replace(/\/+$/, '')
            : `https://${rawHost.replace(/\/+$/, '')}`;
          return html
            .replace(/content="\/images\/og-card\.jpg"/g, `content="${baseUrl}/images/og-card.jpg"`)
            .replace(/property="og:url" content="\/"/g, `property="og:url" content="${baseUrl}/"`)
            .replace(/"logo": "\/favicon-512\.png"/g, `"logo": "${baseUrl}/favicon-512.png"`)
            .replace(/"image": "\/images\/og-card\.jpg"/g, `"image": "${baseUrl}/images/og-card.jpg"`);
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
