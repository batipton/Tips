import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestPosts } from '@/app/lib/data';
import LikeButton from './like-button';
import { auth } from "@/auth";
import Link from 'next/link';

export default async function LatestPosts() {
  const latestPosts = await fetchLatestPosts();
  const session = await auth();

  if (!session?.user) return null


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
                      <p className="truncate text-sm font-semibold md:text-base">
                        {post.name}
                      </p>
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
                <Link href={`/dashboard/friends/${post.customer_id}`} className="rounded-md border p-2 hover:bg-gray-100">
                  Test Friend
                </Link>
              </div>
              
            );
          })}
        </div>
      </div>
    </div>
  );
}


{/* <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
</div> */}