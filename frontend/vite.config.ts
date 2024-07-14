import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  },
  define: {
    'process.env.VITE_IGNORE_TS_ERRORS': JSON.stringify(process.env.VITE_IGNORE_TS_ERRORS)
  }

})
