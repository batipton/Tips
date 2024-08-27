import React from "react";
import Footer from "@/app/ui/general/footer";

export default function() {
  return (
    <div>
      <header className="bg-green-500 w-full py-8 text-white text-center">
          <h1 className="text-4xl font-bold">About Us</h1>
      </header>
      <div className="flex flex-col items-center min-h-screen bg-gray-100 text-gray-800">
        <main className="flex flex-col items-center w-full max-w-4xl p-8">
          <section className="w-full mb-8">
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-lg">
              Our mission is to empower users to recognize and reward great content through daily token distribution. We believe in fostering a positive and engaging community where everyone has the chance to support what they love.
            </p>
          </section>

          <section className="w-full mb-8">
            <h2 className="text-3xl font-semibold mb-4">How It Works</h2>
            <p className="text-lg">
              Every day, each user can redeem 15 tokens that they can use to tip posts they find valuable or enjoyable.
              A user is not limited to giving a post 1 token, they may give it 2, 3 or even 15 tokens. Users may earn
              even more tokens by making posts.  Tipping allows users to directly support creators and contribute to a vibrant and rewarding community experience.
              For every 2 tokens a post gets, the user who posted it will earn 1 token.
            </p>
          </section>

          <section className="w-full">
            <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside text-lg">
              <li>Empowerment: Giving users the tools to reward content they value.</li>
              <li>Community: Building a space where everyone can contribute and connect.</li>
              <li>Transparency: Ensuring fair and open interactions within the platform.</li>
              <li>Responsiveness: Addressing user feedback about the platform quickly.</li>
            </ul>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};
