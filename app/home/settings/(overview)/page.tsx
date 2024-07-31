// "use client";
import React from 'react';

import { fetchProfile, getCurrentUser } from "@/app/lib/data";

import UserInfo from "@/app/ui/settings/user-info";

import { auth } from "@/auth";

export default async function Page() {

  const session = await auth();

  if (!session) return null;

  // const username = session.user?.name!;
  const id = session.user?.id!;

  const user = await getCurrentUser();

  const username = user.username!;
  const name = user.name!;

  const profilePromise = await Promise.all([fetchProfile(id)]);
  const profile = profilePromise[0];

  return (
    <div className="flex min-h-screen py-4">
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700">Settings</h1>
          <UserInfo id={id} username={username} name={name} bio={user?.bio} url={profile.image_url}/>
      </div>
    </div>
  );
}
