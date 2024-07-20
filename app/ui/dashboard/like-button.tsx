'use client';
import { likePost } from '@/app/lib/actions';

import { useState } from 'react';
 
export default function LikeButton({tips=0, id="", userid=""}) {
  const [likes, setLikes] = useState(tips);
 
  function handleClick() {
    setLikes(likes + 1);
    likePost(id, likes+1, userid);
  }
 
  return <button type="button" className="text-white bg-green-500 hover:bg-green-400  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-700" 
  onClick={handleClick}>Tip ({likes})</button>;
}