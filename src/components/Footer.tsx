import React from "react";
import { useLocation } from "react-router-dom";

const Footer: React.FC = () => {
  const { pathname } = useLocation();

  // Normalize path to lowercase for matching
  const currentPath = pathname.toLowerCase();

  // Show PDIC image only on Homepage and Deposit Account page
  const showPDICImage =
    currentPath === "/" || currentPath.includes("deposit-account");

  return (
    <footer role="contentinfo" className="bg-gray-50 border-t border-gray-200">
      {/* PDIC / BSP strip (conditional) */}
      {showPDICImage && (
        <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 text-center">
          <img
            src="/New Official PDIC Digital Decal.jpg"
            alt="PDIC Digital Decal"
            className="h-40 mx-auto object-contain"
            loading="lazy"
            width={320}
            height={160}
          />
          <p className="mt-2 text-sm text-gray-700 font-medium">
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

      <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-700">
        {/* Contact and Regulatory Info */}
        <section aria-labelledby="footer-contact" className="space-y-3">
          <h3
            id="footer-contact"
            className="text-base font-semibold text-gray-900"
          >
            Contact Us
          </h3>
          <p>
            For concerns, call our Customer Service Hotline at{" "}
            <a
              href="tel:+63322722724"
              className="font-semibold text-primary hover:opacity-80"
            >
              (032) 272-2724
            </a>{" "}
            or Mobile number{" "}
            <a
              href="tel:+638982722724"
              className="font-semibold text-primary hover:opacity-80"
            >
              0898-272-2724
            </a>
            .
          </p>
          <p>
            Email:&nbsp;
            <a
              href="mailto:aspacbank@aspacbank.com"
              className="text-primary hover:opacity-80"
            >
              aspacbank@aspacbank.com
            </a>
          </p>
        </section>

        {/* Address + Store badges */}
        <section
          aria-labelledby="footer-address"
          className="text-center md:text-right space-y-3"
        >
          <h3
            id="footer-address"
            className="text-base font-semibold text-gray-900"
          >
            Head Office Address
          </h3>
          <address className="not-italic">
            ASPAC Bank Building, Guizo, Mandaue City, Cebu, Philippines
          </address>

          <div className="flex justify-center md:justify-end gap-4 mt-4">
            {/* If you have real store URLs, wrap images with <a href="..."> */}
            <img
              src="/appstore.png"
              alt="Download on the App Store"
              className="h-10"
              loading="lazy"
            />
            <img
              src="/googleplay.png"
              alt="Get it on Google Play"
              className="h-10"
              loading="lazy"
            />
          </div>
        </section>
      </div>

      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()}{" "}
            <span className="font-medium">ASPAC Bank, Inc.</span> All rights
            reserved.
          </p>
          <nav aria-label="Footer legal" className="text-xs text-gray-600">
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              <li>
                <a href="/privacy" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="/advisories" className="hover:underline">
                  Advisories
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
