import React from "react";
import { createFeedback } from "@/app/lib/actions"
import Footer from "@/app/ui/general/footer";
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
        <div>
            <div className="flex flex-col items-center justify-center mb-4 min-h-screen">
                <header className="bg-green-500 w-full py-8 text-white text-center">
                    <h1 className="text-4xl font-bold">Contact Us</h1>
                </header>
                <main className="flex flex-col items-center w-full flex-1 justify-center">
                    <section className="w-full mb-4 mt-4 flex justify-center">
                    <div className="w-full max-w-lg">
                        <h2 className="text-3xl font-semibold mb-4 text-center">Get in Touch</h2>
                        <p className="text-lg mb-8 text-center">
                        We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out.
                        </p>

                        <form className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300" action={sendFeedback}>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                            Name
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-colors duration-200"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                            Email
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-colors duration-200"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="message">
                            Message
                            </label>
                            <textarea
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-colors duration-200"
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            rows={5}
                            ></textarea>
                        </div>
                        <div className="flex justify-center">
                            <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-200"
                            type="submit"
                            >
                            Send Message
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};
