'use server'

import { sql } from '@vercel/postgres';


export async function GET() {
    await sql`UPDATE users SET tokens = tokens + 100`;
}