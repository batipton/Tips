'use client';
import React from 'react';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { deletePost } from '@/app/lib/actions';
import { redirect } from 'next/navigation';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function PostSettings({userid, posterid, postid}:{userid:string, posterid:string, postid:string}) {
    // if(userid != posterid) {
    //     return;
    // }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <span>&#8230;</span>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem><Link href={`/home/post/${postid}`}>Go To Post</Link></MenuItem>
                <UserPostSettings userid={userid} posterid={posterid} postid={postid} />
            </Menu>
        </div>
    )
}

export function UserPostSettings({userid, posterid, postid}:{userid:string, posterid:string, postid:string}) {
    if(userid != posterid) {
        return;
    }

    const handleDelete = () => {
        deletePost(postid);
        handleClose();
    }

    return (
        <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
    )
}