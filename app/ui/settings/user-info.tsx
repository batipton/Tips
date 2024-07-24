"use client"

import { updateImageUrl, updateProfileInformation } from "@/app/lib/actions";

import { UploadButton } from "@/app/utils/uploadthing";

import React from 'react';

export default function UserInfo({id, name}:{id:string, name:string}) {
    const [username, setUsername] = React.useState(name);
    const [bio, setBio] = React.useState('');

    function handleSaveChanges() {
        updateProfileInformation(id, username);
    };

    return (
        <>
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
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder={username}
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
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                >
                Save Changes
                </button>
            </div>
            </form>
        </>
    );
}