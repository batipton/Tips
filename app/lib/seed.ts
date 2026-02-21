import { config } from 'dotenv';
import { resolve } from 'path';
import { sql } from './db';
import bcrypt from 'bcrypt';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

async function seedDatabase() {
  try {
    console.log('Dropping existing tables...');

    // Drop tables in reverse order of dependencies
    await sql`DROP TABLE IF EXISTS notifications CASCADE`;
    await sql`DROP TABLE IF EXISTS tips CASCADE`;
    await sql`DROP TABLE IF EXISTS resettokens CASCADE`;
    await sql`DROP TABLE IF EXISTS feedback CASCADE`;
    await sql`DROP TABLE IF EXISTS comments CASCADE`;
    await sql`DROP TABLE IF EXISTS following CASCADE`;
    await sql`DROP TABLE IF EXISTS posts CASCADE`;
    await sql`DROP TABLE IF EXISTS users CASCADE`;
    
    console.log('Creating tables...');

    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        image_url VARCHAR(255),
        bio TEXT,
        tokens INTEGER DEFAULT 20,
        redeem BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create posts table
    await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
        tips INTEGER DEFAULT 0,
        text TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create comments table
    await sql`
      CREATE TABLE IF NOT EXISTS comments (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
        commenter_id UUID REFERENCES users(id) ON DELETE CASCADE,
        text TEXT NOT NULL,
        date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create following table
    await sql`
      CREATE TABLE IF NOT EXISTS following (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        followed UUID REFERENCES users(id) ON DELETE CASCADE,
        follower UUID REFERENCES users(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(followed, follower)
      )
    `;

    // Create tips table
    await sql`
      CREATE TABLE IF NOT EXISTS tips (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        postid UUID REFERENCES posts(id) ON DELETE CASCADE,
        userid UUID REFERENCES users(id) ON DELETE CASCADE,
        amount INTEGER NOT NULL,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create notifications table
    await sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        rec_userid UUID REFERENCES users(id) ON DELETE CASCADE,
        send_userid UUID REFERENCES users(id) ON DELETE CASCADE,
        seen BOOLEAN DEFAULT false,
        type VARCHAR(50) NOT NULL,
        postid UUID REFERENCES posts(id) ON DELETE SET NULL,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create resettokens table
    await sql`
      CREATE TABLE IF NOT EXISTS resettokens (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        userid UUID REFERENCES users(id) ON DELETE CASCADE,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    // Create feedback table
    await sql`
      CREATE TABLE IF NOT EXISTS feedback (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        date TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `;

    console.log('Tables created successfully');
    console.log('Seeding development data...');

    // Hash passwords for test users
    const password1 = await bcrypt.hash('password123', 10);
    const password2 = await bcrypt.hash('password123', 10);
    const password3 = await bcrypt.hash('password123', 10);

    // User data
    const username1 = 'john_doe';
    const name1 = 'John Doe';
    const email1 = 'john@example.com';
    const bio1 = 'Love sharing tips and tricks!';
    const imageUrl1 = '/customers/default.png';

    const username2 = 'jane_smith';
    const name2 = 'Jane Smith';
    const email2 = 'jane@example.com';
    const bio2 = 'Developer and tech enthusiast';
    const imageUrl2 = '/customers/default.png';

    const username3 = 'mike_wilson';
    const name3 = 'Mike Wilson';
    const email3 = 'mike@example.com';
    const bio3 = 'Always learning something new';
    const imageUrl3 = '/customers/default.png';

    // Insert test users
    const users = await sql`
      INSERT INTO users (username, name, email, password, image_url, bio, tokens)
      VALUES 
        (${username1}, ${name1}, ${email1}, ${password1}, ${imageUrl1}, ${bio1}, 25),
        (${username2}, ${name2}, ${email2}, ${password2}, ${imageUrl2}, ${bio2}, 30),
        (${username3}, ${name3}, ${email3}, ${password3}, ${imageUrl3}, ${bio3}, 20)
      RETURNING id
    `;

    const [user1Id, user2Id, user3Id] = users.rows.map(u => u.id);

    // Insert test posts
    const post1Text = 'Just deployed my first Next.js app! 🚀';
    const post2Text = 'Tips for effective code reviews: Always be constructive and kind';
    const post3Text = 'Working on a new feature with server actions. So clean!';
    const post4Text = 'Coffee + coding = productivity ☕️';

    const posts = await sql`
      INSERT INTO posts (customer_id, tips, text, date)
      VALUES 
        (${user1Id}, 5, ${post1Text}, NOW() - INTERVAL '2 hours'),
        (${user2Id}, 3, ${post2Text}, NOW() - INTERVAL '5 hours'),
        (${user1Id}, 8, ${post3Text}, NOW() - INTERVAL '1 day'),
        (${user3Id}, 2, ${post4Text}, NOW() - INTERVAL '3 hours')
      RETURNING id
    `;

    const [post1Id, post2Id, post3Id, post4Id] = posts.rows.map(p => p.id);

    // Insert test comments
    const comment1Text = 'Congratulations! How was your experience?';
    const comment2Text = 'Awesome! What hosting service did you use?';
    const comment3Text = 'Great advice! Communication is key';
    const comment4Text = 'Same here! What is your favorite coffee?';

    await sql`
      INSERT INTO comments (post_id, commenter_id, text, date)
      VALUES 
        (${post1Id}, ${user2Id}, ${comment1Text}, CURRENT_DATE),
        (${post1Id}, ${user3Id}, ${comment2Text}, CURRENT_DATE),
        (${post2Id}, ${user1Id}, ${comment3Text}, CURRENT_DATE),
        (${post4Id}, ${user2Id}, ${comment4Text}, CURRENT_DATE)
    `;

    // Insert following relationships
    await sql`
      INSERT INTO following (followed, follower)
      VALUES 
        (${user1Id}, ${user2Id}),
        (${user1Id}, ${user3Id}),
        (${user2Id}, ${user1Id}),
        (${user3Id}, ${user2Id})
    `;

    // Insert some tips
    await sql`
      INSERT INTO tips (postid, userid, amount, date)
      VALUES 
        (${post1Id}, ${user2Id}, 1, NOW() - INTERVAL '1 hour'),
        (${post1Id}, ${user3Id}, 1, NOW() - INTERVAL '30 minutes'),
        (${post2Id}, ${user1Id}, 1, NOW() - INTERVAL '4 hours'),
        (${post3Id}, ${user2Id}, 1, NOW() - INTERVAL '12 hours')
    `;

    // Insert notifications
    const notifType1 = 'tip';
    const notifType2 = 'comment';
    const notifType3 = 'follow';

    await sql`
      INSERT INTO notifications (rec_userid, send_userid, seen, type, postid, date)
      VALUES 
        (${user1Id}, ${user2Id}, false, ${notifType1}, ${post1Id}, NOW() - INTERVAL '1 hour'),
        (${user1Id}, ${user3Id}, false, ${notifType2}, ${post1Id}, NOW() - INTERVAL '30 minutes'),
        (${user2Id}, ${user1Id}, true, ${notifType3}, NULL, NOW() - INTERVAL '1 day'),
        (${user1Id}, ${user2Id}, false, ${notifType3}, NULL, NOW() - INTERVAL '2 days')
    `;

    console.log('Development data seeded successfully');
    console.log('Test accounts:');
    console.log('- john@example.com / password123');
    console.log('- jane@example.com / password123');
    console.log('- mike@example.com / password123');
    
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seedDatabase();
