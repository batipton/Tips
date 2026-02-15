"use server";
import { auth } from "@/auth";
import { z } from "zod";
import { sql } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { User } from "@/app/lib/definitions";
 

export async function setTheme(darkMode:boolean) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  await sql`
    UPDATE users 
    SET darkmode=${darkMode}
    WHERE id=${session.user.id}
  `;
}

