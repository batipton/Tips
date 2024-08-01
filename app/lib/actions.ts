'use server';

import { auth } from "@/auth"
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function signupUser(formData : FormData) {
  try {
    const password = await bcrypt.hash(formData.get('password')?.toString()!, 10);
    const username = formData.get('username')?.toString();
    const email = formData.get('email')?.toString();
    const image_url = '/customers/default.png';
    const tokens = 20;

    const data = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if(data.rows.length > 0) {
      return;
    }

    await sql`
      INSERT INTO users (username, email, password, image_url, tokens)
      VALUES (${username}, ${email}, ${password}, ${image_url}, ${tokens})
    `

    redirect('/login');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function likePost(postid: string, tips: number, userid: string, posterid: string) {
  const date = new Date().toISOString();
  
  await sql`
    UPDATE posts
    SET tips = ${tips}
    WHERE id = ${postid}
  `;

  await sql`
    INSERT INTO tips (postid, userid, amount, date)
    VALUES (${postid}, ${userid}, ${1}, ${date})
    ON CONFLICT (postid, userid) DO UPDATE SET amount = tips.amount + 1;
  `

  if(tips % 2 == 0 && userid != posterid) {
    await sql`
      UPDATE users
      SET tokens = tokens+1
      WHERE id = ${posterid}
    `;
  }

  await sql`
    UPDATE users
    SET tokens = tokens-1
    WHERE id = ${userid}
    AND tokens > 0
  `;

  revalidatePath('/home');
}

export async function followProfile(id: string, userid: string) {
  await sql`
  INSERT INTO following (followed, follower)
  VALUES (${id}, ${userid})
  `;

  revalidatePath('/home');
}

export async function unfollowProfile(id: string, userid: string) {
  await sql`
  DELETE FROM following 
  WHERE follower=${userid} and followed=${id}
  `;

  revalidatePath('/home');
}

export async function updateImageUrl(image_url: string) {

  const session = await auth();
  if (!session?.user) return null

  await sql`
    UPDATE users
    SET image_url= ${image_url}
    WHERE id= ${session.user.id}
  `

  revalidatePath('/home');
}

export async function updateProfileInformation(id:string, username:string, name:string, bio:string) {

  await sql`
    UPDATE users
    SET username= ${username}, bio= ${bio}, name=${name}
    WHERE id= ${id}
  `

  revalidatePath('/home');
}

export async function createNewPost(text:string) {
  const session = await auth();
  if (!session?.user) return null

  const date = new Date().toISOString();

  await sql`
    INSERT INTO posts (customer_id, tips, text, date)
    VALUES (${session.user.id}, ${0}, ${text}, ${date})
  `

  revalidatePath('/home');
}

export async function deletePost(postid:string) {
  await sql`
  DELETE FROM posts WHERE id=${postid}`

  revalidatePath('/home');
}

export async function createNewComment(postid:string, userid:string, comment:string) {
    const date = new Date().toISOString().split('T')[0];
    await sql`
    INSERT INTO comments (post_id, commenter_id, text, date)
    VALUES (${postid}, ${userid}, ${comment}, ${date})
    `
    revalidatePath('/home');
}


