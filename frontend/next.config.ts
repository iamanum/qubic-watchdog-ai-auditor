// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ──────── Environment Variables ────────
  // NOTE: Vercel par isko manually environment variables mein add karna zaroori hai.
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://mjyxkwykjqetolnpiivi.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_ZXr40J8D1GaFjvK4AcyDng_LZBM11XX",
  },

  // ──────── Removed Invalid Properties (eslint, typescript) ────────
  // **Fix:** Build errors ignore karne ke liye settings ab `tsconfig.json` mein honi chahiye.
  // Hum in properties ko NextConfig se hata denge.

  // ──────── Images / Assets ────────
  images: {
    domains: ['mjyxkwykjqetolnpiivi.supabase.co'], 
    // Vercel par deployment ke liye isse hata den, lekin local testing ke liye theek hai.
    // unoptimized: true,
  },

  // Aapki hackathon winning features ke liye koi extra configuration zaroori nahi hai.
}

export default nextConfig