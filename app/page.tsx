import Logo from "@/app/ui/general/logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import Image from "next/image";
import LoginForm from "@/app/ui/authentication/login-form";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-10 shrink-0 items-end rounded-lg bg-green-500 p-4 md:h-32">
        { <Logo /> }
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Welcome to Tips</strong> where your content has real value! 
            Everyday users receive tokens that they can spend to access, promote, and reward 
            the best content in the community around them. 
            Engage, earn, and discover Tips!
          </p>
          
        </div>
        <div className="mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
          <LoginForm />
          <div className="px-16">
            <Link
              href="/signup"
              className="flex items-center gap-5 self-start rounded-lg bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-400 md:text-base"
            >
              <span>Sign up</span> <ArrowRightIcon className="w-5 md:w-6" />
              
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
