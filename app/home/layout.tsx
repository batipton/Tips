import SideNavServer from "@/app/ui/nav/sidenav-server";
import Recommendations from "@/app/ui/nav/recommendations";
import TokenWallet from "@/app/ui/wallet/token-wallet";
import TopNavigation from "@/app/ui/nav/top-navigation";
import LayoutClient from "@/app/ui/layout/layout-client";
import { TokenProvider } from '@/app/context/TokenContext';
import { auth } from "@/auth";
import { getUser } from "@/app/lib/actions";
import { fetchNumberOfNewNotifications } from "@/app/lib/data";

export const experimental_ppr = true;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
      return null;
  }
  if  (!session.user.id) {
      return null;
  }
  const userid = session.user.id!;
  const user = await getUser(userid);
  const tokens = user?.tokens!;
  const notifications = await fetchNumberOfNewNotifications(userid);

  return (
    <TokenProvider initialTokens={tokens}>
      <LayoutClient 
        user={user} 
        notifications={notifications}
        sideNav={<SideNavServer />}
        mainContent={children}
        recommendations={<Recommendations />}
        tokenWallet={<TokenWallet />}
      />
    </TokenProvider>
  );
}