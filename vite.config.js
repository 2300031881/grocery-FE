import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ✅ Added this section to run frontend on port 8085
  server: {
    port: 8085,
    host: "127.0.0.1", 
  },
})
