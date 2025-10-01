import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import RecoverForm from "@/app/ui/authentication/recover-form";
import Footer from "@/app/ui/general/footer";
 
export default function RecoverPage({ params }: { params: { token: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500 rounded-2xl mb-4 shadow-lg">
              <div className="w-10 text-white">
                <Logo />
              </div>
            </div>
            <h1 className={`${lusitana.className} text-3xl font-bold text-gray-900 mb-2`}>Create New Password</h1>
            <p className="text-gray-600">Enter your new password to complete the reset process</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <RecoverForm token={params.token} />
          </div>

          {/* Security Notice */}
          <div className="text-center mt-8">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <p className="text-sm text-purple-700">
                <span className="font-medium">Security tip:</span> Choose a strong password with at least 8 characters, including numbers and symbols
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}