"use client";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { likePost } from "@/app/lib/actions";

import { useState } from "react";
import { useTokens } from '@/app/context/TokenContext';
 
export default function LikeButton({initialTips, id, userid, posterid}:{initialTips:number, id:string, userid:string, posterid:string}) {
  // number of tips the post has
  const [tips, setTips] = useState(initialTips);
  // number of tokens the user has from context
  const { tokens, setTokens } = useTokens();

 
  function handleClick() {
    if(tokens > 0) {
      // update state of post to show 1 more tip
      setTips(tips + 1);
      // update state of user to show 1 less token
      setTokens(tokens - 1);
      // update db to show 1 more tip on the post
      likePost(id, tips+1, userid, posterid);
    } else {
      alert("Sorry! You do not have enough tokens.");
    }
  }

  return (
    <div className="flex flex-row mt-2 mb-2 mr-2">
      <button type="button" title="give tip" className="text-green-500 dark:text-green-400 bg-transparent hover:bg-green-50 dark:hover:bg-gray-700 font-medium rounded-lg text-sm py-1 focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200" 
      onClick={handleClick}>
        <BanknotesIcon className="w-7 text-green-500 dark:text-green-400"  />
      </button>
      <p className="px-1 mb-2 mt-2 text-gray-900 dark:text-gray-100 transition-colors duration-200">{tips}</p>
    </div>
  );
}