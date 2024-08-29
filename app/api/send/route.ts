import { ForgotPasswordTemplate } from "@/app/ui/email/forgot-password-template";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { User } from "@/app/lib/definitions";
import { v4 } from "uuid";

const resend = new Resend(process.env.RESEND_API_KEY);

async function getUserByEmail(email: string): Promise<User | undefined> {
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

    console.log(email);

    if (!email || typeof email !== "string") {
        return Response.json({message:"This is not a valid email"},{status:500});
    }
    
    const user = await getUserByEmail(email);
    
    if (!user) {
        return Response.json({message:"This email is not registered"},{status:500});
    }

    const token = v4();

    const date = new Date().toISOString();

    await sql`INSERT INTO resetTokens (id, userid, date) VALUES (${token}, ${user.id}, ${date})`;


    try {
        const { data, error } = await resend.emails.send({
        from: "Tips <support@tipseco.com>",
        to: `${email}`,
        subject: "Reset Password",
        react: ForgotPasswordTemplate(
          { 
            name: `${user.name}`,
            link: `https://tipseco.com/login/recover/${token}`
          }),
        });

        if (error) {
            return Response.json({ error }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}