import { fetchLatestPosts, fetchComments } from "@/app/lib/data";
import { auth } from "@/auth";
import Post from "@/app/ui/posts/post-content";

export default async function LatestPosts({ mode, id }:{ mode:string, id:string }) {
  const session = await auth();

  if (!session?.user) return null;
  
  const latestPosts = await fetchLatestPosts(mode, session.user?.id!, id);
  const userid = session.user?.id!;

  if(latestPosts.length == 0) {
    return (
      <div className="w-full text-center mt-4">
        <p>Uh Oh... No Posts Here!</p>
      </div>
    )
  }

  // Fetch all comments in parallel and filter out invalid posts
  const postsWithComments = await Promise.all(
    latestPosts
      .filter(post => post && post.date)
      .map(async (post) => ({
        post,
        comments: await fetchComments(post.id)
      }))
  );

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <div className="flex w-full flex-col md:col-span-8">
        <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
          <div className="bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
            {postsWithComments.map(({ post, comments }) => (
              <Post key={post.id} post={post} userid={userid} comments={comments} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
