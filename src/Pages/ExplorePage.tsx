import React from "react";

const ExplorePage: React.FC = () => {
  return (
    <div className="p-8 lg:p-16 text-gray-800 bg-white min-h-screen">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl lg:text-5xl font-bold text-green-700 mb-6">Simply Safe Banking</h1>
        <p className="text-lg lg:text-xl mb-8 text-gray-700">
          At ASPAC Bank, your security is our top priority. “Simply Safe” isn’t just a tagline — it's our promise to protect your finances with integrity, trust, and care.
        </p>
        <img
          src="/Safebanking.jpg" // Replace with your actual image path
          alt="Simply Safe Banking"
          className="mx-auto mb-8 rounded-lg shadow-lg w-full max-w-3xl"
        />
        <div className="text-left space-y-6">
          <section>
            <h2 className="text-2xl font-semibold text-green-600">Why Simply Safe?</h2>
            <p>
              We focus on keeping your money and information secure at every step. With reliable in-branch transactions, trusted staff, and a commitment to your peace of mind, we make banking safe and simple.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600">Safety Practices</h2>
            <ul className="list-disc list-inside ml-4">
              <li>Strict internal controls</li>
              <li>Secure handling of all financial transactions</li>
              <li>Carefully monitored account activities</li>
              <li>Confidential and responsible data management</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600">Banking Hours</h2>
            <p>
              Visit any of our branches during operating hours: <strong>Monday to Friday, 9:00 AM to 4:00 PM</strong>. We are always ready to serve you with a smile.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-green-600">Customer Support</h2>
            <p>
              Our team is dedicated to helping you with your banking needs. Reach out to us through phone or in person at your nearest branch — we're here for you.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
