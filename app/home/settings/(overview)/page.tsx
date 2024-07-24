// "use client";
import React from 'react';

import { updateImageUrl, updateProfileInformation } from "@/app/lib/actions";

import { UploadButton } from "@/app/utils/uploadthing";
import UserInfo from "@/app/ui/settings/user-info";

import { auth } from "@/auth";

export default async function Page() {

  const session = await auth();

  if (!session) return null;

  const username = session.user?.name!;
  const id = session.user?.id!;

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Settings</h1>
          <div className="mb-4 flex flex-col items-center">
            {/* <ProfilePicture /> */}
          </div>
          <UserInfo id={id} name={username} />
      </div>
    </div>
  );
}
