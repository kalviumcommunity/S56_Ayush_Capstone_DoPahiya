import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode , process.cwd(), '');
  return {
    define : {
      "API_URL": JSON.stringify(env.API_URL),
      "THIRD_PARTY_API_CLIENT_ID": JSON.stringify(env.THIRD_PARTY_API_CLIENT_ID),
    },
    plugins: [react()]
  }
})
