import { auth } from "@/auth";
import { lusitana } from "@/app/ui/general/fonts";
import { fetchProfile, fetchFollowers, fetchFollowersCount } from "@/app/lib/data";
import LatestPosts from "@/app/ui/posts/latest-posts";
import FollowerModal  from "@/app/ui/followers/follower-information";
import Image from "next/image";

export default async function Page() {
    const session = await auth();

    if (!session?.user) {
      return null;
    } 

    const id = session.user.id!;

    const profilePromise = await Promise.all([fetchProfile(id)]);
    const profile = profilePromise[0];
    const bio = profile.bio;

    const followerCountPromise = await Promise.all([fetchFollowersCount(id)]);
    const followerCount = followerCountPromise[0].count_of_value;

    const followersPromise = await Promise.all([fetchFollowers(id)]);
    const followers = followersPromise[0];

    const latestPosts: JSX.Element = (await LatestPosts({mode:"user", id:""}))!;

    return (
        <div>
          <div>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
                Profile Information
            </h1>
            <div className="rounded-xl bg-gray-50 dark:bg-gray-900 p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <div className="w-full">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center border border-gray-200 dark:border-gray-700 transition-colors duration-300">
                  <Image 
                    src={profile.image_url} 
                    width={100} height={100}
                    quality={100}
                    alt={`${profile.username}'s profile picture`}
                    className="rounded-full aspect-square object-cover border-4 border-gray-200 dark:border-gray-600 transition-colors duration-200"
                  />
                  <h1 className={`${lusitana.className} text-2xl font-bold text-gray-900 dark:text-gray-100 mt-4 transition-colors duration-200`}>{profile.username}</h1>
                  <FollowerModal followers={followers} followerCount={followerCount} />
                  <p className={`${lusitana.className} text-gray-700 dark:text-gray-300 text-center mt-2 transition-colors duration-200`}>{bio}</p>
                </div>
              </div>
            </div>
          </div>
          {latestPosts}
        </div>
      );
}