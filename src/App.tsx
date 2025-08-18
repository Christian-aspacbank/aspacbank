import React from "react";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./WelcomePage";
import OurServices from "./Pages/OurServices";
import Features from "./Pages/Features";
import Advisories from "./Pages/Advisories";
import Careers from "./Pages/Careers";
import Branches from "./Pages/Branches";
import DepositAccount from "./Pages/DepositAccount";
import APDSLoanPage from "./Pages/APDSLoanPage";
import TuitionFeeCollection from "./Pages/TuitionFeeCollection";
import ExplorePage from "./Pages/ExplorePage"; // ✅ Correct import for the explore page
import BillsPayment from "./Pages/BillsPayment";
import Loans from "./Pages/Loans";

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
          <Route path="/teachersalary-loanform" element={<APDSLoanPage />} />
          <Route
            path="/tuition-fee-collection"
            element={<TuitionFeeCollection />}
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bills-payment" element={<BillsPayment />} />

          <Route path="/loans" element={<Loans />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
