"use client";

import { changePassword } from "@/app/lib/actions";
import React from "react";

export default function UserInfo({id}:{id:string}) {
    const [previousPassword, setPreviousPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    
    function handleChangePassword() {
        if(newPassword !== confirmPassword) {
            return;
        }
        changePassword(id, previousPassword!, newPassword!);
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200 transition-colors duration-200">Change Password</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }} >
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="previous-password">
                    Previous Password
                    </label>
                    <input
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="previous-password"
                    type="password"
                    onChange={(e) => setPreviousPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="new-password">
                    New Password
                    </label>
                    <input
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="new-password"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="confirm-password">
                    Confirm New Password
                    </label>
                    <input
                    className="shadow appearance-none border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded w-full py-2 px-3 text-gray-700 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 leading-tight focus:outline-none focus:border-green-500 dark:focus:border-green-400 focus:ring-1 focus:ring-green-500 dark:focus:ring-green-400 transition-colors duration-200"
                    id="confirm-password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200" type="submit"
                    >
                    Change Password
                    </button>
                </div>
                </form>
            </div>
        </div>
    )
}