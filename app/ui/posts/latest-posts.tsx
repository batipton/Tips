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
import Post from '@/app/ui/posts/post-content'
const ReactDOMServer = require('react-dom/server');
const HtmlToReactParser = require('html-to-react').Parser;
TimeAgo.addDefaultLocale(en);

export default async function LatestPosts({ mode, id }:{ mode:string, id:string }) {
  const session = await auth();

  if (!session?.user) return null;
  
  const latestPosts = await fetchLatestPosts(mode, session.user?.id!, id);
  const userid = session.user?.id!;

  const user = await getCurrentUser();

  // const timeAgo = new TimeAgo('en-US');

  if(latestPosts.length == 0) {
    return (
      <div className="w-full text-center mt-4">
        <p>Uh Oh... No Posts Here!</p>
      </div>
    )
  }

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <div className="flex w-full flex-col md:col-span-8">
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
          {/* NOTE: comment in this code when you get to this point in the course */}
          <div className="bg-white px-6">
            {latestPosts.map(async (post, i) => {
              return <Post id={post.id} />        
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
