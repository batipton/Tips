import SideNav from "@/app/ui/nav/sidenav";
import Recommendations from "@/app/ui/nav/recommendations";
import TokenWallet from "@/app/ui/wallet/token-wallet";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
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
  );
}