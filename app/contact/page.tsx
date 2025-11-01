import React from "react";
import { createFeedback } from "@/app/lib/actions"
import Logo from "@/app/ui/general/logo";
import Link from "next/link";
import { lusitana } from "@/app/ui/general/fonts";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Tips team. Send us your feedback, questions, or suggestions to help us improve your experience.',
  openGraph: {
    title: 'Contact Tips - Get in Touch',
    description: 'Get in touch with the Tips team. Send us your feedback, questions, or suggestions.',
    url: 'https://tipseco.com/contact',
  },
  twitter: {
    title: 'Contact Tips - Get in Touch',
    description: 'Get in touch with the Tips team. Send us your feedback, questions, or suggestions.',
  },
  alternates: {
    canonical: 'https://tipseco.com/contact',
  },
};

export default function ContactPage() {
    async function sendFeedback(formData: FormData) {
        "use server";
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const message = formData.get("message")?.toString();
        createFeedback(name!, email!, message!);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col">
            <main className="flex-grow flex items-center justify-center p-6">
                <div className="w-full max-w-lg">
                    {/* Logo Section */}
                    <div className="text-center mb-8">
                        <h1 className={`${lusitana.className} text-3xl font-bold text-gray-900 mb-2`}>Get in Touch</h1>
                        <p className="text-gray-600">We'd love to hear from you! Send us your feedback, questions, or suggestions</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 backdrop-blur-sm">
                        <form action={sendFeedback} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Your Email"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">
                                    Message
                                </label>
                                <textarea
                                    className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                                    id="message"
                                    name="message"
                                    placeholder="Your Message"
                                    rows={5}
                                    required
                                />
                            </div>

                            <button
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 shadow-sm"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </form>

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
                                Learn more about our platform?{" "}
                                <Link href="/about" className="font-semibold text-green-600 hover:text-green-500 transition-colors duration-200">
                                    About Us
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 space-y-3">
                        <p className="text-sm text-gray-600">
                            We'll get back to you as soon as possible
                        </p>
                        <div className="flex justify-center gap-6 text-sm">
                            <Link href="/" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                                Home
                            </Link>
                            <Link href="/about" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                                About
                            </Link>
                            <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                                Terms of Service
                            </a>
                            <a href="#" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                                Privacy Policy
                            </a>
                            <Link href="/signup" className="text-green-600 hover:text-green-500 transition-colors duration-200">
                                Sign Up
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
