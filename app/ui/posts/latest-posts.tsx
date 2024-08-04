import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/general/fonts';
import { fetchLatestPosts, getCurrentUser, fetchComments } from '@/app/lib/data';
import LikeButton from '@/app/ui/posts/like-button';
import CommentButton from '@/app/ui/posts/comment-button';
import { auth } from "@/auth";
import Comments  from '@/app/ui/posts/comments';
import CommentForm  from '@/app/ui/posts/comment-form';
import PostSettings from '@/app/ui/posts/post-settings';
import Link from 'next/link';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
const ReactDOMServer = require('react-dom/server');
const HtmlToReactParser = require('html-to-react').Parser;
TimeAgo.addDefaultLocale(en)

export default async function LatestPosts({ mode, id }:{ mode:string, id:string }) {
  const session = await auth();

  if (!session?.user) return null;
  
  const latestPosts = await fetchLatestPosts(mode, session.user?.id!, id);
  const userid = session.user?.id!;

  const user = await getCurrentUser();

  const timeAgo = new TimeAgo('en-US');

  return (
    <div className="flex w-full flex-col md:col-span-8">
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}
        <div className="bg-white px-6">
          {latestPosts.map(async (post, i) => {
            console.log(post);
            const time = timeAgo.format(new Date(post.date))
            const htmlToReactParser = new HtmlToReactParser();
            const reactElement = htmlToReactParser.parse(post.text);
            const comments = await fetchComments(post.id);
            return (
              <div key={post.id} >
                <div
                  className={clsx(
                    'flex flex-row items-center justify-between py-4',
                    {
                      'border-t': i !== 0,
                    },
                  )}
                >
                  <div className="flex items-center">
                    <img
                      src={post.image_url}
                      alt={`${post.username}'s profile picture`}
                      className="mr-4 h-10 w-10 rounded-full"

                    />
                    <div className="min-w-0">
                      <p>
                        <Link href={`/home/followers/${post.customer_id}`} className="truncate text-sm font-semibold md:text-base hover:underline">
                          {post.name} 
                        </Link>
                        <Link href={`/home/followers/${post.customer_id}`} className="truncate text-sm md:text-base">
                          {` $${post.username}`}
                        </Link>
                      </p>
                      <p className="hidden text-sm text-gray-500 sm:block">
                        {time}
                      </p>
                    </div>
                  </div>
                  <PostSettings userid={userid} posterid={post.customer_id} postid={post.id} />
                </div>
                <div>
                  {reactElement}
                </div>
                <div className="flex">
                  <LikeButton id={post.id} tips={post.tips} userid={session.user?.id} posterid={post.customer_id} tokens={user!.tokens}/>
                  <CommentButton comments={comments} postid={post.id} userid={userid} posterid={post.customer_id} />    
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
