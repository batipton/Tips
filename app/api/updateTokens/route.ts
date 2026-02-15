export const dynamic = "force-dynamic";
import { sql } from "@/app/lib/db";

export async function GET() {
    await sql`UPDATE users SET redeem = true`;
    return new Response("updated successfully");
}