"use client";
import { useState } from "react";
import { createNewComment } from "@/app/lib/actions"


export default function CommentForm({postid, userid, posterid}:{postid:string, userid:string, posterid:string}) {
    
    function comment(formData:FormData) {
        const comment = formData.get("comment")?.toString();
        if(comment!=null && comment.trim().length !== 0) {
            createNewComment(postid, userid, comment, posterid);
        }
    }

    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <form action={comment}>
                <div className="mb-3">
                <textarea
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md resize-none focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    name="comment"
                    placeholder="Comment on this post"
                    rows={2}
                />
                </div>
                <button
                type="submit"
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                >
                Comment
                </button>
            </form> 
        </div>
    )
}