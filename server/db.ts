import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import * as schema from "@shared/schema";
import ws from 'ws';

// Support both standard and Netlify-specific Neon environment variables
const dbUrl = process.env.DATABASE_URL || process.env.NETLIFY_DATABASE_URL;

if (!dbUrl) {
  throw new Error(
    "DATABASE_URL or NETLIFY_DATABASE_URL must be set. Please check your Netlify environment variables.",
  );
}

// Required for the serverless pool to work in environments without native WebSocket support
neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: dbUrl });
export const db = drizzle(pool, { schema });
