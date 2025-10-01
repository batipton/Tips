import Link from "next/link";
import NavLinks from "@/app/ui/nav/nav-links";
import CollapsibleSection from "@/app/ui/general/collapsible-section";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut, auth } from "@/auth";
import { fetchNumberOfNewNotifications } from "@/app/lib/data";

export default async function SideNavServer() {
  const session = await auth();

  if (!session?.user) return null;
  if (!session.user.id) return null;
  
  const userId = session.user.id;
  const notifications = await fetchNumberOfNewNotifications(userId);

  return (
    <div className="flex h-full flex-col transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64">
      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <CollapsibleSection title="Navigation" defaultOpen={true}>
            <NavLinks notifications={notifications} />
          </CollapsibleSection>
        </div>
      </div>

      {/* Sign out button */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form action={async () => {
            "use server";
            await signOut();
          }}>
          <button 
            className="flex w-full items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-700 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 transition-colors justify-start"
          >
            <PowerIcon className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </div>
  );
}
