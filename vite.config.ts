/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
      react(),
  ],
  base:"/github_explorer/",
  test :{
    globals:true,
    environment:"jsdom",
    setupFiles:"./tests/setup-test.ts",

  }
})
