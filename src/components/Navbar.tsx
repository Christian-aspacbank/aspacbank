import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState(false); // desktop advisory dropdown
  const [isReportsOpen, setIsReportsOpen] = useState(false); // desktop Financial Overview flyout
  const [scrolled, setScrolled] = useState(false);
  const advisoryRef = useRef<HTMLDivElement>(null);
  const [mobileAdvisoryOpen, setMobileAdvisoryOpen] = useState(false);
  const [mobileReportsOpen, setMobileReportsOpen] = useState(false);
  // ---------- Global: close on outside click (desktop dropdowns) ----------
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!advisoryRef.current) return;
      if (!advisoryRef.current.contains(e.target as Node)) {
        setIsAdvisoryOpen(false);
        setIsReportsOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  // change nav appearance on scroll (matches provided design)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ---------- Mobile drawer: lock body scroll & close on ESC ----------
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  const closeAll = useCallback(() => {
    setIsOpen(false);
    setIsAdvisoryOpen(false);
    setIsReportsOpen(false);
  }, []);

  return (
    <header>
      <nav
        className={`w-[90%] transition-all justify-self-end mr-5 sm:mr-0 sm:justify-self-center rounded-full mt-5 duration-300 fixed top-0 left-0 right-0 z-[90] px-3 sm:px-10 flex items-center justify-between ${
          scrolled
            ? "bg-white text-[#459243] py-2 sm:py-5 shadow-md"
            : "bg-[#ffffff] bg-clip-padding backdrop-filter   backdrop-blur-md bg-opacity-60  text-[#064703]  py-1 sm:py-3"
        }`}
      >
        <Link
          to="/"
          className="text-[#459243] text-xl font-medium flex items-center space-x-2 flex-nowrap "
          onClick={() => {
            closeAll();
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img
            src="/Aspac_logo-03A.png"
            alt="ASPAC Bank Logo"
            className="w-10 h-8 object-contain shrink-0"
          />
          <span className="text-[#459243] text-xs  sm:text-xl font-semibold min-w-max ">
            ASPAC Bank
          </span>
        </Link>

        {/* Center: Desktop menu (md+) */}
        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-8 font-light">
          <div
            ref={advisoryRef}
            className="relative group"
            onMouseEnter={() => setIsAdvisoryOpen(true)}
            onMouseLeave={() => {
              setIsAdvisoryOpen(false);
              setIsReportsOpen(false);
            }}
          >
            <div className="cursor-pointer flex items-center gap-1 hover:text-[#459243] transition-colors duration-300">
              Advisory
              <span
                className={`transition-transform duration-300 ${isAdvisoryOpen ? "-rotate-45" : ""}`}
              >
                <IoIosArrowDown size={18} className="pt-1" />
              </span>
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#459243] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
            </div>

            <div
              className={`absolute left-0 top-full pt-5 z-[95] transition-all duration-300 ${isAdvisoryOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-y-2"}`}
            >
              <ul className="bg-white border rounded-md shadow-lg w-56 text-left overflow-visible">
                <li className="hover:bg-gray-100 rounded-md">
                  <Link
                    to="/advisories"
                    className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                    onClick={() => {
                      closeAll();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    General Advisories
                  </Link>
                </li>

                <li
                  className="relative hover:bg-gray-100 select-none"
                  onMouseEnter={() => setIsReportsOpen(true)}
                  onMouseLeave={() => setIsReportsOpen(false)}
                >
                  <div className="w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors">
                    <span>Financial Overview</span>
                    <span
                      className={`text-sm transition-transform duration-300 ${isReportsOpen ? "-rotate-45" : ""}`}
                    >
                      <IoIosArrowDown size={18} className="pt-1" />
                    </span>
                  </div>

                  <div
                    className={`absolute top-0 left-full pl-2 z-[96] transition-all duration-300 ${isReportsOpen ? "opacity-100 visible" : "opacity-0 invisible -translate-x-2"}`}
                  >
                    <ul className="bg-white border rounded-md shadow-lg w-max text-left overflow-visible">
                      <li className="hover:bg-gray-100 rounded-md">
                        <Link
                          to="/advisories/financial-overview/aspacbank-balance-sheet"
                          className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                          onClick={() => {
                            closeAll();
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          ASPACBank Balance Sheet
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                <li className="hover:bg-gray-100 rounded-md">
                  <Link
                    to="/annual-reports"
                    onClick={() => {
                      closeAll();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                  >
                    Annual Report
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <Link
            to="/our-services"
            onClick={() => {
              closeAll();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="relative hover:text-[#459243] transition-colors duration-150 group"
          >
            Services
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#459243] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
          <Link
            to="/features"
            onClick={() => {
              closeAll();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="relative hover:text-[#459243] transition-colors duration-150 group"
          >
            Features
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#459243] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
          <Link
            to="/careers"
            onClick={() => {
              closeAll();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="relative hover:text-[#459243] transition-colors duration-150 group"
          >
            Careers
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#459243] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
          <Link
            to="/branches"
            onClick={() => {
              closeAll();
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="relative hover:text-[#459243] transition-colors duration-150 group"
          >
            Branches
            <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#459243] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
        </div>

        {/* Right: Desktop CTA (md+) */}
        {/* <div className="hidden md:flex md:items-center">
        <button className="px-4 py-2 bg-[#459243] text-white rounded-md hover:bg-green-600 whitespace-nowrap">
          Get Started
        </button>
      </div> */}

        {/* Mobile: hamburger */}
        {/* <button
        onClick={() => setIsOpen((o) => !o)}
        className="md:hidden text-gray-700 text-2xl"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
      >
        {isOpen ? "✖" : "☰"}
      </button> */}
        <button
          onClick={() => {
            console.log("hamburger clicked");
            setIsOpen((prev) => !prev);
          }}
          className="md:hidden  pr-2 text-2xl relative z-[200]"
          aria-label="Open Menu"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </nav>
      {/* Mobile drawer + backdrop */}
      <div
        className={`fixed inset-0 z-[999] md:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={closeAll} />

        {/* Drawer — right slide on mobile */}
        <aside
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 flex flex-col ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-4 pt-[max(env(safe-area-inset-top),12px)] pb-3 border-b">
            <h2 id="mobile-nav-title" className="text-base font-semibold">
              ASPAC Bank
            </h2>
            <button
              onClick={closeAll}
              className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200"
              aria-label="Close menu"
            >
              ✖
            </button>
          </div>

          {/* Drawer content (centered) */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            <Link
              to="/our-services"
              onClick={() => {
                closeAll();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="block p-3 rounded hover:bg-gray-100"
            >
              Services
            </Link>

            <Link
              to="/features"
              onClick={() => {
                closeAll();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="block p-3 rounded hover:bg-gray-100"
            >
              Features
            </Link>

            {/* ADVISORY */}
            <div>
              <button
                onClick={() => setMobileAdvisoryOpen((s) => !s)}
                className="flex justify-between w-full p-3 rounded hover:bg-gray-100"
              >
                <span>Advisory</span>

                <IoIosArrowDown
                  className={`transition-transform ${
                    mobileAdvisoryOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileAdvisoryOpen ? "max-h-96" : "max-h-0"
                }`}
              >
                <Link
                  to="/advisories"
                  onClick={() => {
                    closeAll();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="block pl-8 py-2"
                >
                  General Advisories
                </Link>

                <Link
                  to="/annual-reports"
                  onClick={() => {
                    closeAll();
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="block pl-8 py-2"
                >
                  Annual Report
                </Link>

                <button
                  onClick={() => setMobileReportsOpen((s) => !s)}
                  className="flex justify-between w-full text-left pl-8 py-2"
                >
                  <span>Financial Overview</span>

                  <IoIosArrowDown
                    className={`transition-transform ${
                      mobileReportsOpen ? "-rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    mobileReportsOpen ? "max-h-40" : "max-h-0"
                  }`}
                >
                  <Link
                    to="/advisories/financial-overview/aspacbank-balance-sheet"
                    onClick={() => {
                      closeAll();
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                    className="block pl-12 py-2"
                  >
                    ASPACBank Balance Sheet
                  </Link>
                </div>
              </div>
            </div>

            <Link
              to="/careers"
              onClick={() => {
                closeAll();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="block p-3 rounded hover:bg-gray-100"
            >
              Careers
            </Link>

            <Link
              to="/branches"
              onClick={() => {
                closeAll();
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="block p-3 rounded hover:bg-gray-100"
            >
              Branches
            </Link>
          </div>

          <div className="h-[max(env(safe-area-inset-bottom),12px)]" />
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
