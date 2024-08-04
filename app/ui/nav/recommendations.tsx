import { fetchRecommendations } from '@/app/lib/data';
import { auth } from "@/auth";
import Link from "next/link";
import Image from 'next/image';

export default async function Recommendations() {
    const session = await auth(); 
    if (!session?.user) return null;
    const userid = session.user?.id!;
    const recommendations = await fetchRecommendations(userid);

    if(recommendations.length == 0) {
        return;
    }

    return (
        <div className="mt-6 px-2 flow-root">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    <table className="min-w-full">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                                    People You May Know
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                        {recommendations?.map((recommendation) => (
                            <tr
                            key={recommendation.id}
                            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                            >
                            <td className="whitespace-nowrap hover:bg-sky-100 hover:text-green-500">
                                <Link href={`/home/followers/${recommendation.id}`}>
                                <div className="flex items-center gap-3  py-3 pl-6 pr-3">
                                    <Image src={recommendation.image_url} width={40} height={40} className="rounded-full aspect-square object-cover mr-2"/>
                                    {recommendation.username}
                                </div>
                                </Link>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
        </div>
    )
}