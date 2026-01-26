import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [isAdvisoryOpen, setIsAdvisoryOpen] = useState(false); // desktop advisory dropdown
  const [isReportsOpen, setIsReportsOpen] = useState(false); // desktop Financial Overview flyout
  const advisoryRef = useRef<HTMLLIElement>(null);

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
    <nav className="bg-white py-4 px-6 flex items-center justify-between sticky top-0 z-[90] shadow-md">
      {/* Left: Logo */}
      <Link
        to="/"
        className="text-[#459243] text-xl font-medium flex items-center space-x-2 flex-nowrap"
        onClick={closeAll}
      >
        <img
          src="/Aspac_logo-03A.png"
          alt="ASPAC Bank Logo"
          className="w-10 h-8 object-contain"
        />
        <span className="text-[#459243] text-xl font-semibold min-w-max">
          ASPAC Bank
        </span>
      </Link>

      {/* Center: Desktop menu (md+) */}
      <div className="hidden md:flex md:flex-1 md:items-center md:justify-center md:gap-6 text-gray-700 font-medium">
        <Link to="/our-services" className="hover:text-[#459243]">
          Services
        </Link>
        <Link to="/features" className="hover:text-[#459243]">
          Features
        </Link>

        {/* Advisory (desktop dropdown with flyout) */}
        <li
          ref={advisoryRef}
          className="relative list-none hover:text-[#459243]"
          onMouseEnter={() => setIsAdvisoryOpen(true)}
          onMouseLeave={() => {
            setIsAdvisoryOpen(false);
            setIsReportsOpen(false);
          }}
        >
          <button
            type="button"
            className="flex items-center gap-1"
            aria-haspopup="menu"
            aria-expanded={isAdvisoryOpen}
            onClick={() => setIsAdvisoryOpen((s) => !s)}
          >
            Advisory{" "}
            <span className="text-sm">{isAdvisoryOpen ? "▲" : "▼"}</span>
          </button>

          {/* Level 1 */}
          {isAdvisoryOpen && (
            <div className="absolute left-0 top-full pt-2 z-[95]">
              <ul
                role="menu"
                className="bg-white border rounded-md shadow-lg w-56 text-left overflow-visible"
              >
                <li role="none" className="hover:bg-gray-100">
                  <Link
                    role="menuitem"
                    to="/advisories"
                    className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                    onClick={closeAll}
                  >
                    General Advisories
                  </Link>
                </li>

                {/* Financial Overview (flyout) */}
                <li
                  role="none"
                  className="relative hover:bg-gray-100 select-none"
                  onMouseEnter={() => setIsReportsOpen(true)}
                  onMouseLeave={() => setIsReportsOpen(false)}
                >
                  <button
                    type="button"
                    className="w-full text-left flex justify-between items-center px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                    aria-haspopup="menu"
                    aria-expanded={isReportsOpen}
                    onClick={() => setIsReportsOpen((v) => !v)}
                  >
                    <span>Financial Overview</span>
                    <span className="text-sm">▶</span>
                  </button>

                  {isReportsOpen && (
                    <div className="absolute top-0 left-full pl-2 z-[96]">
                      <ul
                        role="menu"
                        className="bg-white border rounded-md shadow-lg w-64 text-left overflow-visible"
                      >
                        <li role="none" className="hover:bg-gray-100">
                          <Link
                            role="menuitem"
                            to="/advisories/financial-overview/aspacbank-balance-sheet"
                            className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                            onClick={closeAll}
                          >
                            ASPACBank Balance Sheet
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
                <li role="none" className="hover:bg-gray-100">
                  <Link
                    role="menuitem"
                    to="/AnnualReport2024"
                    className="block px-4 py-2 text-gray-700 hover:text-[#459243] transition-colors"
                    onClick={closeAll}
                  >
                    Annual Report
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </li>

        <Link to="/careers" className="hover:text-[#459243]">
          Careers
        </Link>
        <Link to="/branches" className="hover:text-[#459243]">
          Branches
        </Link>
      </div>

      {/* Right: Desktop CTA (md+) */}
      <div className="hidden md:flex md:items-center">
        <button className="px-4 py-2 bg-[#459243] text-white rounded-md hover:bg-green-600 whitespace-nowrap">
          Get Started
        </button>
      </div>

      {/* Mobile: hamburger */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="md:hidden text-gray-700 text-2xl"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
        aria-controls="mobile-drawer"
      >
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile drawer + backdrop */}
      <div
        className={`fixed inset-0 z-[100] md:hidden transition-opacity duration-200 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          aria-label="Close menu"
          className="absolute inset-0 bg-black/40"
          onClick={closeAll}
        />

        {/* Drawer — right slide on mobile */}
        <aside
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          className={[
            "absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl",
            "transition-transform duration-300 will-change-transform flex flex-col",
          ].join(" ")}
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
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
          <nav className="flex-1 overflow-y-auto px-2 py-3 text-gray-800 flex flex-col items-center justify-center text-center">
            <Link
              to="/our-services"
              className="block px-3 py-3 rounded-xl text-base hover:bg-gray-100 w-full max-w-xs"
              onClick={closeAll}
            >
              Services
            </Link>
            <Link
              to="/features"
              className="block px-3 py-3 rounded-xl text-base hover:bg-gray-100 w-full max-w-xs"
              onClick={closeAll}
            >
              Features
            </Link>

            {/* Advisory (accordion on mobile) */}
            <details className="px-1 py-1 w-full max-w-xs">
              <summary className="list-none px-3 py-3 rounded-xl text-base hover:bg-gray-100 cursor-pointer">
                <span className="flex items-center justify-between">
                  Advisory
                  <span className="ml-3 text-gray-500">▾</span>
                </span>
              </summary>

              <div className="mt-1 ml-2 rounded-lg border">
                <Link
                  to="/advisories"
                  className="block px-3 py-3 hover:bg-gray-50"
                  onClick={closeAll}
                >
                  General Advisories
                </Link>

                {/* ✅ Annual Report */}
                <Link
                  to="/AnnualReport2024"
                  className="block px-3 py-3 hover:bg-gray-50 border-t"
                  onClick={closeAll}
                >
                  Annual Report
                </Link>

                {/* Financial Overview (accordion level 2) */}
                <details className="border-t">
                  <summary className="list-none px-3 py-3 hover:bg-gray-50 cursor-pointer">
                    <span className="flex items-center justify-between">
                      Financial Overview
                      <span className="ml-3 text-gray-500">▾</span>
                    </span>
                  </summary>
                  <div className="pl-3">
                    <Link
                      to="/advisories/financial-overview/aspacbank-balance-sheet"
                      className="block px-3 py-3 hover:bg-gray-50"
                      onClick={closeAll}
                    >
                      ASPACBank Balance Sheet
                    </Link>
                  </div>
                </details>
              </div>
            </details>

            <Link
              to="/careers"
              className="block px-3 py-3 rounded-xl text-base hover:bg-gray-100 w-full max-w-xs"
              onClick={closeAll}
            >
              Careers
            </Link>
            <Link
              to="/branches"
              className="block px-3 py-3 rounded-xl text-base hover:bg-gray-100 w-full max-w-xs"
              onClick={closeAll}
            >
              Branches
            </Link>

            <div className="px-3 pt-2 w-full max-w-xs">
              <button
                className="w-full px-4 py-3 bg-[#459243] text-white rounded-xl hover:bg-green-700"
                onClick={closeAll}
              >
                Get Started
              </button>
            </div>
          </nav>

          {/* Safe area bottom padding for notches */}
          <div className="h-[max(env(safe-area-inset-bottom),12px)]" />
        </aside>
      </div>
    </nav>
  );
};

export default Navbar;
