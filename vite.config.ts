import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'

// Some files import packages using a `pkg@version` suffix (e.g. "lucide-react@0.487.0").
// This plugin strips the version suffix so Vite can resolve them from node_modules.
function stripVersionedImports(): Plugin {
  const regex = /from\s+(["'])((?:@?[^"'@]+\/)*[^"'@]+)@[^"']+\1/g
  return {
    name: 'strip-versioned-imports',
    enforce: 'pre',
    transform(code, id) {
      if (!id.match(/\.(t|j)sx?$/)) return
      if (regex.test(code)) {
        code = code.replace(regex, 'from $1$2$1')
        return { code, map: null }
      }
    },
  }
}

export default defineConfig({
  plugins: [stripVersionedImports(), react()],
  server: {
    port: 5173,
    open: true
  },
  resolve: {
    alias: {
      '@': '/'
    }
  }
})


