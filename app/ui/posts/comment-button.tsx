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
    bgcolor: "background.paper",
    borderRadius: 4,
    boxShadow: 24,
    p: 4,
};

export default function CommentButton({comments, postid, userid, posterid}:{comments:FormattedComments[], postid:string, userid:string, posterid:string}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    return (
        <div className="flex flex-row mt-2 mb-2 mr-2">
            <button type="button" title="see comments" className="text-green-500 bg-transparent font-medium rounded-lg text-sm py-1 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-700" 
            onClick={handleOpen}>
                <ChatBubbleOvalLeftIcon className="w-7 text-green-500"  />
            </button>
            <p className="px-1 mb-2 mt-2">{comments.length}</p>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style} >
                    <div className="overflow-auto max-w-full max-h-80">
                        <Comments comments={comments}/>
                        <CommentForm postid={postid} userid={userid} posterid={posterid} />
                    </div>
                </Box>
            </Modal>
        </div>
    );
}