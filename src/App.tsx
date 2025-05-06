import React from "react";
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./WelcomePage";
import OurServices from "./Pages/OurServices";
import Features from "./Pages/Features";
import Advisories from "./Pages/Advisories";
import Careers from "./Pages/Careers";
import Branches from "./Pages/Branches";
import DepositAccount from "./Pages/DepositAccount";
import APDSLoanPage from './Pages/APDSLoanPage';
import TuitionFeeCollection from "./Pages/TuitionFeeCollection";
import ExplorePage from "./Pages/ExplorePage";  // ✅ Correct import for the explore page
import BillsPayment from "./Pages/BillsPayment";
import CebuanaServices from "./Pages/CebuanaServices";
import PeraPadala from "./Pages/PeraPadala"; // adjust path as needed
import InternationalRemittance from "./Pages/InternationalRemittance"; // adjust path as needed
import Cashincashout from "./Pages/Cashincashout"; // Correct import for the Cashincashout component

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
          <Route path="/deposit-account" element={<DepositAccount />} />
          <Route path="/apds-loan" element={<APDSLoanPage />} />
          <Route path="/tuition-fee-collection" element={<TuitionFeeCollection />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bills-payment" element={<BillsPayment />} />
          <Route path="/cebuana-services" element={<CebuanaServices />} />
          <Route path="/pera-padala" element={<PeraPadala />} />
          <Route path="international-remittance" element={<InternationalRemittance />} />
          <Route path="/cash-in-cash-out" element={<Cashincashout />} /> {/* Corrected component name */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
