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
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast"; 

type FormInput = {
  name: string;
  email: string;
  message: string;
};

export default function ForgotForm() {
    const {
      register,
      handleSubmit,
      formState: { isSubmitting },
      reset,
    } = useForm<FormInput>();
    const [error, setError] = React.useState<string | null>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    async function onSubmit(formData: FormInput) { 
        setError(null); // Reset error message
        setSuccess(false);
        const email = formData.email;
        try { 
          const res = await fetch('/api/send', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
      
            body: JSON.stringify({
              email: email,
            }),
          })

          if(!res.ok) {
            const errorData = await res.json();
            console.log(errorData);
            throw new Error(errorData.message || "Something went wrong!");
          }

          toast.success("Reset Link Sent");
        } catch(error) {
          setError("Something went wrong!");
        }

        reset();
      }

    return (<>
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <h1 className={`${lusitana.className} mb-3 text-2xl`}>
                Find Your Account
                </h1>
                <div className="w-full">
                <div>
                    <div className="relative">
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        {...register("email")}
                    />
                    <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                </div>
                <Button className="mt-4 w-full bg-green-500 hover:bg-green-600" disabled={isSubmitting} type="submit">
                  Send Reset Link <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
                <div className="flex flex-col items-center pb-2 space-y-1">
                  {error && (
                    <div className="flex items-center space-x-1">
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-500">{error}</p>
                    </div>
                  )}
                </div>
                <Toaster />
            </form>
        </div>
    </>);
}