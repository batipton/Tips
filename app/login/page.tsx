import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import LoginForm from "@/app/ui/authentication/login-form";
import Footer from "@/app/ui/authentication/footer";
 
export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col p-40">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <Logo />
          </div>
        </div>
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <LoginForm />
          <p className={`${lusitana.className} text-center`}>Need an account? <Link href="/signup" className="text-green-500">Signup</Link></p>
        </div>
      </div>
    </main>
    <Footer />
    </div>
  );
}