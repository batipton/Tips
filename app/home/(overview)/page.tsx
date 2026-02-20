import LatestPosts from "@/app/ui/posts/latest-posts";
import PostInput from "@/app/ui/posts/post-input";



export default async function Page() {

  const latestPosts: JSX.Element = (await LatestPosts({mode:"followers", id:""}))!;

  return (
    <main>
      <PostInput />
      {latestPosts}
    </main>
  );
}
