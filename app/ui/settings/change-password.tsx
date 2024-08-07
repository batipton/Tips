"use client";

import { changePassword } from "@/app/lib/actions";
import React from "react";

export default function UserInfo({id}:{id:string}) {
    const [previousPassword, setPreviousPassword] = React.useState(null);
    const [newPassword, setNewPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);
    
    function handleChangePassword(form:FormData) {
        if(newPassword != confirmPassword) {
            console.log("passwords did not match");
            return;
        }
        changePassword(id, previousPassword, newPassword);
    }

    return (
        <>
        <h1 className="text-2xl mb-6 text-gray-700">Change Password</h1>
        <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }} >
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="previous-password">
                    Previous Password
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="previous-password"
                    type="password"
                    onChange={(e) => setPreviousPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="new-password">
                    New Password
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="new-password"
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                    Confirm New Password
                    </label>
                    <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirm-password"
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit"
                    >
                    Change Password
                    </button>
                </div>
            </form>
            </>
    )
}