import LatestPosts from "@/app/ui/posts/latest-posts";
import { lusitana } from "@/app/ui/general/fonts";
import PostInput from "@/app/ui/posts/post-input";
import { useEffect } from "react";



export default async function Page() {

  const latestPosts: JSX.Element = (await LatestPosts({mode:"followers", id:""}))!;

  return (
    <main>
      <PostInput />
      {latestPosts}
    </main>
  );
}
