import { FaEnvelope, FaLocationDot } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

export function FooterBadge() {
  const { pathname } = useLocation();

  // Normalize path to lowercase for matching
  const currentPath = pathname.toLowerCase();

  // Show PDIC image only on Homepage and Deposit Account page
  const showPDICImage =
    currentPath === "/" || currentPath.includes("deposit-account");
  return (
    <footer className="relative  overflow-hidden bg-gradient-to-b from-white via-gray-50 to-primary/5 border-t border-primary/10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-3xl rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.ico"
                alt="ASPAC Bank"
                className="h-12 w-12 rounded-xl shadow-md"
              />

              <div>
                <h3 className="font-bold text-xl text-primary">
                  ASPAC Bank, Inc.
                </h3>

                <p className="text-xs tracking-widest uppercase text-primary/70">
                  Digitally Simple
                </p>
              </div>
            </div>

            <p className="text-xs md:text-base mt-5 text-gray-600 leading-relaxed max-w-md">
              ASPAC Bank is a community-first focused rural bank helping Cebuano
              families, entrepreneurs, teachers, and professionals achieve their
              goals through trusted savings, deposit, and loan solutions.
            </p>

            {showPDICImage && (
              <div className="mt-5">
                <img
                  src="/pdic.webp"
                  alt="PDIC Digital Decal"
                  className="mx-auto md:mx-0 object-contain "
                  loading="lazy"
                  width={70}
                  height={70}
                />
                <p className="mt-5 text-sm text-gray-700 font-medium">
                  Deposits are insured by the{" "}
                  <span className="text-primary font-semibold">PDIC</span> up to{" "}
                  <span className="text-primary font-semibold">
                    P 1 Million
                  </span>{" "}
                  per depositor.
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
          </div>

          {/* Products */}
          <div className="lg:col-span-3 ">
            <h4 className="font-semibold text-primary text-lg mb-5">
              Products
            </h4>

            <div className="flex flex-col gap-3">
              <Link
                to="/teachers-loan"
                className="group flex items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm hover:shadow-md transition"
                      onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
             >
                <span className="text-xs md:text-base">
                  Teacher Salary Loan
                </span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>

              <Link
                to="/deposit-account"
                className="group flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                       onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              >
                <span className="text-xs md:text-base">Savings & Deposits</span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>

              <Link
                to="/loans"
                className="group flex items-center justify-between bg-white rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition"
                     onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
                <span className="text-xs md:text-base">MSME Loans</span>
                <span className="group-hover:translate-x-1 transition">→</span>
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className=" lg:col-span-4 ">
            <h4 className="font-semibold text-primary text-lg mb-5">Company</h4>

            <div className="flex flex-wrap gap-3 ">
              <Link
                className="text-xs md:text-base px-4 py-2 bg-white rounded-md shadow-sm hover:bg-primary hover:text-white transition "
                to="/branches"
                         onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              >
                Branches
              </Link>

              <Link
                className="text-xs md:text-base px-4 py-2 bg-white rounded-md shadow-sm hover:bg-primary hover:text-white transition"
                to="/advisories"
                         onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              >
                Advisories
              </Link>

              <Link
                className="text-xs md:text-base px-4 py-2 bg-white rounded-md shadow-sm hover:bg-primary hover:text-white transition"
                to="/features"
                         onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              >
                Features
              </Link>
            </div>

            <div className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                Need Assistance?
              </p>

              <p className="font-semibold text-primary">
                (032) 501-2724 | 0898-272-2724.
              </p>
              <p className="text-gray-600 text-sm mt-1">
                Monday – Friday, 9:00 AM – 3:00 PM
              </p>

              <span className="flex gap-3 items-center justify-items-center mt-3 pt-1 border-t border-primary/10 ">
                <FaLocationDot size={20} className="text-[#459243]" />
                <p className="text-gray-600 text-sm mt-1">
                  ASPAC Bank Building, Guizo, Mandaue City, Cebu, Philippines
                </p>
              </span>
              <span className="flex gap-3 items-center justify-items-center mt-1">
                <FaEnvelope className="text-[#459243] mt-1" />
                <p className="text-gray-600 text-sm ">
                  aspacbank@aspacbank.com
                </p>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} ASPAC Bank, Inc. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-xs md:text-base">
            <Link
              to="/advisories"
              className="hover:text-primary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Advisories
            </Link>
            <Link
              to="/branches"
              className="hover:text-primary"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              Branches
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
