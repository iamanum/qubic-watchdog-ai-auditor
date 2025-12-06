/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://mjyxkwykjqetolnpiivi.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_ZXr40J8D1GaFjvK4AcyDng_LZBM11XX",
  },

  // ❌ Remove entire experimental block (NOT allowed in Next.js 16)
  // experimental: {},

  compiler: {
    // removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;
