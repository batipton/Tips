import { auth } from "@/auth";
import { fetchNotifications, fetchProfile } from "@/app/lib/data";
import { Notification } from "@/app/lib/definitions"
import Link from "next/link";
import Image from "next/image";

export default async function NotificationTable() {
    const session = await auth();
    if (!session?.user) { 
      return null;
    }
    const userid = session.user?.id!;
    const notifications = await fetchNotifications(userid);

    if(notifications.length === 0) {
      return (
        <>
          <table className="hidden min-w-full text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Notifications
                  </th>
                </tr>
              </thead>
          </table>
          <div className="w-full text-center mt-4">
            <p>No Notifications</p>
          </div>
        </>
      )
    }

    

    return (
        <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Notifications
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {notifications?.map((notification) => (
                <tr
                  key={notification.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap hover:bg-sky-100 hover:text-green-500">
                    <NotificationElement notification={notification} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
    )
}

async function NotificationElement({notification}:{notification:Notification}) {
    const sender = await fetchProfile(notification.send_userid); 
    if(notification.type == "tip") {
        return (
            <Link href={`/home/post/${notification.postid}`}>
                <div className="flex items-center gap-3 py-3 pl-6 pr-3">
                    <Image src={sender.image_url} width={20} height={20} className="rounded-full h-10 w-10 mr-2 " alt={`${sender.username}'s username`} />
                    {sender.username} tipped your post
                    <p className="text-green-500">{notification.seen ? "" : "new"}</p>
                </div>
            </Link>
        )
    } else if (notification.type == "follow") {
        return (
            <Link href={`/home/followers/${notification.send_userid}`}>
                <div className="flex items-center gap-3  py-3 pl-6 pr-3">
                    <Image src={sender.image_url} width={20} height={20} className="rounded-full h-10 w-10 mr-2 " alt={`${sender.username}'s username`} />
                    {sender.username} followed you
                    <p className="text-green-500">{notification.seen ? "" : "new"}</p>
                </div>
                
            </Link>
        )
    } else if (notification.type == "comment") {
        return (
            <Link href={`/home/post/${notification.postid}`}>
                <div className="flex items-center gap-3  py-3 pl-6 pr-3">
                    <Image src={sender.image_url} width={40} height={40} className="rounded-full aspect-square object-cover" alt={`${sender.username}'s username`} />
                    {sender.username} commented on your post
                    
                    <p className="text-green-500"><strong>{notification.seen ? "" : "new"}</strong></p>
                </div>
                
            </Link>
        )
    }
}