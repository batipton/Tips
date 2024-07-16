import CardWrapper from '@/app/ui/dashboard/cards';
import LatestPosts from '@/app/ui/dashboard/latest-posts';
import { lusitana } from '@/app/ui/fonts';
import React from 'react';


export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <LatestPosts mode="followers" id=""/>
      </div>
      
    </main>
  );
}

{/* <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          
          <LatestInvoices />
        </Suspense>
</div> */}