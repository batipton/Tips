"use client";
import React from 'react';

import { updateImageUrl, updateProfileInformation } from "@/app/lib/actions";

import ProfilePicture from "@/app/ui/settings/profile-picture";
 
import { UploadButton } from "@/app/utils/uploadthing";
 
export default function Page() {

  const [username, setUsername] = React.useState('');
  const [bio, setBio] = React.useState('');

  const handleSaveChanges = () => {
    console.log('Username:', username);
    updateProfileInformation(username);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-4">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-700 text-center">Settings</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
          <div className="mb-4 flex flex-col items-center">
            {/* <ProfilePicture /> */}
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                // Do something with the response

                updateImageUrl(res[0].url);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bio">
              Bio
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="bio"
              placeholder="Tell us about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
