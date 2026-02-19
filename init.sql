-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  image_url TEXT DEFAULT '/customers/default.png',
  tokens INTEGER DEFAULT 100,
  redeem BOOLEAN DEFAULT TRUE,
  darkmode BOOLEAN DEFAULT FALSE,
  bio TEXT,
  dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  tips INTEGER DEFAULT 0,
  text TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tips table
CREATE TABLE IF NOT EXISTS tips (
  id SERIAL PRIMARY KEY,
  postid INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  userid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  commenter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Following table
CREATE TABLE IF NOT EXISTS following (
  id SERIAL PRIMARY KEY,
  followed INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  follower INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(followed, follower)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  rec_userid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  send_userid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seen BOOLEAN DEFAULT FALSE,
  type VARCHAR(50) NOT NULL,
  postid INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reset tokens table (for password reset)
CREATE TABLE IF NOT EXISTS resetTokens (
  id TEXT PRIMARY KEY,
  userid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_posts_customer_id ON posts(customer_id);
CREATE INDEX IF NOT EXISTS idx_posts_date ON posts(date);
CREATE INDEX IF NOT EXISTS idx_tips_postid ON tips(postid);
CREATE INDEX IF NOT EXISTS idx_tips_userid ON tips(userid);
CREATE INDEX IF NOT EXISTS idx_tips_date ON tips(date);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(post_id);
CREATE INDEX IF NOT EXISTS idx_comments_commenter_id ON comments(commenter_id);
CREATE INDEX IF NOT EXISTS idx_following_followed ON following(followed);
CREATE INDEX IF NOT EXISTS idx_following_follower ON following(follower);
CREATE INDEX IF NOT EXISTS idx_notifications_rec_userid ON notifications(rec_userid);
CREATE INDEX IF NOT EXISTS idx_notifications_send_userid ON notifications(send_userid);
CREATE INDEX IF NOT EXISTS idx_resetTokens_userid ON resetTokens(userid);

-- Insert a test user (password is "test123")
INSERT INTO users (username, name, email, password, tokens, bio) 
VALUES (
  'testuser',
  'Test User',
  'test@example.com',
  '$2b$10$rKZvVqVQxJ5kQ5h5KZvVqeF5KZvVqVQxJ5kQ5h5KZvVqeF5KZvVqO',
  100,
  'This is a test user for local development'
) ON CONFLICT (email) DO NOTHING;

-- Insert some sample posts
INSERT INTO posts (customer_id, text, tips, date) 
SELECT 
  u.id,
  'Welcome to my profile! This is my first post.',
  5,
  CURRENT_TIMESTAMP - INTERVAL '2 days'
FROM users u 
WHERE u.username = 'testuser'
ON CONFLICT DO NOTHING;

INSERT INTO posts (customer_id, text, tips, date) 
SELECT 
  u.id,
  'Just testing out this amazing platform!',
  10,
  CURRENT_TIMESTAMP - INTERVAL '1 day'
FROM users u 
WHERE u.username = 'testuser'
ON CONFLICT DO NOTHING;
