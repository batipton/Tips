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
TimeAgo.addDefaultLocale(en);

export default async function Post({post, userid, key, tokens}:{post:LatestPosts, userid:string, key:number, tokens:number}) {
    const timeAgo = new TimeAgo('en-US');
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
                        'border-t': key !== 0,
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
                    <LikeButton id={post.id} tips={post.tips} userid={userid} posterid={post.customer_id} tokens={tokens}/>
                    <CommentButton comments={comments} postid={post.id} userid={userid} posterid={post.customer_id} />    
                  </div>
                </div>
    );
}