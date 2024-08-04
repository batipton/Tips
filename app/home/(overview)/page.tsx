import LatestPosts from '@/app/ui/posts/latest-posts';
import { lusitana } from '@/app/ui/general/fonts';
import PostInput from '@/app/ui/posts/post-input';


export default async function Page() {

  const latestPosts: JSX.Element = (await LatestPosts({mode:"followers", id:""}))!;

  return (
    <main>
      <h2 className={`${lusitana.className} mb-4 ml-4 text-xl md:text-2xl`}>
          Home
      </h2>
      <PostInput />
      {latestPosts}
    </main>
  );
}
