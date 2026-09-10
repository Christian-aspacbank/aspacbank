import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./WelcomePage";

import "./index.css";
import { FooterBadge } from "./module/FooterBadge";
import { ChatBot } from "./components/ChatBot";

// Route-level code splitting: everything except the homepage/navbar loads
// on demand, so e.g. pdfjs-dist (pulled in by AnnualReports/AnnualReport2024
// via ReadonlyPdfViewer) no longer ships in the initial bundle for every visitor.
const OurServices = lazy(() => import("./Pages/OurServices"));
const Features = lazy(() => import("./Pages/Features"));
const Advisories = lazy(() => import("./Pages/Advisories"));
const Careers = lazy(() => import("./Pages/Careers"));
const Branches = lazy(() => import("./Pages/Branches"));
const SaturdayBranches = lazy(() => import("./Pages/SaturdayBranches"));
const DepositAccount = lazy(() => import("./Pages/DepositAccount"));
const APDSLoanPage = lazy(() => import("./Pages/APDSLoanPage"));
const TuitionFeeCollection = lazy(() => import("./Pages/TuitionFeeCollection"));
const ExplorePage = lazy(() => import("./Pages/ExplorePage"));
const BillsPayment = lazy(() => import("./Pages/BillsPayment"));
const Loans = lazy(() => import("./Pages/Loans"));
const AnnualReports = lazy(() => import("./Pages/AnnualReports"));
const AspacBankBalanceSheet = lazy(() => import("./Pages/AspacBankBalanceSheet"));
const AnnualReport2024 = lazy(() => import("./components/advisories/AnnualReport2024"));
const AnnualReport = lazy(() => import("./Pages/AnnualReport"));
const NotFound = lazy(() => import("./Pages/NotFound"));

const App: React.FC = () => {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[1000] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-green-800 focus:shadow-lg"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1}>
        <Suspense
          fallback={
            <div className="flex min-h-[50vh] items-center justify-center">
              <span className="sr-only">Loading page…</span>
            </div>
          }
        >
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
        </Suspense>
        </main>
         <ChatBot />
        {/* <Footer /> */}
        <FooterBadge/>
      </div>
    </Router>
  );
};

export default App;
