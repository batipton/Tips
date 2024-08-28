import { ForgotPasswordTemplate } from "@/app/ui/email/forgot-password-template";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";
import { v4 } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function getUserByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
      return user.rows[0];
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw new Error("Failed to fetch user.");
    }
  }

export async function POST(req: NextRequest) {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
        return {
          error: "Invalid email",
        }
    }
    
    const user = await getUserByEmail(email);
    
    if (!user) {
        return {
          error: "This email is not registered",
        }
    }

    const token = v4();

    await sql`INSERT INTO resetTokens (id, userid) VALUES (${token}, ${user.id})`;


    try {
        const { data, error } = await resend.emails.send({
        from: "Tips <test@tipseco.com>",
        to: `${email}`,
        subject: "Hello world",
        react: ForgotPasswordTemplate({ text: `Hello ${user.name}, someone (hopefully you) requested a password reset for this account. If you did want to reset your password, please click here: https://tipseco.com/password-reset/${token}` }),
        });

        if (error) {
            console.error(error);
            return Response.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return Response.json({ error }, { status: 500 });
    }
}