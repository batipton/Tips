import CardWrapper from '@/app/ui/dashboard/cards';
import LatestPosts from '@/app/ui/dashboard/latest-posts';
import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
import PostInput from '@/app/ui/post-input';


export default async function Page() {

  // const asyncComponent: JSX.Element = await AsyncComponent({ props: any })
  const latestPosts: JSX.Element = await LatestPosts({mode:"followers", id:""}) || <></>;

  return (
    <main>
      <h2 className={`${lusitana.className} mb-4 ml-4 text-xl md:text-2xl`}>
          Home
      </h2>
      <PostInput />
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* <LatestPosts mode="followers" id=""/> */}
        {latestPosts}
      </div>
    </main>
  );
}
