import SideNav from "@/app/ui/nav/sidenav";
import Recommendations from "@/app/ui/nav/recommendations";
import TokenWallet from "@/app/ui/wallet/token-wallet";
import { TokenProvider } from '@/app/context/TokenContext';
import { auth } from "@/auth";
import { getUser } from "@/app/lib/actions";

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
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

  return (
    <TokenProvider num={tokens}>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
          <SideNav  />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        <TokenWallet />
        <div className="w-full flex-none md:w-64">
          <Recommendations />
        </div>
      </div>
    </TokenProvider>
  );
}