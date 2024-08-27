import { auth } from "@/auth";
import { getUser } from "@/app/lib/actions";
import TokenWalletClient from "@/app/ui/wallet/token-wallet-client";

export default async function TokenWallet() {
    const session = await auth();
    if (!session?.user) {
        return null;
    }
    if  (!session.user.id) {
        return null;
    }
    const userid=session.user.id!;
    const user = await getUser(userid);
    const tokens = user.tokens!;
    const redeem = user.redeem!;

    return (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 h-18 bg-green-500 text-white p-2 text-center rounded-t-lg">
            <TokenWalletClient tokens={tokens} redeem={redeem} userid={userid} />
        </div>
    )
}