"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";
import QueryResultRow from "@vercel/postgres";
import { FormattedFollowersTable } from "@/app/lib/definitions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FollowerModal({followers, followerCount}:{followers:FormattedFollowersTable[], followerCount:number}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);




    return (
        <div>
          <Button onClick={handleOpen}>{followerCount} Followers</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
                <div className="flex">
                    <div className="w-full">
                        <h1 className="text-center">Followers</h1>
                    </div>
                </div>

                <table className="min-w-full text-gray-900 md:table">
                    <tbody className="bg-white">
                    {followers?.map((follower) => (
                        <tr
                        key={follower.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3 hover:bg-sky-100 hover:text-green-500">
                            <Link href={`/home/followers/${follower.follower}`} className="flex items-center gap-3 ">
                                <img src={follower.image_url} className="rounded-full h-10 w-10 mr-2 " />
                                {follower.username}
                            </Link>
                        </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Box>
          </Modal>
        </div>
      );
}