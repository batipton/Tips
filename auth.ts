import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { sql } from './app/lib/db';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: Record<string, any>): Promise<User | null> {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(user);
          if (passwordsMatch) return user;
        }

        console.log('Invalid credentials');
        return null;

      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user = token.user;
			return session;
		},
  }
});

