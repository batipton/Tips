import Logo from "@/app/ui/general/logo";
import SignupForm from "@/app/ui/authentication/signup-form";
import { lusitana } from "@/app/ui/general/fonts";
import Link from "next/link";
import Footer from "@/app/ui/authentication/footer";
 
export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col p-6 md:p-30">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-34">
          <div className="flex h-16 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
            <div className="w-28 text-white md:w-36">
              <Logo />
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-gray-50 px-4 pb-4 pt-6 md:px-6 md:pb-4 md:pt-8">
            <SignupForm />
            <p className={`${lusitana.className} text-center`}>
              <Link href="/login" className="text-green-500">Already have an account?</Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}