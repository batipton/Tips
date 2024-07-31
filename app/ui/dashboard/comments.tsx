import { fetchComments, fetchProfile } from "@/app/lib/data";
import { FormattedComments } from '@/app/lib/definitions';
import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default function Comments({comments}:{comments:FormattedComments[]}) {
    return (
        <div>
            {comments.map((comment, i) => {
                return <Comment comment={comment} key={i} />;
            })}
        </div>
    )
}

function Comment({comment, key}:{comment:FormattedComments, key:number}) {

    return (
        <div key={key}>
            <div className="flex items-center">
                <img
                      src={comment.image_url}
                      alt={`${comment.username}'s profile picture`}
                      className="mr-4 h-8 w-8 rounded-full"

                    />
                <Link href={`/home/friends/${comment.user_id}`} className="truncate text-sm font-semibold md:text-base">
                    {comment.username}
                </Link>
            </div>
            <div>
                <p className={`${lusitana.className} text-sm font-medium md:text-base`}>
                        {comment.text}
                </p>
            </div>
        </div>
    );
}