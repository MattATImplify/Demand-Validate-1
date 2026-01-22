import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@shared/schema";

// Support both standard and Netlify-specific Neon environment variables
const dbUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "DATABASE_URL or NETLIFY_DATABASE_URL must be set. Please check your Netlify environment variables.",
  );
}

// Enable connection caching in serverless environments
neonConfig.fetchConnectionCache = true;

// Handle edge case where dbUrl might be an object in some environments
const finalUrl = typeof dbUrl === 'string' ? dbUrl : (dbUrl as any).toString();

const sql = neon(finalUrl);
export const db = drizzle(sql, { schema });
