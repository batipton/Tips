'use client';

import clsx from "clsx";
import Image from "next/image";
import { getCurrentUser, fetchComments, fetchPost } from "@/app/lib/data";
import LikeButton from "@/app/ui/posts/like-button";
import CommentButton from "@/app/ui/posts/comment-button";

import { auth } from "@/auth";
import PostSettings from "@/app/ui/posts/post-settings";
import Link from "next/link";
import TimeAgo from "javascript-time-ago"
import en from "javascript-time-ago/locale/en"
const HtmlToReactParser = require("html-to-react").Parser;
TimeAgo.addDefaultLocale(en)

type PostProps = {
  post: {
    id: string;
    tips: number;
    text: string;
    date: string;
    username: string;
    name: string;
    image_url: string;
    customer_id: string;
  };
  userid: string;
  comments: any[]; // TODO: Add type here
}

export default function Post({ post, userid, comments }: PostProps) {
  // This outputs the formatted time ago from the time 
  // the post was created like "3 hours ago" 
  const timeAgo = new TimeAgo("en-US");
  const time = timeAgo.format(new Date(post.date))

  // This converts the HTML string from the post text into React elements
  const htmlToReactParser = new HtmlToReactParser();
  const reactElement = htmlToReactParser.parse(post.text);

  return (
    <div key={post.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4 last:border-b-0 last:mb-0 transition-colors duration-300">
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
                    <Link href={`/home/followers/${post.customer_id}`} className="truncate text-sm font-semibold md:text-base text-gray-900 dark:text-gray-100 hover:underline transition-colors duration-200">
                      {post.name} 
                    </Link>
                    <Link href={`/home/followers/${post.customer_id}`} className="truncate text-sm md:text-base text-gray-700 dark:text-gray-300 transition-colors duration-200">
                      {` $${post.username}`}
                    </Link>
                  </p>
                  <p className="hidden text-sm text-gray-500 dark:text-gray-400 sm:block transition-colors duration-200">
                    {time}
                  </p>
                </div>
              </div>
              <PostSettings userid={userid} posterid={post.customer_id} postid={post.id} />
            </div>
            <div className="break-words whitespace-normal overflow-auto max-w-full max-h-80 text-gray-900 dark:text-gray-100 transition-colors duration-200">
              {reactElement}
            </div>
            <div className="flex">
              <LikeButton initialTips={post.tips} id={post.id} userid={userid} posterid={post.customer_id!} />
              <CommentButton comments={comments} postid={post.id} userid={userid} posterid={post.customer_id} />    
            </div>
          </div>
    )
}