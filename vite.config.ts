/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
      react(),
  ],
  base:"/explorer_github/",
  test :{
    globals:true,
    environment:"jsdom",
    setupFiles:"./tests/setup-test.ts",

  }
})
