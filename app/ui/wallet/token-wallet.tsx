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
    const tokens = user?.tokens!;
    const redeem = user?.redeem!;

    return (
        <div className="fixed bottom-4 right-4 xl:right-72 z-40 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-xl shadow-lg border border-green-400 min-w-[200px] backdrop-blur-sm">
            <div className="text-center">
                <div className="text-xs font-medium text-green-100 mb-1">Token Wallet</div>
                <TokenWalletClient numTokens={tokens} redeem={redeem} userid={userid} />
            </div>
        </div>
    )
}