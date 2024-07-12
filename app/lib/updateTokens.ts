'use server'

import { sql } from '@vercel/postgres';

await sql`UPDATE users SET tokens = tokens + 100`;

export async function GET() {
    await sql`UPDATE users SET tokens = tokens + 100`;
  }