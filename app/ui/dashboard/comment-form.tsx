'use client';
import { useState } from 'react';
import { createNewComment } from "@/app/lib/actions"


export default function CommentForm({postid, userid}:{postid:string, userid:string}) {
    
    function comment(formData:FormData) {
        const comment = formData.get("comment")?.toString();
        if(comment != null) {
            createNewComment(postid, userid, comment);
        }
    }

    return (
        <>
            <div className="bg-white">
                <form action={comment}>
                    <div className="mb-2">
                    <textarea
                        className="w-full px-0 py-2 mt-2 border-none rounded-md resize-none focus:outline-none"
                        name="comment"
                        placeholder="Comment on this post"
                        rows={1}
                    />
                    </div>
                    <button
                    type="submit"
                    className="px-4 py-2 mb-2 bg-green-500 hover:bg-green-400 text-white rounded-md"
                    >
                    Comment
                    </button>
                </form> 
            </div>
        </>
    )
}