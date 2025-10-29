import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Plugin to copy all comparison HTML files to dist
function copyComparisonFiles() {
  return {
    name: 'copy-comparison-files',
    closeBundle() {
      const copyDir = (src, dest) => {
        try {
          mkdirSync(dest, { recursive: true });
          const files = readdirSync(src);

          files.forEach(file => {
            const srcPath = join(src, file);
            const destPath = join(dest, file);

            try {
              const stat = statSync(srcPath);

              if (stat.isDirectory()) {
                copyDir(srcPath, destPath);
              } else if (file.endsWith('.html') && file !== 'index.html') {
                copyFileSync(srcPath, destPath);
                console.log(`✓ Copied: ${file}`);
              }
            } catch (err) {
              // Skip files that can't be accessed
            }
          });
        } catch (err) {
          console.error(`Error copying from ${src}:`, err.message);
        }
      };

      console.log('\n📂 Copying comparison files...');
      // Copy EN comparison files
      copyDir('en', 'dist/en');
      // Copy AR comparison files
      copyDir('ar', 'dist/ar');
      console.log('✅ Comparison files copied!\n');
    }
  }
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        contact: resolve(__dirname, 'contact.html'),
        comparison: resolve(__dirname, 'comparison.html'),
        favorites: resolve(__dirname, 'favorites.html'),
        admin: resolve(__dirname, 'admin.html'),
        'admin-login': resolve(__dirname, 'admin-login.html'),
        'quick-decision': resolve(__dirname, 'quick-decision.html'),
        'privacy-policy': resolve(__dirname, 'privacy-policy.html'),
        terms: resolve(__dirname, 'terms.html'),
        'en-index': resolve(__dirname, 'en/index.html'),
        'ar-index': resolve(__dirname, 'ar/index.html'),
      }
    }
  },
  plugins: [copyComparisonFiles()],
  server: {
    port: 3000,
    open: false,
    fs: {
      strict: false
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
      '@css': resolve(__dirname, './css'),
      '@js': resolve(__dirname, './js'),
      '@images': resolve(__dirname, './images')
    }
  }
});
