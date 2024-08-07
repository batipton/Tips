"use client";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { likePost } from "@/app/lib/actions";

import { useState } from "react";
 
export default function LikeButton({tips=0, id="", userid="", posterid="", tokens=0}) {
  const [likes, setLikes] = useState(tips);
  const [numTokens, setTokens] = useState(tokens);

 
  function handleClick() {
    if(numTokens > 0) {
      setLikes(likes + 1);
      setTokens(tokens-1);
      likePost(id, likes+1, userid, posterid);
    } else {
      alert("Sorry! You do not have enough tokens.");
    }
  }

  return (
    <div className="flex flex-row mt-2 mb-2 mr-2">
      <button type="button" title="give tip" className="text-green-500 bg-transparent font-medium rounded-lg text-sm py-1 dark:bg-green-400 dark:hover:bg-green-500 focus:outline-none dark:focus:ring-green-700" 
      onClick={handleClick}>
        <BanknotesIcon className="w-7 text-green-500"  />
      </button>
      <p className="px-1 mb-2 mt-2">{likes}</p>
    </div>
  );
}