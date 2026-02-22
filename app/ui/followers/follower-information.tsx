"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import { FormattedFollowersTable } from "@/app/lib/definitions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "transparent",
  border: "none",
  boxShadow: 0,
  p: 0,
};

type FollowerModalProps = {
    followers: FormattedFollowersTable[];
    followerCount: number;
}

export default function FollowerModal({followers, followerCount}: FollowerModalProps) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    return (
        <div>
          <Button 
            onClick={handleOpen}
            className="text-green-500 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300 transition-colors duration-200"
          >
            {followerCount} Followers
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-300">
                    <div className="flex mb-4">
                        <div className="w-full">
                            <h1 className="text-center text-xl font-semibold text-gray-900 dark:text-gray-100 transition-colors duration-200">Followers</h1>
                        </div>
                    </div>

                    {followers.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-gray-500 dark:text-gray-400">No followers yet</p>
                        </div>
                    ) : (
                        <div className="max-h-64 overflow-y-auto">
                            <div className="space-y-2">
                                {followers?.map((follower) => (
                                    <Link 
                                        key={follower.id}
                                        href={`/home/followers/${follower.follower}`} 
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 border border-transparent hover:border-green-200 dark:hover:border-green-800"
                                    >
                                        <img 
                                            src={follower.image_url} 
                                            className="rounded-full h-10 w-10 border-2 border-gray-200 dark:border-gray-600 transition-colors duration-200" 
                                            alt={`${follower.username}'s profile`}
                                        />
                                        <span className="text-gray-900 dark:text-gray-100 font-medium transition-colors duration-200">{follower.username}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </Box>
          </Modal>
        </div>
      );
}