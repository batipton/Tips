import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestPosts from '@/app/ui/dashboard/latest-posts';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, } from '@/app/lib/data';
import React from 'react';
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';


export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* @ts-expect-error Server Component */}
        <CardWrapper />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* @ts-expect-error Server Component */}
        <LatestPosts />
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