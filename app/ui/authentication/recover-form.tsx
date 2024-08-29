"use client";
import * as React from "react";
import { lusitana } from "@/app/ui/general/fonts";
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Button } from "@/app/ui/general/button";
import { useActionState } from "react";
import { resetPassword } from "@/app/lib/actions";
import Link from "next/link";
import SignupForm from "@/app/ui/authentication/signup-form";


export default function RecoverForm({token}:{token:string}) {
    const [error, setError] = React.useState("");
    async function submit(data:FormData) {
      setError("");
      const res = await resetPassword(token, data!.get("password")!.toString()!, data!.get("confirmPassword")!.toString()!);
      if(res!.error) {
        setError("Something went wrong! Make sure the passwords match.");
      }
    }
  return (
    <div>
    <form action={submit} className="space-y-3">
      {/* <div className="flex-1 rounded-lg bg-gray-50 pb-4 px-6 pt-8"> */}
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          Choose New Password
        </h1>
        <div className="w-full">
          <div className="mt-4">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
          Change Password <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div className="flex flex-col items-center pb-2 space-y-1">
          {error && (
            <div className="flex items-center space-x-1">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}
        </div>
    </form>
    </div>
  );
}
