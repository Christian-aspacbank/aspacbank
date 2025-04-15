// src/Pages/DepositAccount.tsx
import React from "react";

const DepositAccount = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div
  className="relative text-white py-12 bg-cover bg-center"
  style={{ backgroundImage: 'url(/DepositAccount.jpg)' }}
>

        <div className="container mx-auto text-center">
          <h1 className="text-4xl text-green-600  font-bold mb-4">Deposit Account</h1>
          <p className="text-lg max-w-2xl mx-auto">
            Secure, flexible, and tailored for your financial needs. Start saving today with ASPAC Bank's Deposit Account.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12" >
          <div className="bg-white shadow-lg rounded-lg p-8" >
            <h2 className="text-3xl font-semibold text-green-600 mb-6">Why Choose Our Deposit Account?</h2>
            <p className="text-lg text-gray-700 mb-4">
              At ASPAC Bank, we provide a range of benefits with our Deposit Account to help you achieve your financial goals:
            </p>
            <ul className="list-disc pl-6 text-gray-700">
              <li className="mb-2">Earn competitive interest rates on your balance.</li>
              <li className="mb-2">Free monthly account maintenance.</li>
              <li className="mb-2">Convenient mobile app for easy access and management.</li>
              <li className="mb-2">No minimum balance requirements.</li>
            </ul>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-3xl font-semibold text-green-600 mb-6">How to Open a Deposit Account</h2>
            <p className="text-lg text-gray-700 mb-4">
              Opening a Deposit Account with us is easy and hassle-free. Here's how you can get started:
            </p>
            <ol className="list-decimal pl-6 text-gray-700">
              <li className="mb-2">Visit your nearest ASPAC Bank branch or apply online.</li>
              <li className="mb-2">Provide necessary identification documents and proof of address.</li>
              <li className="mb-2">Deposit the initial amount and start enjoying the benefits of your new account.</li>
            </ol>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="py-16 bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Exclusive Features</h2>
            <p className="text-lg text-gray-600 mb-10">
              Our Deposit Account comes with these exclusive features designed to give you more value:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Power Savings Account</h3>
              <p className="text-gray-700">
                Maximize your savings potential with our Power Savings Account. Enjoy higher interest rates and benefits tailored to your needs.
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Power Checking Account</h3>
              <p className="text-gray-700">
                Keep your money accessible and secure with our Power Checking Account. Ideal for daily transactions with minimal fees.
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Time Deposit</h3>
              <p className="text-gray-700">
                Secure your funds for a fixed term and enjoy attractive interest rates with our Time Deposit.
              </p>
            </div>

            <div className="bg-green-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-green-600 mb-4">Special Savings</h3>
              <p className="text-gray-700">
                Achieve your financial goals with our Special Savings account, offering flexible terms and attractive interest rates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-600 py-12 text-center text-white">
        <h2 className="text-3xl font-semibold mb-4">Ready to Open Your Deposit Account?</h2>
        <p className="text-lg mb-6">Start saving today with ASPAC Bank. Enjoy hassle-free banking with the best services.</p>
        <a
          href="/contact-us"
          className="inline-block bg-white text-green-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-green-100 transition-all duration-300"
        >
          Contact Us to Get Started
        </a>
      </div>
    </div>
  );
};

export default DepositAccount;
