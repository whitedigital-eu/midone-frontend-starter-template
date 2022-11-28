import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { readFileSync } from 'node:fs'
// import { visualizer } from 'rollup-plugin-visualizer'

// const httpsConfig =
//   process.env.NODE_ENV !== 'production'
//     ? {
//         key: readFileSync('/etc/ssl/private/local.io.key'),
//         cert: readFileSync('/etc/ssl/private/local.io.crt'),
//       }
//     : false

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 8000,
    strictPort: true,
    // https: httpsConfig,
    hmr: {
      port: 8000,
    },
  },
  preview: {
    host: true,
    port: 8000,
    // https: httpsConfig,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('tabulator-tables')) return 'tabulator-tables'
            if (id.includes('@ckeditor')) return 'ckeditor'
            if (id.includes('@dvsl/zoomcharts')) return 'zoomcharts'
            if (id.includes('lucide')) return 'lucide-icons'
            if (id.includes('dropzone')) return 'dropzone'
            return 'vendor'
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './resources/js'),
    },
  },
  plugins: [
    vue(),
    // visualizer()
  ],
})
