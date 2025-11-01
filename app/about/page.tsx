import React from "react";
import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Tips - our mission to empower users to recognize and reward great content through daily token distribution. Join our positive and engaging community.',
  openGraph: {
    title: 'About Tips - Our Mission & Vision',
    description: 'Learn about Tips - our mission to empower users to recognize and reward great content through daily token distribution.',
    url: 'https://tipseco.com/about',
  },
  twitter: {
    title: 'About Tips - Our Mission & Vision',
    description: 'Learn about Tips - our mission to empower users to recognize and reward great content through daily token distribution.',
  },
  alternates: {
    canonical: 'https://tipseco.com/about',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-4xl">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 className={`${lusitana.className} text-4xl font-bold text-gray-900 mb-2`}>About Tips</h1>
          </div>

          {/* Content Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
            <div className="space-y-8">

              <div>
                <section>
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">How It Works</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Hello! This is a social media application I've been working on in my spare time. 
                    Every day, each user can redeem 15 tokens that 
                    they can use to tip posts they find valuable or enjoyable.
                    A user is not limited to giving a post 1 token, they may give it 2, 3 or even 15 tokens. 
                    Tipping allows users to create a rewarding community experience.
                    For every 2 tokens a post gets, the user who posted it will earn 1 token. 
                  </p>
                </section>
              </div>

              <div className="border-t border-gray-200 pt-8">
                <section>
                  <h2 className="text-3xl font-semibold mb-4 text-gray-900">Our Values</h2>
                  <ul className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-3 mr-3"></span>
                      <div>
                        <span className="font-semibold text-gray-900">Empowerment:</span> Giving users the tools to reward content they value.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-3 mr-3"></span>
                      <div>
                        <span className="font-semibold text-gray-900">Community:</span> Building a space where everyone can contribute and connect.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-3 mr-3"></span>
                      <div>
                        <span className="font-semibold text-gray-900">Transparency:</span> Ensuring fair and open interactions within the platform.
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-3 mr-3"></span>
                      <div>
                        <span className="font-semibold text-gray-900">Responsiveness:</span> Addressing user feedback about the platform quickly.
                      </div>
                    </li>
                  </ul>
                </section>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Ready to get started?</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Join our community and start earning from your content today.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                    Get Started
                  </Link>
                  <Link href="/contact" className="border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 space-y-3">
            <div className="flex justify-center gap-6 text-sm">
              <Link href="/" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Home
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
              <Link href="/login" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                Sign In
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 Tips. All rights reserved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
