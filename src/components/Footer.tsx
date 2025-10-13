import React from "react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const location = useLocation();
  console.log("Current Path:", location.pathname);

  // Normalize path to lowercase for matching
  const currentPath = location.pathname.toLowerCase();

  // Show PDIC image only on Homepage and Deposit Account page
  const showPDICImage =
    currentPath === "/" || currentPath.includes("deposit-account");

  return (
    <div className="bg-gray-300 py-10 px-6">
      {showPDICImage && (
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center mb-6 space-y-2">
          <img
            src="/New Official PDIC Digital Decal.jpg"
            alt="PDIC Decal"
            className="h-40 object-contain"
          />
          <p className="text-sm text-gray-700 font-medium">
            Deposits are insured by the PDIC up to P 1 Million per depositor.
          </p>
          <p className="text-sm text-gray-700">
            ASPAC Bank is regulated by the <b>Bangko Sentral ng Pilipinas</b>{" "}
            <a
              href="https://www.bsp.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-700 hover:text-blue-900"
            >
              https://www.bsp.gov.ph/
            </a>
          </p>
        </div>
      )}

      <hr />

      <br />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
        {/* Contact and Regulatory Info */}
        <div className="space-y-4">
          <p>
            For concerns, call ASPAC Bank’s Customer Service Hotline at
            <span className="font-semibold"> (032) 345-0929 / 345-0930</span>
          </p>

          <p>
            Email:{" "}
            <a
              href="mailto:aspacbank@aspacbank.com"
              className="text-green-700 hover:underline"
            >
              aspacbank@aspacbank.com
            </a>
          </p>
        </div>

        {/* Address + App Icons + Socials */}
        <div className="text-center md:text-right space-y-4">
          <div>
            <h4 className="text-base font-semibold">Head Office Address</h4>
            <p>
              ASPAC Bank Building, Guizo Mandaue City, Cebu City, Philippines
            </p>
          </div>
          <div className="flex justify-center md:justify-end gap-4 mt-4">
            <img src="/appstore.png" alt="App Store" className="h-10" />
            <img src="/googleplay.png" alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
