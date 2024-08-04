import { sql } from '@vercel/postgres';
import { auth } from "@/auth"
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  LatestPost,
  Revenue,
  ProfileField,
  FormattedFollowersTable,
  FormattedComments,
  Notification
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchLatestPosts(mode:string, userid:string, id:string) {
  try {
    if(mode == "followers") {
      const data = await sql<LatestPost>`
      SELECT p.tips, p.text, p.date, u.username, u.name, u.image_url, u.email, p.customer_id, p.id 
      FROM posts p 
      LEFT JOIN following f ON p.customer_id = f.followed AND f.follower = ${userid} 
      JOIN users u ON p.customer_id = u.id 
      WHERE p.customer_id = ${userid} OR f.followed IS NOT NULL 
      ORDER BY p.date DESC

      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else if (mode == "user") {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.username, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      WHERE posts.customer_id = ${userid}
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else if (mode == "follower") {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.username, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      WHERE posts.customer_id = ${id}
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    } else {
      const data = await sql<LatestPost>`
      SELECT posts.tips, posts.text, posts.date, users.username, users.name, users.image_url, users.email, posts.customer_id, posts.id
      FROM posts
      JOIN users ON posts.customer_id = users.id
      ORDER BY posts.date DESC
      `;
      const latestPosts = data.rows;
      return latestPosts;
    }
  
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest posts.');
  }
}

export async function fetchPost(postid: string) {
  try {
    const data = await sql<LatestPost>`
    SELECT posts.tips, posts.text, posts.date, users.username, users.name, users.image_url, posts.customer_id, posts.id
    FROM posts
    JOIN users ON posts.customer_id = users.id
    WHERE posts.id=${postid}
  `
    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the post.');
  }
  
}

export async function fetchTokens(userid: string) {
  try {
    const tokenCountPromise = sql`SELECT users.tokens FROM users WHERE id=${userid}`
    const data = await Promise.all([tokenCountPromise]);
    const tokenCount = Number(data[0].rows[0].tokens ?? '0');
    return tokenCount;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  if(query === "") {
    return;
  }
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        users.username,
        users.id,
        users.image_url
      FROM users
      WHERE
        users.username ILIKE ${`%${query}%`} 
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM users
    WHERE
      users.username ILIKE ${`%${query}%`} OR
      users.name ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchProfile(id : string) {
  try {
    const data = await sql<ProfileField>`
    SELECT
      username,
      image_url,
      bio
    FROM users
    WHERE id = ${id}
    `
    const profile = data.rows[0];
    return profile;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch profile.');
  }
}

export async function fetchFollowers(id : string) {
  try {
    const data = await sql<FormattedFollowersTable>`
    SELECT *
    FROM users u
    JOIN following f ON u.id = f.follower
    WHERE f.followed = ${id};
    `
    
    const followers = data.rows;
    return followers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch profile.');
  }
}

export async function fetchFollowersCount(id : string) {
  try {
    const data = await sql`
    SELECT COUNT(*) AS count_of_value
    FROM following
    WHERE followed = ${id};
    `
    
    const profile = data.rows[0];
    return profile;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch profile.');
  }
}

export async function isFriend(followerId : string, followedId: string) {
  try {
    const data = await sql<ProfileField>`
    SELECT * FROM following WHERE follower = ${followerId} AND followed = ${followedId}
    `
    return data;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch followings.');
  }
}


export async function getCurrentUser() {

  const session = await auth();
  if (!session?.user) return null

  try {
    const data = await sql`
    SELECT 
      users.username,
      users.name,
      users.image_url,
      users.tokens,
      users.bio
    FROM users
    WHERE id = ${session.user.id}`;

    const user = {
      username: data.rows[0].username,
      name: data.rows[0].name,
      image_url: data.rows[0].image_url,
      tokens: data.rows[0].tokens,
      bio: data.rows[0].bio
    }

    return user;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
 
}

export async function fetchComments(postid:string) {
  try {
    const {rows, fields} = await sql<FormattedComments>`
      SELECT 
          comments.id AS comment_id, 
          comments.post_id, 
          comments.text, 
          comments.date, 
          comments.commenter_id, 
          users.id AS user_id, 
          users.username,
          users.image_url 
      FROM 
          comments
      JOIN 
          users ON comments.commenter_id = users.id
      WHERE 
          comments.post_id = ${postid}
      ORDER BY 
          comments.date DESC;
    `;

    return rows;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error(`Failed to fetch comments for post ${postid}`);
  }
}

export async function fetchNotifications(userid:string) {
  try {
    const {rows, fields} = await sql<Notification>`
      SELECT *
      FROM notifications
      WHERE rec_userid= ${userid}
      ORDER BY date DESC;    
    `;


    sql`
      UPDATE notifications
      SET seen = true
      WHERE rec_userid=${userid}
    `

    return rows;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error(`Failed to fetch notifications for user ${userid}`);
  }
}

export async function fetchNumberOfNewNotifications(userid:string) {
  try {
    const {rows, fields} = await sql`
      SELECT COUNT(*) FROM notifications WHERE rec_userid=${userid} AND seen=false
    `
    return rows;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error(`Failed to fetch new notifications for user ${userid}`)
  }
}

export async function fetchRecommendations(userid:string) {
  try {
    const {rows, fields} = await sql`
    WITH user_following AS (
      SELECT
          f.followed AS following
      FROM
          following f
      WHERE
          f.follower = ${userid}
    ),
    followers_of_following AS (
      SELECT
          f2.followed AS recommended_user,
          COUNT(*) AS follow_count
      FROM
          user_following uf
      JOIN following f2 ON uf.following = f2.follower
      WHERE
          f2.followed <> ${userid}
      GROUP BY
          f2.followed
    ),
    already_followed AS (
      SELECT
          f.followed
      FROM
          following f
      WHERE
          f.follower = ${userid}
    )
    SELECT
      fof.recommended_user,
      u.id,
      u.name,
      u.username,
      u.image_url,
      fof.follow_count
    FROM
      followers_of_following fof
    LEFT JOIN already_followed af ON fof.recommended_user = af.followed
    JOIN
      users u ON fof.recommended_user = u.id
    WHERE
      af.followed IS NULL
    ORDER BY
      fof.follow_count DESC
    LIMIT 5;       
    `
    console.log(rows);
    return rows;
  } catch(err) {
    console.error('Database Error:', err);
    throw new Error(`Failed to fetch notifications for user ${userid}`);
  } 
}