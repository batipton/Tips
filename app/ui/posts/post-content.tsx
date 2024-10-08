import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/general/fonts";
import { fetchLatestPosts, getCurrentUser, fetchComments, fetchPost } from "@/app/lib/data";
import LikeButton from "@/app/ui/posts/like-button";
import CommentButton from "@/app/ui/posts/comment-button";

import { auth } from "@/auth";
import Comments  from "@/app/ui/posts/comments";
import CommentForm  from "@/app/ui/posts/comment-form";
import PostSettings from "@/app/ui/posts/post-settings";
import Link from "next/link";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;
TimeAgo.addDefaultLocale(en)

export default async function Post({id}:{id:string}) {
    const session = await auth();
    if (!session?.user) return null;
    const userid = session.user?.id!;
    const user = await getCurrentUser();

    const timeAgo = new TimeAgo("en-US");
    const post = await fetchPost(id);
    const time = timeAgo.format(new Date(post.date))
    const htmlToReactParser = new HtmlToReactParser();
    const reactElement = htmlToReactParser.parse(post.text);
    const comments = await fetchComments(post.id);

    return (
      <div key={post.id} >
              <div
                className={clsx(
                  "flex flex-row items-center justify-between py-4",
                )}
              >
                <div className="flex items-center">
                  <Image
                    src={post.image_url}
                    width={40}
                    height={40}
                    alt={`${post.username}'s profile picture`}
                    className="rounded-full aspect-square object-cover mr-4"
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
              <div className="break-words whitespace-normal overflow-auto max-w-full max-h-80">
                <p>{reactElement}</p>
              </div>
              <div className="flex">
                <LikeButton initialTips={post.tips} id={post.id!} userid={session.user?.id!} posterid={post.customer_id!} />
                <CommentButton comments={comments} postid={post.id} userid={userid} posterid={post.customer_id} />    
              </div>
            </div>
      )
}