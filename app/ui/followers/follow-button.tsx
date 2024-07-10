'use client';
import { followProfile, unfollowProfile } from '@/app/lib/actions';

export default function FollowButton({ isFollowing, id, userid } : {isFollowing:boolean, id:string, userid:string}) {

    function handleFollow() {
        followProfile(id, userid);
    }

    function handleUnfollow() {
        unfollowProfile(id, userid);
    }


    return (
        <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300" 
        onClick={isFollowing ? handleUnfollow : handleFollow}>
            { isFollowing ? "Unfollow" : "Follow" } 
        </button>
    );
}