import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./WelcomePage";
import OurServices from "./Pages/OurServices";
import Features from "./Pages/Features";
import Advisories from "./Pages/Advisories";
import Careers from "./Pages/Careers";
import Branches from "./Pages/Branches";
import SaturdayBranches from "./Pages/SaturdayBranches";
import DepositAccount from "./Pages/DepositAccount";
import APDSLoanPage from "./Pages/APDSLoanPage";
import TuitionFeeCollection from "./Pages/TuitionFeeCollection";
import ExplorePage from "./Pages/ExplorePage"; // ✅ Correct import for the explore page
import BillsPayment from "./Pages/BillsPayment";
import Loans from "./Pages/Loans";
import AnnualReports from "./Pages/AnnualReports";
import AspacBankBalanceSheet from "./Pages/AspacBankBalanceSheet"; // ✅ Added import
import AnnualReport2024 from "./components/advisories/AnnualReport2024";

import "./index.css";
import { FooterBadge } from "./module/FooterBadge";
import { ChatBot } from "./components/ChatBot";
import AnnualReport from "./Pages/AnnualReport";
import NotFound from "./Pages/NotFound";

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/our-services" element={<OurServices />} />
          <Route path="/features" element={<Features />} />
          <Route path="/advisories" element={<Advisories />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/branches" element={<Branches />} />
          <Route path="/saturday-branches" element={<SaturdayBranches />} />
          <Route path="/deposit-account" element={<DepositAccount />} />

          {/* ✅ New path for APDS page */}
          <Route path="/teachers-loan" element={<APDSLoanPage />} />

          <Route
            path="/tuition-fee-collection"
            element={<TuitionFeeCollection />}
          />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/bills-payment" element={<BillsPayment />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/annual-reports" element={<AnnualReports />} />

          {/* ✅ Added route for ASPACBank Balance Sheet */}
          <Route
            path="/advisories/financial-overview/aspacbank-balance-sheet"
            element={<AspacBankBalanceSheet />}
          />
          <Route path="/AnnualReport2024" element={<AnnualReport2024 />} />
          <Route path="/Annual" element={<AnnualReport/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </main>
         <ChatBot />
        {/* <Footer /> */}
        <FooterBadge/>
      </div>
    </Router>
  );
};

export default App;
