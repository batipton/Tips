import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { posts, customers, revenue, users } from '../lib/placeholder-data';

const client = await db.connect();

async function deleteUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
      DROP TABLE users
    `;
}

async function deleteFollowing() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    DROP TABLE following
  `;
}

async function createEmptyFollowing() {
  
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedPosts();
    // await seedRevenue();
    // await deleteUsers();
    await deleteFollowing();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
