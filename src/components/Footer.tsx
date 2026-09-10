import React from "react";
import { FaFacebookF, FaPhone, FaEnvelope, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
const Footer: React.FC = () => {
    const { pathname } = useLocation();

  // Normalize path to lowercase for matching
  const currentPath = pathname.toLowerCase();

  // Show PDIC image only on Homepage and Deposit Account page
  const showPDICImage =
    currentPath === "/" || currentPath.includes("deposit-account");
  return (
    <footer className="bg-gradient-to-tl from-[#bcf7ba] via-[#d8fbd7] to-[#d1f8cf]  pt-16 pb-16 relative">
      {showPDICImage && (
        <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
          <img
            src="/pdic.webp"
            alt="PDIC Digital Decal"
            className=" mx-auto object-contain rounded-full "
            loading="lazy"
            width={100}
            height={100}
          />
          <p className="mt-5 text-sm text-gray-700 font-medium">
            Deposits are insured by the{" "}
            <span className="text-primary font-semibold">PDIC</span> up to{" "}
            <span className="text-primary font-semibold">P 1 Million</span> per
            depositor.
          </p>
          <p className="text-sm text-gray-700">
            ASPAC Bank is supervised by the{" "}
            <a
              href="https://www.bsp.gov.ph/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-primary hover:opacity-80"
            >
              Bangko Sentral ng Pilipinas (BSP)
            </a>
            .
          </p>
        </div>
      )}
     <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-10 lg:gap-0 lg:grid-cols-3 lg:justify-items-center">
        <div>
          <h2 className="text-lg font-bold text-black mb-3 flex items-end gap-2">
        <img
          src="/Aspac_logo-03A.png"
          alt="ASPAC Bank Logo"
          className="w-10 h-8 object-contain"
        />
        <span className="text-[#459243] text-xl font-semibold min-w-max">
          ASPAC Bank
        </span> 
            
          </h2>
          
          <p className=" leading-relaxed text-xs w-full lg:w-72">
            Trusted banking solutions for Cebu communities with secure, reliable,
            and customer-focused service.
          </p>
        </div>
   <div className="flex gap-4 text-xl">
            <a
              href="https://www.facebook.com/aspacbank0620/"
              target="_blank"
              rel="noopener noreferrer"
             className="bg-[#469243c9] p-2 rounded-2xl h-max hover:bg-[#459243] transition"
            >
              <FaFacebookF size={16} color="#fff" />
            </a>
            {/* <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#469243c9] p-3 rounded-full hover:bg-[#459243] transition"
            >
              <FaYoutube color="#fff" />
            </a> */}
          </div>

        <div>
          <ul className="space-y-3  text-sm w-full lg:w-60">
            <li className="flex items-center gap-2">
              <FaPhone className="text-[#459243]" />
              <span>(032) 501-2724 | 0898-272-2724.</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#459243]" />
              <span>aspacbank@aspacbank.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaLocationDot size={20} className="text-[#459243]" />
              <span>ASPAC Bank Building, Guizo, Mandaue City, Cebu, Philippines</span>
            </li>
          </ul>
        </div>

 
       
  
      </div>

      <div className="text-center text-black mt-6 text-xs">
        © {new Date().getFullYear()} ASPAC Bank — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
