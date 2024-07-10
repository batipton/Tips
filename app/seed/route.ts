import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { users, posts, revenue, following } from '../lib/placeholder-data';

const client = await db.connect();


async function seedPosts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      customer_id UUID NOT NULL,
      tips INT NOT NULL,
      text VARCHAR(65535),
      date DATE NOT NULL
    );
  `;

  const insertedPosts = await Promise.all(
    posts.map(
      (post) => client.sql`
        INSERT INTO posts (customer_id, tips, text, date)
        VALUES (${post.customer_id}, ${post.tips}, ${post.text}, ${post.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPosts;
}

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      tokens INT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, name, email, password, image_url, tokens)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.image_url}, ${user.tokens})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

// async function seedCustomers() {
//   await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

//   await client.sql`
//     CREATE TABLE IF NOT EXISTS customers (
//       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//       name VARCHAR(255) NOT NULL,
//       email VARCHAR(255) NOT NULL,
//       image_url VARCHAR(255) NOT NULL
//     );
//   `;

//   const insertedCustomers = await Promise.all(
//     customers.map(
//       (customer) => client.sql`
//         INSERT INTO customers (id, name, email, image_url)
//         VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
//         ON CONFLICT (id) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedCustomers;
// }

// async function seedRevenue() {
//   await client.sql`
//     CREATE TABLE IF NOT EXISTS revenue (
//       month VARCHAR(4) NOT NULL UNIQUE,
//       revenue INT NOT NULL
//     );
//   `;

//   const insertedRevenue = await Promise.all(
//     revenue.map(
//       (rev) => client.sql`
//         INSERT INTO revenue (month, revenue)
//         VALUES (${rev.month}, ${rev.revenue})
//         ON CONFLICT (month) DO NOTHING;
//       `,
//     ),
//   );

//   return insertedRevenue;
// }

async function seedFollowing() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS following (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      followed UUID NOT NULL,
      follower UUID NOT NULL
    );
  `;

  // const insertedFollowings = await Promise.all(
  //   following.map(
  //     (follow) => client.sql`
  //       INSERT INTO following (id, followed, follower)
  //       VALUES (${follow.id}, ${follow.followed}, ${follow.follower})
  //       ON CONFLICT (id) DO NOTHING;
  //     `,
  //   ),
  // );

  // return insertedFollowings;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    // await seedCustomers();
    // await seedPosts();
    // await seedRevenue();
    await seedFollowing();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
