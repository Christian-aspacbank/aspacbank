import React from "react";

const CebuanaBillsPayment: React.FC = () => {
  return (
    <div className="p-0">
      {/* Image Banner */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src="/images/cebuana-bills-banner.jpg" // 🔁 Replace this with your actual image path
          alt="Cebuana Bills Payment Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Cebuana Bills Payment</h1>

        <p className="text-gray-700 mb-6 leading-relaxed">
          Settle your bills quickly and conveniently through ASPAC Bank's Cebuana Bills Payment service. 
          Whether it's utilities, government contributions, or loan payments, we've got you covered 
          with secure and efficient processing across our growing partner network.
        </p>

        <section className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-md mb-6">
          <h2 className="text-2xl font-semibold text-green-800 mb-3">Accepted Billers</h2>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            <li>Electric Companies (e.g. MECO)</li>
            <li>Water Utilities</li>
            <li>Telecommunication Providers</li>
            <li>Credit Card Companies</li>
            <li>Government Agencies (SSS, Pag-IBIG, PhilHealth, etc.)</li>
            <li>Loan and Financing Institutions</li>
            <li>Tuition and School Payments</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold text-green-800 mb-3">How to Pay Your Bills</h2>
          <ol className="list-decimal list-inside text-gray-800 space-y-1">
            <li>Visit your nearest ASPAC Bank or Cebuana Lhuillier branch.</li>
            <li>Bring your billing statement or provide the account number.</li>
            <li>Pay the total amount due along with any applicable service fees.</li>
            <li>Get your official receipt for proof of payment.</li>
          </ol>
        </section>

        <footer className="mt-10 text-sm text-gray-600">
          <p>Need help? Contact us at <a href="mailto:aspacbank@aspacbank.com" className="text-green-700 underline">aspacbank@aspacbank.com</a> or call (032) 345-0929 / 345-0930.</p>
        </footer>
      </div>
    </div>
  );
};

export default CebuanaBillsPayment;
