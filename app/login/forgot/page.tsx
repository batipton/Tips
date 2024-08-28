import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import ForgotForm from "@/app/ui/authentication/forgot-form";
import Footer from "@/app/ui/general/footer";
 
export default function ForgotPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow flex flex-col p-6 md:p-40">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-16 w-full items-end rounded-lg bg-green-500 p-3 md:h-36">
            <div className="w-28 text-white md:w-36">
              <Logo />
            </div>
          </div>
          <div className="flex-1 rounded-lg bg-gray-50 px-4 pb-4 pt-6 md:px-6 md:pb-4 md:pt-8">
            <ForgotForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}