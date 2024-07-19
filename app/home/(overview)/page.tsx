import CardWrapper from '@/app/ui/dashboard/cards';
import LatestPosts from '@/app/ui/dashboard/latest-posts';
import { lusitana } from '@/app/ui/fonts';
import { useState } from 'react';
import PostInput from '@/app/ui/post-input';


export default async function Page() {


  return (
    <main>
      <div className="container p-4">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Create a New Post</h1>
        <PostInput />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestPosts mode="followers" id=""/>
      </div>
    </main>
  );
}
