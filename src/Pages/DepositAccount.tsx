// src/Pages/DepositAccount.tsx
import React from "react";

const DepositAccount = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div
        className="relative text-white py-20 bg-cover bg-center"
        style={{ backgroundImage: 'url(/DepositAccount.jpg)' }}
      >
        <div className="container mx-auto text-center px-6">
          <h1 className="text-5xl text-green-600 font-extrabold mb-4">Deposit Account</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90">
            Secure, flexible, and tailored for your financial needs. Start saving today with ASPAC Bank's Deposit Account.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Why Choose Section */}
          <div className="bg-white shadow-lg rounded-2xl p-10 border border-green-100">
            <h2 className="text-3xl font-bold text-green-600 mb-6">Why Choose Our Deposit Account?</h2>
            <p className="text-base text-gray-700 mb-4">
              At ASPAC Bank, we provide a range of benefits with our Deposit Account to help you achieve your financial goals:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 text-base">
              <li>Earn competitive interest rates on your balance.</li>
              <li>Free monthly account maintenance.</li>
              <li>Convenient mobile app for easy access and management.</li>
              <li>No minimum balance requirements.</li>
            </ul>
          </div>

          {/* How to Open Section */}
          <div className="bg-white shadow-lg rounded-2xl p-10 border border-green-100">
            <h2 className="text-3xl font-bold text-green-600 mb-6">How to Open a Deposit Account</h2>
            <p className="text-base text-gray-700 mb-4">
              Opening a Deposit Account with us is easy and hassle-free. Here's how you can get started:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 text-base">
              <li>Visit your nearest ASPAC Bank branch or apply online.</li>
              <li>Provide necessary identification documents and proof of address.</li>
              <li>Deposit the initial amount and start enjoying the benefits of your new account.</li>
            </ol>
          </div>
        </div>

        {/* Features Section */}
        <div className="pt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Exclusive Features</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our Deposit Account comes with these exclusive features designed to give you more value:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {[
              {
                title: "Power Savings Account",
                description: "Maximize your savings potential with our Power Savings Account. Enjoy higher interest rates and benefits tailored to your needs."
              },
              {
                title: "Power Checking Account",
                description: "Keep your money accessible and secure with our Power Checking Account. Ideal for daily transactions with minimal fees."
              },
              {
                title: "Time Deposit",
                description: "Secure your funds for a fixed term and enjoy attractive interest rates with our Time Deposit."
              },
              {
                title: "Special Savings",
                description: "Achieve your financial goals with our Special Savings account, offering flexible terms and attractive interest rates."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-green-50 p-6 rounded-xl shadow border border-green-200">
                <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
                <p className="text-gray-700 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16 text-center text-white px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Open Your Deposit Account?</h2>
        <p className="text-lg max-w-xl mx-auto mb-8">
          Start saving today with ASPAC Bank. Enjoy hassle-free banking with the best services.
        </p>
        <a
          href="/contact-us"
          className="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-100 transition-all duration-300"
        >
          Contact Us to Get Started
        </a>
      </div>
    </div>
  );
};

export default DepositAccount;
