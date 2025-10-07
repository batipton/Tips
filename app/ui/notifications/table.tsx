import { auth } from "@/auth";
import { fetchNotifications, fetchProfile } from "@/app/lib/data";
import { Notification } from "@/app/lib/definitions"
import Link from "next/link";
import NotificationAvatar from "./notification-avatar";

export default async function NotificationTable() {
    const session = await auth();
    if (!session?.user) { 
      return null;
    }
    const userid = session.user?.id!;
    const notifications = await fetchNotifications(userid);

    if(notifications.length === 0) {
      return (
        <div className="w-full">
          {/* Desktop Empty State */}
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-gray-900 dark:text-gray-100">
                    Notifications
                  </th>
                </tr>
              </thead>
          </table>
          
          {/* Mobile Empty State */}
          <div className="md:hidden px-4">
            <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Notifications</h2>
          </div>
          
          {/* Shared Empty Message */}
          <div className="w-full text-center mt-8 py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5-5-5h5z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12V2.5l-5 5 5 5z"></path>
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No notifications yet</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm mx-auto">When you receive tips, follows, or comments, they'll appear here.</p>
          </div>
        </div>
      )
    }

    

    return (
        <div className="w-full">
          {/* Desktop Table */}
          <table className="hidden min-w-full text-gray-900 dark:text-gray-100 md:table">
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6 text-gray-900 dark:text-gray-100">
                    Notifications
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {notifications?.map((notification) => (
                  <tr
                    key={notification.id}
                    className="w-full border-b border-gray-200 dark:border-gray-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap hover:bg-sky-100 dark:hover:bg-gray-700 hover:text-green-500 dark:hover:text-green-400 transition-colors duration-200">
                      <NotificationElement notification={notification} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Mobile List */}
            <div className="md:hidden">
              <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100 px-4">Notifications</h2>
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                {notifications?.map((notification, index) => (
                  <div 
                    key={notification.id} 
                    className={`${index !== 0 ? 'border-t border-gray-200 dark:border-gray-700' : ''} hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200`}
                  >
                    <NotificationElement notification={notification} />
                  </div>
                ))}
              </div>
            </div>
        </div>
    )
}

async function NotificationElement({notification}:{notification:Notification}) {
    const sender = await fetchProfile(notification.send_userid); 
    
    const senderName = sender?.username || 'Unknown user';
    
    if(notification.type == "tip") {
        return (
            <Link href={`/home/post/${notification.postid}`}>
                <div className="flex items-center gap-3 py-3 pl-6 pr-3 text-gray-900 dark:text-gray-100 hover:text-inherit">
                    <NotificationAvatar 
                        src={sender?.image_url}
                        alt={`${senderName}'s profile`}
                        size={40}
                    />
                    <span className="flex-grow">{senderName} tipped your post</span>
                    {!notification.seen && (
                        <span className="text-green-500 dark:text-green-400 font-semibold text-xs">NEW</span>
                    )}
                </div>
            </Link>
        )
    } else if (notification.type == "follow") {
        return (
            <Link href={`/home/followers/${notification.send_userid}`}>
                <div className="flex items-center gap-3 py-3 pl-6 pr-3 text-gray-900 dark:text-gray-100 hover:text-inherit">
                    <NotificationAvatar 
                        src={sender?.image_url}
                        alt={`${senderName}'s profile`}
                        size={40}
                    />
                    <span className="flex-grow">{senderName} followed you</span>
                    {!notification.seen && (
                        <span className="text-green-500 dark:text-green-400 font-semibold text-xs">NEW</span>
                    )}
                </div>
            </Link>
        )
    } else if (notification.type == "comment") {
        return (
            <Link href={`/home/post/${notification.postid}`}>
                <div className="flex items-center gap-3 py-3 pl-6 pr-3 text-gray-900 dark:text-gray-100 hover:text-inherit">
                    <NotificationAvatar 
                        src={sender?.image_url}
                        alt={`${senderName}'s profile`}
                        size={40}
                    />
                    <span className="flex-grow">{senderName} commented on your post</span>
                    {!notification.seen && (
                        <span className="text-green-500 dark:text-green-400 font-semibold text-xs">NEW</span>
                    )}
                </div>
            </Link>
        )
    }
}