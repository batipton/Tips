'use server';

import { auth } from "@/auth"
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
 
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
    const { customerId, amount, status } = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
// ...
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
 
  const amountInCents = amount * 100;
 
  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
 
// ...
 
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
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const image_url = 'evil-rabbit.png';
    const tokens = 50;

    const data = await sql`
      SELECT * FROM users WHERE email = ${email}
    `

    if(data.rows.length > 0) {
      return;
    }

    await sql`
      INSERT INTO users (name, email, password, image_url, tokens)
      VALUES (${name}, ${email}, ${password}, ${image_url}, ${tokens})
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

export async function likePost(id: string, tips: number, userid: string) {
  await sql`
    UPDATE posts
    SET tips = ${tips}
    WHERE id = ${id}
  `;

  if(tips % 2 == 0) {
    await sql`
      UPDATE users
      SET tokens = tokens+1
      WHERE id = ${id}
    `;
  }

  await sql`
  UPDATE users
  SET tokens = tokens-1
  WHERE id = ${userid}
  AND tokens > 0
  `;

  revalidatePath('/dashboard');
}

export async function followProfile(id: string, userid: string) {
  await sql`
  INSERT INTO following (followed, follower)
  VALUES (${id}, ${userid})
  `;

  revalidatePath('/dashboard');
}

export async function unfollowProfile(id: string, userid: string) {
  await sql`
  DELETE FROM following 
  WHERE follower=${userid} and followed=${id}
  `;

  revalidatePath('/dashboard');
}

export async function updateImageUrl(image_url: string) {

  const session = await auth();
  if (!session?.user) return null

  await sql`
  UPDATE users
  SET image_url= ${image_url}
  WHERE id= ${session.user.id}
  `

  revalidatePath('/dashboard');
}

export async function updateProfileInformation(username:string) {
  const session = await auth();
  if (!session?.user) return null

  await sql`
  UPDATE users
  SET name= ${username}
  WHERE id= ${session.user.id}
  `

  revalidatePath('/dashboard');
}
