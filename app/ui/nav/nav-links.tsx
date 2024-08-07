"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  BellIcon
} from "@heroicons/react/24/outline";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { fetchNumberOfNewNotifications } from "@/app/lib/data"

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: "Home", href: "/home", icon: HomeIcon },
  { name: "Search", href: "/home/followers", icon: MagnifyingGlassIcon },
  { name: "Profile", href: "/home/profile", icon: UserCircleIcon },
  { name: "Notifications", href: "/home/notifications", icon: BellIcon},
  { name: "Settings", href: "/home/settings", icon: Cog6ToothIcon}
];

export default function NavLinks({notifications}:{notifications:number}) {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        if(link.name === "Notifications") {
          return <NotiLink name={link.name} href={link.href} notifications={notifications} />
        }
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-green-500": pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

export function NotiLink({name, href, notifications}:{name:string, href:string, notifications:number}) {
  const pathname = usePathname();
  return (
    <Link
      key={name}
      href={href}
      className={clsx(
        "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 md:flex-none md:justify-start md:p-2 md:px-3",
        {
          "bg-sky-100 text-green-500": pathname === href,
        },
      )}
    >
      <BellIcon className="w-6" />
      <p className="hidden md:block">{name}</p>
      <p className="text-green-500">{notifications > 0 ? `${notifications} new` : ""}</p>
    </Link>
  );
}
