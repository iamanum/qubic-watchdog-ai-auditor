

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Yeh 'env' section environment variables ko seedha compile time par load karta hai, 
  // jisse 'supabaseUrl is required' wala error theek ho jaata hai.
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://mjyxkwykjqetolnpiivi.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "sb_publishable_ZXr40J8D1GaFjvK4AcyDng_LZBM11XX",
  },
  
  // Compiler/Turbopack ki instability ko theek karne ke liye experimental settings
  experimental: {
    appDir: true,
    // Turbopack ko force-off karke Webpack/SWC ko use karna
    forceSwcTransforms: true,
    turbopack: false, 
  },
  
  // Yeh compiler section sirf Next.js ke liye zaroori hai
  compiler: {
    // optional: agar aap production mein console logs remove karna chahte hain
    // removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;