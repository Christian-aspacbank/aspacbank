import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white py-4 px-6 flex justify-between items-center relative">
      {/* Logo - Wrapped in Link */}
      <Link to="/" className="text-green-600 text-xl font-bold flex items-center">
        <img src="/Aspac_logo-03.png" alt="ASPAC Bank Logo" className="w-15 h-8 mr-2" />
        ASPAC Bank
      </Link>

      {/* Menu Items */}
      <ul
        className={`md:flex space-x-6 text-gray-700 font-medium absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex-row flex-col items-center md:items-start p-4 md:p-0 ${isOpen ? "flex" : "hidden"}`}
      >
        <li className="hover:text-green-600 cursor-pointer py-2 md:py-0">
          <Link to="/our-services">Our Services</Link>
        </li>
        <li className="hover:text-green-600 cursor-pointer py-2 md:py-0">
          <Link to="/features">Features</Link>
        </li>
        <li className="hover:text-green-600 cursor-pointer py-2 md:py-0">
          <Link to="/advisories">Advisories</Link> {/* Added Link for Advisories */}
        </li>
        <li className="hover:text-green-600 cursor-pointer py-2 md:py-0">
          <Link to="/careers">Careers</Link>
        </li>
        <li className="hover:text-green-600 cursor-pointer py-2 md:py-0">
          <Link to="/branches">Branches</Link> {/* Added Link for Branches */}
        </li>
        <li className="md:hidden py-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full">
            Get Started
          </button>
        </li>
      </ul>

      {/* Buttons */}
      <div className="hidden md:flex space-x-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Get Started
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl">
        {isOpen ? "✖" : "☰"}
      </button>
    </nav>
  );
};

export default Navbar;
