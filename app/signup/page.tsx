import Logo from "@/app/ui/general/logo";
import SignupForm from "@/app/ui/authentication/signup-form";
import { lusitana } from "@/app/ui/general/fonts";
import Link from "next/link";
import Footer from "@/app/ui/authentication/footer";
 
export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col p-30">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-34">
          <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
            <div className="w-32 text-white md:w-36">
              <Logo />
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
            <SignupForm />
            <p className={`${lusitana.className} text-center`}>Already have an account? <Link href="/login" className="text-green-500">Login</Link></p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}