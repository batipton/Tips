import React from 'react';
import { fetchProfile, isFriend, fetchFollowers, fetchFollowersCount } from '@/app/lib/data';
import LatestPosts from '@/app/ui/posts/latest-posts';
import { lusitana } from '@/app/ui/general/fonts';
import { auth } from "@/auth"
import FollowerModal  from '@/app/ui/followers/follower-information';
import FollowButton from '@/app/ui/followers/follow-button';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const session = await auth();
    

    if (!session?.user) return null
    const user = session?.user
    const id = params.id;

    if(id === user.id) {
      redirect('/home/profile');
    }

    const profilePromise = await Promise.all([fetchProfile(id)]);
    const profile = profilePromise[0];
    const bio = profile.bio;

    const friend = await Promise.all([isFriend("" + user.id, id)]);
    const following = friend[0].rows.length != 0;

    const followerCountPromise = await Promise.all([fetchFollowersCount(id)]);
    const followerCount = followerCountPromise[0].count_of_value;

    const followersPromise = await Promise.all([fetchFollowers(id)]);
    const followers = followersPromise[0];
    

    const latestPosts: JSX.Element = (await LatestPosts({mode:"follower", id:id}))!;


  return (
    <div>
      <div>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
            Profile Information
        </h1>
        <div className="rounded-xl bg-gray-50 p-4 shadow-sm">
          <div className="w-full">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center">
              <img 
                className="w-32 h-32 rounded-full object-cover" 
                src={profile.image_url} 
                alt={`${profile.username}'s profile picture`}
              />
              <h1 className={`${lusitana.className} text-2xl font-bold text-gray-900 mt-4`}>{profile.username}</h1>
              <FollowerModal followers={followers} followerCount={followerCount} />
              <p className={`${lusitana.className}`}>{bio}</p>
              <FollowButton isFollowing={following} id={id} userid={user.id || ""} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          {latestPosts}
      </div>
    </div>
  );
}