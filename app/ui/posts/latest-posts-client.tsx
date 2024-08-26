"use client";
import { LatestPost } from "@/app/lib/definitions";
import clsx from "clsx";
import Image from "next/image";
import { lusitana } from "@/app/ui/general/fonts";
import { fetchLatestPosts, getCurrentUser, fetchComments } from "@/app/lib/data";
import LikeButton from "@/app/ui/posts/like-button";
import CommentButton from "@/app/ui/posts/comment-button";
import { auth } from "@/auth";
import Comments  from "@/app/ui/posts/comments";
import CommentForm  from "@/app/ui/posts/comment-form";
import PostSettings from "@/app/ui/posts/post-settings";
import Link from "next/link";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Post from "@/app/ui/posts/post-content";
const ReactDOMServer = require("react-dom/server");
const HtmlToReactParser = require("html-to-react").Parser;
TimeAgo.addDefaultLocale(en);

export default async function LatestPostsClient({latestPosts, userTokens}:{latestPosts:LatestPost, userTokens:number}) {
    const [tokens, setTokens] = React.useState(userTokens);
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            <div className="flex w-full flex-col md:col-span-8">
                <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
                    <div className="bg-white px-6">
                        {latestPosts.map(async (post, i) => {
                            return <Post id={post.id} onTip={()=>setTokens(tokens-1)} />;    
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
