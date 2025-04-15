import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./WelcomePage";
import OurServices from "./Pages/OurServices";
import Features from "./Pages/Features";
import Advisories from "./Pages/Advisories"; // Import the Advisories component
import Careers from "./Pages/Careers";  // Import Careers page
import Branches from "./Pages/Branches"; // Import Branches page
import DepositAccount from "./Pages/DepositAccount"; // Import DepositAccount page
import APDSLoanPage from './Pages/APDSLoanPage';  // Correct import path

import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/features" element={<Features />} />
          <Route path="/advisories" element={<Advisories />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/deposit-account" element={<DepositAccount />} /> {/* Add the DepositAccount route */}
          <Route path="/apds-loan" element={<APDSLoanPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
