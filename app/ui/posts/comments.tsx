import { fetchComments, fetchProfile } from "@/app/lib/data";
import { FormattedComments } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";

export default function Comments({comments}:{comments:FormattedComments[]}) {
    return (
        <div className="space-y-4 mb-4">
            {comments.map((comment, i) => {
                return <Comment comment={comment} key={i} />;
            })}
        </div>
    )
}

function Comment({comment, key}:{comment:FormattedComments, key:number}) {

    return (
        <div key={key} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <div className="flex items-center mb-2">
                <img
                      src={comment.image_url}
                      alt={`${comment.username}'s profile picture`}
                      className="mr-3 h-8 w-8 rounded-full border-2 border-gray-200 dark:border-gray-500 transition-colors duration-200"

                    />
                <Link href={`/home/followers/${comment.user_id}`} className="truncate text-sm font-semibold md:text-base text-gray-900 dark:text-gray-100 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                    {comment.username}
                </Link>
            </div>
            <div className="break-words whitespace-normal overflow-auto max-w-full max-h-40 ml-11">
                <p className={`${lusitana.className} text-sm font-medium md:text-base text-gray-800 dark:text-gray-200 transition-colors duration-200`}>
                        {comment.text}
                </p>
            </div>
        </div>
    );
}