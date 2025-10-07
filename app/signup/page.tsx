import Logo from "@/app/ui/general/logo";
import SignupForm from "@/app/ui/authentication/signup-form";
import { lusitana } from "@/app/ui/general/fonts";
import Link from "next/link";
import Footer from "@/app/ui/general/footer";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create your Tips account today and start earning tokens from your content. Join our community where your content has real value.',
  openGraph: {
    title: 'Join Tips - Create Your Account',
    description: 'Create your Tips account today and start earning tokens from your content. Join our community where your content has real value.',
    url: 'https://tipseco.com/signup',
  },
  twitter: {
    title: 'Join Tips - Create Your Account',
    description: 'Create your Tips account today and start earning tokens from your content.',
  },
  alternates: {
    canonical: 'https://tipseco.com/signup',
  },
  robots: {
    index: false,
    follow: true,
  },
};
 
export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-2xl mb-4 shadow-lg">
              <div className="w-10 text-white">
                <Logo />
              </div>
            </div>
            <h1 className={`${lusitana.className} text-3xl font-bold text-gray-900 mb-2`}>Join Tips</h1>
            <p className="text-gray-600">Create your account and start earning from your content</p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <SignupForm />
            
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
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-green-600 hover:text-green-500 transition-colors duration-200">
                  Sign in
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
              By signing up, you agree to our Terms of Service and Privacy Policy
            </p>
            <p className="text-sm text-gray-500">
              © 2025 Tips. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}