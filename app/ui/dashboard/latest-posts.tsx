import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestPosts } from '@/app/lib/data';
import LikeButton from './like-button';
import { auth } from "@/auth";
import Link from 'next/link';

export default async function LatestPosts({ mode, id }:{ mode:string, id:string }) {
  const session = await auth();

  if (!session?.user) return null
  
  const latestPosts = await fetchLatestPosts(mode, session.user?.id!, id);


  return (
    <div className="flex w-full flex-col md:col-span-8">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Post
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {latestPosts.map((post, i) => {
            return (
              <div>
                <div
                  key={post.id}
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <Image
                      src={post.image_url}
                      alt={`${post.name}'s profile picture`}
                      className="mr-4 rounded-full"
                      width={32}
                      height={32}
                    />
                    <div className="min-w-0">
                      <Link href={`/dashboard/friends/${post.customer_id}`} className="truncate text-sm font-semibold md:text-base">
                        {post.name}
                      </Link>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {post.email}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                  >
                    {post.tips}
                  </p>
                </div>
                <div>
                  <p className={`${lusitana.className} text-sm font-medium md:text-base`}>
                    {post.text}
                  </p>
                </div>
                <LikeButton id={post.id} tips={post.tips} userid={session.user?.id}/>

              </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
}
