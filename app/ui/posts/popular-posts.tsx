import { fetchPopularPosts } from "@/app/lib/data";
import Post from "./post-content";

export default async function PopularPosts() {
    const popularPosts = await fetchPopularPosts();

    console.log(popularPosts);

    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
          <div className="flex w-full flex-col md:col-span-8">
            <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-300">
              <div className="bg-white dark:bg-gray-800 px-6 transition-colors duration-300">
                {popularPosts.map(async (post, i) => {
                  return <Post id={post.id} />;    
                })}
              </div>
            </div>
          </div>
        </div>
      );
}