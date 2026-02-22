import Pagination from "@/app/ui/search/pagination";
import Search from "@/app/ui/search/search";
import Table from "@/app/ui/search/table";
import { fetchInvoicesPages } from "@/app/lib/data";

type SearchParams = {
    query: string;
    page: string;
}

type PageProps = {
    searchParams: Promise<SearchParams>;
}

 
export default async function Page({
    searchParams,
  }: PageProps) {
    const { query, page } = await searchParams;

    const currentPage = Number(page) || 1;

    const totalPages = await fetchInvoicesPages(query);

    const table: JSX.Element = (await Table({query: query, currentPage:currentPage}))!;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search people to follow..." />
      </div>
        {table}
      <div className=" flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

