'use client';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { likePost } from '@/app/lib/actions';

import { useState } from 'react';
 
export default function LikeButton({tips=0, id="", userid=""}) {
  const [likes, setLikes] = useState(tips);
 
  function handleClick() {
    setLikes(likes + 1);
    likePost(id, likes+1, userid);
  }

  return (
    <div className="flex flex-row mt-2 mb-2">
      <button type="button" title="give tip" className="text-green-500 bg-transparent font-medium rounded-lg text-sm py-1 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-700" 
      onClick={handleClick}>
        <BanknotesIcon className="w-8 text-green-500"  />
      </button>
      <p className="px-3 mb-2 mt-2">{likes}</p>
    </div>
  );
}