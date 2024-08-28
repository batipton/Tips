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

export default function ForgotForm() {
    async function onSubmit(formData: FormData) { 
        const email = formData.get("email");
        await fetch('/api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            email: email,
          }),
        })
      }
    return (
        <div>
            <form action={onSubmit} className="space-y-3">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                Find Your Account
                </h1>
                <div className="w-full">
                <div>
                    <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        required
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                </div>
                <Button className="mt-4 w-full bg-green-500 hover:bg-green-600">
                Send Reset Link <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </form>
            {/* <div className="flex pb-2 items-end space-x-1">
            {errorMessage && (
                <>
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                    <p className="text-sm text-red-500">{errorMessage}</p>
                </>
                )}
            </div> */}
        </div>
    );
}