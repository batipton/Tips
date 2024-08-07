import React from "react";
import { fetchProfile, isFriend, fetchFollowers, fetchFollowersCount } from "@/app/lib/data";
import LatestPosts from "@/app/ui/posts/latest-posts";
import FollowToUnlock from "@/app/ui/posts/follow-to-unlock";
import { lusitana } from "@/app/ui/general/fonts";
import { auth } from "@/auth";
import FollowerModal  from "@/app/ui/followers/follower-information";
import FollowButton from "@/app/ui/followers/follow-button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    
    if (!session?.user) {
      return null;
    }

    const user = session?.user;
    const id = params.id;

    if(id === user.id) {
      redirect("/home/profile");
    }

    const profilePromise = await Promise.all([fetchProfile(id)]);
    const profile = profilePromise[0];
    const bio = profile.bio;

    const friend = await Promise.all([isFriend("" + user.id, id)]);
    const following = friend[0].rows.length !== 0;

    const followerCountPromise = await Promise.all([fetchFollowersCount(id)]);
    const followerCount = followerCountPromise[0].count_of_value;

    const followersPromise = await Promise.all([fetchFollowers(id)]);
    const followers = followersPromise[0];
    

    let latestPosts: JSX.Element;
    if(following) {    
      latestPosts = (await LatestPosts({mode:"follower", id:id}))!;
    } else {
      latestPosts = (await FollowToUnlock())!;
    }

  return (
    <div>
      <div>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Profile Information
        </h1>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <div className="w-full">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <Image  
                src={profile.image_url} 
                width={100} 
                height={100}
                alt={`${profile.username}'s profile picture`}
                className="rounded-full aspect-square object-cover"
              />
              <h1 className={`${lusitana.className} text-2xl font-bold text-gray-900 mt-4`}>{profile.username}</h1>
              <FollowerModal followers={followers} followerCount={followerCount} />
              <p className={`${lusitana.className}`}>{bio}</p>
              <FollowButton isFollowing={following} id={id} userid={user.id || ""} />
            </div>
          </div>
        </div>
      </div>
      {latestPosts}
    </div>
  );
}