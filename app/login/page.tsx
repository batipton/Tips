import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import LoginForm from "@/app/ui/authentication/login-form";
import Footer from "@/app/ui/general/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to your Tips account to access your dashboard, manage your tokens, and engage with the community.',
  openGraph: {
    title: 'Sign In to Tips',
    description: 'Sign in to your Tips account to access your dashboard and engage with the community.',
    url: 'https://tipseco.com/login',
  },
  twitter: {
    title: 'Sign In to Tips',
    description: 'Sign in to your Tips account to access your dashboard and engage with the community.',
  },
  alternates: {
    canonical: 'https://tipseco.com/login',
  },
  robots: {
    index: false,
    follow: true,
  },
};
 
export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 className={`${lusitana.className} text-3xl font-bold text-gray-900 mb-2`}>Welcome back</h1>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <LoginForm />
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">or</span>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link href="/signup" className="font-semibold text-green-600 hover:text-green-500 transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-3">
            <div className="flex justify-center gap-6 text-sm">
              <Link href="/" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Home
              </Link>
              <Link href="/about" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                About
              </Link>
              <Link href="/contact" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Contact
              </Link>
              <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Privacy Policy
              </a>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Tips. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}