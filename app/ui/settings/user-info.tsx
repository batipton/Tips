"use client"

import { updateImageUrl, updateProfileInformation } from "@/app/lib/actions";

import { UploadButton } from "@/app/utils/uploadthing";

import React from "react";

export default function UserInfo({id, username, name, bio, url}:{id:string, username:string, name:string, bio:string, url:string}) {
    const [username_, setUsername] = React.useState(username);
    const [name_, setName] = React.useState(name);
    const [bio_, setBio] = React.useState(bio);

    function handleSaveChanges() {
        updateProfileInformation(id, username_, name_, bio_);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-200">Profile Information</h2>
                <div className="mb-6 flex flex-col items-center">
                    <img 
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600 transition-colors duration-200" 
                            src={url} 
                            alt="Profile" 
                    />
                </div>

                <div className="flex justify-center mb-6">
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
                            appearance={{
                                button:
                                  "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed bg-green-500 bg-none after:bg-green-400",
                              }}
                    />
                </div>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="username">
                    Username
                    </label>
                    <input
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="username"
                    type="text"
                    placeholder={username}
                    value={username_}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                    Name
                    </label>
                    <input
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="name"
                    type="text"
                    placeholder={name}
                    value={name_}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="bio">
                    Bio
                    </label>
                    <textarea
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="bio"
                    placeholder={bio ? bio : "Tell us about yourself"}
                    value={bio_}
                    onChange={(e) => setBio(e.target.value)}
                    ></textarea>
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors duration-200" type="submit"
                    >
                    Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
}