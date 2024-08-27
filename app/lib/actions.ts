"use server";
import { auth } from "@/auth";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { User } from "@/app/lib/definitions";
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function signupUser(previousState : string | undefined, formData : FormData) {
  try {
    const passwordEntered = formData.get("password");
    const passwordVerifyEntered = formData.get("verify-password");
    if(passwordEntered !== passwordVerifyEntered) {
      return "Password verification failed";
    }
    const password = await bcrypt.hash(formData.get("password")?.toString()!, 10);
    const username = formData.get("username")?.toString();
    const name = formData.get("name")?.toString();
    const email = formData.get("email")?.toString();
    const image_url = "/customers/default.png";
    const tokens = 20;

    const emailCheck = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if(emailCheck.rows.length > 0) {
      return "Email is already in use";
    }

    const usernameCheck = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;

    if(usernameCheck.rows.length > 0) {
      return "Username is already in use";
    }

    await sql`
      INSERT INTO users (username, name, email, password, image_url, tokens)
      VALUES (${username}, ${name}, ${email}, ${password}, ${image_url}, ${tokens})
    `;

    redirect("/login");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function getUser(id: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function changePassword(id:string, previousPassword:string, newPassword:string) {
  const password = await bcrypt.hash(previousPassword, 10);
  const setPassword = await bcrypt.hash(newPassword, 10);
  const user = await getUser(id);
  const passwordsMatched = bcrypt.compare(password, user!.password);
  if(!passwordsMatched) {
    return;
  }
  await sql`
    UPDATE users
    SET password=${setPassword}
    WHERE id=${id}
  `;

  revalidatePath("/home/settings");
}

export async function likePost(postid: string, tips: number, userid: string, posterid: string) {
  const date = new Date().toISOString();

  const tokens = await sql`
    SELECT tokens FROM users WHERE id = ${userid} 
  `

  if(tokens.rows[0].tokens === 0) {
    return;
  }
  
  await sql`
    UPDATE posts
    SET tips = ${tips}
    WHERE id = ${postid}
  `;

  await sql`
    INSERT INTO tips (postid, userid, amount, date)
    VALUES (${postid}, ${userid}, ${1}, ${date})
    ON CONFLICT (postid, userid) DO UPDATE SET amount = tips.amount + 1;
  `;

  if(tips % 2 === 0 && userid !== posterid) {
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

  createTipNotification(posterid, userid, postid);

  revalidatePath("/home");
}

export async function followProfile(id: string, userid: string) {
  await sql`
    INSERT INTO following (followed, follower)
    VALUES (${id}, ${userid})
  `;

  createNotification(id, userid, "follow", null);

  revalidatePath("/home");
}

export async function unfollowProfile(id: string, userid: string) {
  await sql`
  DELETE FROM following 
  WHERE follower=${userid} and followed=${id}
  `;

  revalidatePath("/home");
}

export async function updateImageUrl(image_url: string) {

  const session = await auth();
  if (!session?.user) {
    return null;
  }

  await sql`
    UPDATE users
    SET image_url= ${image_url}
    WHERE id= ${session.user.id}
  `;

  revalidatePath("/home");
}

export async function updateProfileInformation(id:string, username:string, name:string, bio:string) {

  await sql`
    UPDATE users
    SET username= ${username}, bio= ${bio}, name=${name}
    WHERE id= ${id}
  `;

  revalidatePath("/home");
}

export async function createNewPost(text:string) {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  const date = new Date().toISOString();

  await sql`
    INSERT INTO posts (customer_id, tips, text, date)
    VALUES (${session.user.id}, ${0}, ${text}, ${date})
  `;

  revalidatePath("/home");
}

export async function deletePost(postid:string) {
  await sql`DELETE FROM posts WHERE id=${postid}`;
  revalidatePath("/home");
}

export async function createNewComment(postid:string, userid:string, comment:string, posterid:string) {
    const date = new Date().toISOString().split("T")[0];
    await sql`
    INSERT INTO comments (post_id, commenter_id, text, date)
    VALUES (${postid}, ${userid}, ${comment}, ${date})
    `;

    createNotification(posterid, userid, "comment", postid);
    revalidatePath("/home");
}

export async function createTipNotification(rec_userid:string, send_userid:string, postid:string) {
  const data = await sql`
      SELECT * FROM notifications 
      WHERE rec_userid = ${rec_userid} AND send_userid = ${send_userid} AND postid = ${postid} AND type=${`tip`}
  `;

  if(data.rows.length > 0) {
    return;
  }

  createNotification(rec_userid, send_userid, "tip", postid);
}

export async function createNotification(rec_userid:string, send_userid:string, type:string, postid:string | null) {
  if(rec_userid === send_userid) {
    // don't allow users to get notifications from themselves
    return;
  }
  const date = new Date().toISOString();
  const test = await sql`
    INSERT INTO notifications
    (rec_userid, send_userid, seen, type, postid, date)
    VALUES (${rec_userid}, ${send_userid}, ${false}, ${type}, ${postid}, ${date});
  `;
}

export async function createFeedback(name:string, email:string, message:string) {
  const date = new Date().toISOString();
  await sql`
    INSERT INTO feedback
    (name, email, message, date)
    VALUES (${name}, ${email}, ${message}, ${date});
  `
}

export async function redeemTokens(userid:string) {
  await sql`
    UPDATE users
    SET redeem=false, tokens=tokens+15
    WHERE id=${userid}
  `
}
