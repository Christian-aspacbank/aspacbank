import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center relative">
      {/* Logo - Wrapped in Link */}
      <Link to="/" className="text-green-600 text-xl font-normal flex items-center space-x-2 flex-nowrap">
        <img src="/Aspac_logo-03.png" alt="ASPAC Bank Logo" className="w-10 h-8" />
        <span className="text-lg hidden sm:block min-w-max">ASPAC Bank</span>
      </Link>

      {/* Menu Items */}
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row md:static absolute top-full left-0 w-full bg-white md:bg-transparent shadow-md md:shadow-none z-50 md:z-auto p-4 md:p-0 md:space-x-6 text-gray-700 font-medium items-center md:items-start justify-center md:justify-start`}
      >
        <ul className="flex flex-col md:flex-row items-center justify-center w-full space-y-4 md:space-y-0 md:space-x-6 text-center">
          <li className="hover:text-green-600 cursor-pointer">
            <Link to="/our-services">Services</Link>
          </li>
          <li className="hover:text-green-600 cursor-pointer">
            <Link to="/features">Features</Link>
          </li>
          <li className="hover:text-green-600 cursor-pointer">
            <Link to="/advisories">Advisories</Link>
          </li>
          <li className="hover:text-green-600 cursor-pointer">
            <Link to="/careers">Careers</Link>
          </li>
          <li className="hover:text-green-600 cursor-pointer">
            <Link to="/branches">Branches</Link>
          </li>
          <li className="md:hidden w-full flex justify-center">
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-auto whitespace-nowrap">
              Get Started
            </button>
          </li>
        </ul>
      </div>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
      <button className="px-4 py-2 bg-[#27ae60] text-white rounded-md hover:bg-green-600 whitespace-nowrap">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl z-50">
        {isOpen ? "✖" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;
