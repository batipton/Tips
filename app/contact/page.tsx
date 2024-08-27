import React from "react";
import { createFeedback } from "@/app/lib/actions"
import Footer from "@/app/ui/general/footer";

export default function sendFeedback() {
    async function sendFeedback(formData: FormData) {
        "use server";
        const name = formData.get("name")?.toString();
        const email = formData.get("email")?.toString();
        const message = formData.get("message")?.toString();
        console.log(name);
        console.log(email);
        console.log(message);
        createFeedback(name, email, message);
    }
    return (
        <div>
            <div className="flex flex-col items-center justify-center mb-4 min-h-screen text-gray-800">
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

                        <form className="bg-gray-50 p-8 rounded-lg shadow-lg" action={sendFeedback}>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                            </label>
                            <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Your Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                            </label>
                            <textarea
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            id="message"
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            ></textarea>
                        </div>
                        <div className="flex justify-center">
                            <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            >
                            Send Message
                            </button>
                        </div>
                        </form>
                    </div>
                    </section>

                    <section className="w-full mt-8 text-center">
                    <h2 className="text-3xl font-semibold mb-4">Contact Information</h2>
                    <p className="text-lg">
                        Email: <a href="mailto:bryson.tipton@gmail.com" className="text-green-500 hover:underline">bryson.tipton@gmail.com</a>
                    </p>
                    <p className="text-lg">
                        Phone: <a href="tel:+19373094213" className="text-green-500 hover:underline">+1 (937) 309-4213</a>
                    </p>
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
};
