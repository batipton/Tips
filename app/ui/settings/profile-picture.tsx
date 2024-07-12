'use server'
import { auth } from "@/auth"
import { getCurrentUser } from "@/app/lib/data"

export default async function ProfilePicture() {
    const user = await getCurrentUser();
    console.log(user);

    return (
        <img 
            className="w-32 h-32 rounded-full object-cover" 
            src={user!.image_url}
            alt="Profile Picture" 
        />
    )
}
