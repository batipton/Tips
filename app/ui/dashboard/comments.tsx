import { fetchComments, fetchProfile } from "@/app/lib/data"
import Image from 'next/image';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';

export default async function Comments({postid}:{postid:string}) {
    const comments = await fetchComments(postid)
    return (
        <div>
            {comments.map((comment, i) => {
                return <Comment text={comment.text} commenter_id={comment.commenter_id} key={i} />;
            })}
        </div>
    )
}

async function Comment({text, commenter_id, key}:{text:string, commenter_id:string, key:number}) {
    const commenter = await fetchProfile(commenter_id);

    return (
        <div key={key}>
            <div className="flex items-center">
                <img
                      src={commenter.image_url}
                      alt={`${commenter.name}'s profile picture`}
                      className="mr-4 h-8 w-8 rounded-full"

                    />
                <Link href={`/home/friends/${commenter_id}`} className="truncate text-sm font-semibold md:text-base">
                    {commenter.name}
                </Link>
            </div>
            <div>
                <p className={`${lusitana.className} text-sm font-medium md:text-base`}>
                        {text}
                </p>
            </div>
        </div>
    );
}