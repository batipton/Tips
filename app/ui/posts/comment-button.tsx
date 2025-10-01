"use client";
import React from "react";
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { FormattedComments } from "@/app/lib/definitions"
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Comments  from "@/app/ui/posts/comments";
import CommentForm  from "@/app/ui/posts/comment-form";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "transparent",
    borderRadius: 4,
    boxShadow: 24,
    p: 0,
};

export default function CommentButton({comments, postid, userid, posterid}:{comments:FormattedComments[], postid:string, userid:string, posterid:string}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div className="flex flex-row mt-2 mb-2 mr-2">
            <button type="button" title="see comments" className="text-green-500 dark:text-green-400 bg-transparent hover:bg-green-50 dark:hover:bg-gray-700 font-medium rounded-lg text-sm py-1 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200" 
            onClick={handleOpen}>
                <ChatBubbleOvalLeftIcon className="w-7 text-green-500 dark:text-green-400"  />
            </button>
            <p className="px-1 mb-2 mt-2 text-gray-900 dark:text-gray-100 transition-colors duration-200">{comments.length}</p>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style} >
                    <div className="overflow-auto max-w-full max-h-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 transition-colors duration-300">
                        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Comments</h3>
                        <Comments comments={comments}/>
                        <CommentForm postid={postid} userid={userid} posterid={posterid} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}