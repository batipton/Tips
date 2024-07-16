export const dynamic = 'force-dynamic';

import { sql } from '@vercel/postgres';

export async function GET() {
    await sql`UPDATE users SET tokens = tokens + 100`;

    return new Response("updated successfully");
}