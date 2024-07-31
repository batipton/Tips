import Pagination from '@/app/ui/search/pagination';
import Search from '@/app/ui/search/search';
import Table from '@/app/ui/search/table';
import { lusitana } from '@/app/ui/general/fonts';
import { fetchInvoicesPages } from '@/app/lib/data';

 
export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    const table: JSX.Element = (await Table({query: query, currentPage:currentPage}))!;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Friends</h1>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search people..." />
      </div>
        {table}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

