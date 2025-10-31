"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ArrowTrendingUpIcon
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Search", href: "/home/followers", icon: MagnifyingGlassIcon },
  { name: "Trending", href: "/home/explore", icon: ArrowTrendingUpIcon},
  { name: "Profile", href: "/home/profile", icon: UserCircleIcon },
  { name: "Notifications", href: "/home/notifications", icon: BellIcon},
  { name: "Settings", href: "/home/settings", icon: Cog6ToothIcon}
];

export default function NavLinks({notifications, collapsed = false}:{notifications:number, collapsed?: boolean}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if(link.name === "Notifications") {
          return <NotiLink key={link.name} name={link.name} href={link.href} notifications={notifications} collapsed={collapsed} />
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            title={collapsed ? link.name : undefined}
            className={clsx(
              collapsed 
                ? "flex h-10 w-10 items-center justify-center rounded-md bg-gray-50 dark:bg-gray-700 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 transition-colors"
                : "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors",
              {
                "text-green-500 dark:bg-green-900/20": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-5 h-5" />
            {!collapsed && <p>{link.name}</p>}
          </Link>
        );
      })}
    </>
  );
}

export function NotiLink({name, href, notifications, collapsed = false}:{name:string, href:string, notifications:number, collapsed?: boolean}) {
  const pathname = usePathname();
  return (
    <Link
      key={name}
      href={href}
      title={collapsed ? `${name}${notifications > 0 ? ` (${notifications} new)` : ''}` : undefined}
      className={clsx(
        collapsed 
          ? "relative flex h-10 w-10 items-center justify-center rounded-md bg-gray-50 dark:bg-gray-700 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 transition-colors"
          : "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors",
        {
          "text-green-500 dark:bg-green-900/20": pathname === href,
        },
      )}
    >
      <BellIcon className="w-5 h-5" />
      {!collapsed && (
        <>
          <p>{name}</p>
          <p className="text-green-500 text-xs">{notifications > 0 ? `${notifications} new` : ""}</p>
        </>
      )}
      {collapsed && notifications > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
          {notifications > 9 ? '9+' : notifications}
        </span>
      )}
    </Link>
  );
}
