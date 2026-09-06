import postgres from 'postgres';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set. Add it to your .env.local file.');
}

// Using Supabase's connection pooler (pgbouncer, transaction mode) instead of
// the direct connection, since the direct host is IPv6-only and many networks
// can't resolve it. Transaction-mode pooling requires prepared statements to
// be disabled.
export const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
  prepare: false,
});