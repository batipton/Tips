import React from "react";
import { fetchProfile, getCurrentUser } from "@/app/lib/data";
import UserInfo from "@/app/ui/settings/user-info";
import ChangePassword from "@/app/ui/settings/change-password";
import { auth } from "@/auth";

export default async function Page() {

  const session = await auth();

  if (!session) {
    return null;
  }

  const id = session.user?.id!;

  const user = await getCurrentUser();

  const username = user?.username!;
  const name = user?.name!;

  const profilePromise = await Promise.all([fetchProfile(id)]);
  const profile = profilePromise[0];

  return (
    <div className="flex-1 min-h-full p-4 md:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 px-4 md:px-8 pt-6 pb-8 w-full max-w-6xl mx-auto transition-colors duration-300">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-700 dark:text-gray-200 transition-colors duration-200">Settings</h1>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <UserInfo id={id} username={username} name={name} bio={user?.bio ?? ""} url={profile.image_url}/>
          </div>
          <div className="space-y-6">
            <ChangePassword id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}
