import { auth } from "@/auth";
import { fetchTokens } from "@/app/lib/data";
import { getUser } from "@/app/lib/actions";
import {
    CurrencyDollarIcon
  } from "@heroicons/react/24/outline";
import CountdownTimer from "@/app/ui/wallet/timer";

export default async function TokenWallet() {
    const session = await auth();
    if (!session?.user) {
        return null;
    }
    if  (!session.user.id) {
        return null;
    }
    const user = await getUser(session.user.id!);
    const numberOfTokens = user.tokens;

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 h-18 bg-green-500 text-white p-2 text-center rounded-t-lg">
            <div className="flex items-center justify-center min-w-min">
                <CurrencyDollarIcon className="w-6 mr-2" />
                <p>{numberOfTokens}</p>
            </div>
            <CountdownTimer redeem={user.redeem} userid={user.id} />
        </div>
    )
}