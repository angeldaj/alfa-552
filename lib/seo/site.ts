// VERCEL_PROJECT_PRODUCTION_URL is set by Vercel at build/runtime and has no protocol.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
