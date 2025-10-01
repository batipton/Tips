import Image from "next/image";
import { fetchFilteredInvoices } from "@/app/lib/data";
import Link from "next/link";

export default async function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const invoices = await fetchFilteredInvoices(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 md:pt-0 transition-colors duration-300">
          <div className="md:hidden">
            {invoices?.map((invoice) => (
              <Link href={`/home/followers/${invoice.id}`} key={invoice.id}>
              <div
                className="mb-2 w-full rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <img src={invoice.image_url} className="rounded-full h-10 w-10 mr-2 border-2 border-gray-200 dark:border-gray-600 transition-colors duration-200" alt={`${invoice.username}'s profile`} />
                      <p className="text-gray-900 dark:text-gray-100 font-medium transition-colors duration-200">{invoice.username}</p>
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table transition-colors duration-200">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-gray-700 dark:text-gray-300 transition-colors duration-200">
                  Username
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 transition-colors duration-300">
              {invoices?.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b border-gray-200 dark:border-gray-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg transition-colors duration-200"
                >
                  <td className="whitespace-nowrap hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200">
                    <Link href={`/home/followers/${invoice.id}`}>
                      <div className="flex items-center gap-3 py-3 pl-6 pr-3">
                        <img src={invoice.image_url} className="rounded-full h-10 w-10 mr-2 border-2 border-gray-200 dark:border-gray-600 transition-colors duration-200" alt={`${invoice.username}'s profile`} />
                        <span className="text-gray-900 dark:text-gray-100 font-medium transition-colors duration-200">{invoice.username}</span>
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
