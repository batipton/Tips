import { fetchComments, fetchPopularPosts } from "@/app/lib/data";
import Post from "./post-content";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function PopularPosts() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const popularPosts = await fetchPopularPosts();

  const postsWithComments = await Promise.all(
    popularPosts.map(async (post) => ({
      post,
      comments: await fetchComments(post.id)
    }))
  )

  return (
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="flex w-full flex-col md:col-span-8">
          <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
              {postsWithComments.map(({ post, comments }) => {
                return <Post key={post.id} post={post} userid={userId} comments={comments} />;    
              })}
            </div>
          </div>
        </div>
      </div>
    );
}