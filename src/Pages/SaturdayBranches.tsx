import React from "react";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarCheck,
  FaLandmark,
  FaInfoCircle,
} from "react-icons/fa";
import { branches } from "../data/branches";
import Seo from "../components/Seo";

const getShortBranchName = (name: string) =>
  name.replace(/^ASPAC Bank\s+/i, "").trim();

const saturdayBranches = branches.filter((branch) => branch.saturdayHours);

const SaturdayBranches: React.FC = () => {
  return (
    <>
      <Seo
        title="Branches Open on Saturdays | ASPAC Bank"
        description="Find ASPAC Rural Bank branches open on Saturdays from 9:00 AM to 3:00 PM. Bank with us even on weekends at select branch locations across Cebu."
        canonical="https://www.aspacbank.com/saturday-branches"
        ogType="website"
        ogImage="https://www.aspacbank.com/favicon.ico"
        ogImageAlt="ASPAC Bank Saturday Branches"
        ogSiteName="ASPAC Bank"
        ogLocale="en_PH"
        themeColor="#459243"
        iconHref="https://www.aspacbank.com/favicon.ico"
        appleTouchIconHref="https://www.aspacbank.com/favicon.ico"
        manifestHref="https://www.aspacbank.com/manifest.json"
        includeTwitter={false}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "ASPAC Bank Branches Open on Saturdays",
          description:
            "List of ASPAC Rural Bank branches open on Saturdays from 9:00 AM to 3:00 PM.",
          url: "https://www.aspacbank.com/saturday-branches",
          publisher: {
            "@type": "Organization",
            name: "ASPAC Bank",
            url: "https://www.aspacbank.com",
            logo: "https://www.aspacbank.com/favicon.ico",
            sameAs: ["https://www.facebook.com/aspacbank0620/"],
          },
        }}
      />

      <section className="min-h-screen w-full bg-gray-50 pt-24">
        {/* HERO */}
        <div className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-10">
          {/* Cover photo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/saturdaybanking.png')" }}
            role="img"
            aria-label="ASPAC Bank branch building"
          />
          {/* Brand-green wash for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#2f6b2e]/95 via-[#459243]/90 to-[#357a35]/90" />

          {/* Decorative accents */}
          <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-[#EBD839]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative mx-auto max-w-5xl text-center">
            <div className="mb-5 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/30 backdrop-blur-sm">
                <FaLandmark className="text-3xl text-[#EBD839]" />
              </div>
            </div>

            <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#EBD839] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#2f6b2e] shadow-sm">
              <FaCalendarCheck />
              Weekend Banking
            </span>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Branches Open on Saturdays
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
              Bank with us even on Saturdays. Selected ASPAC Rural Bank
              branches are open to serve you from 9:00 AM to 3:00 PM.
            </p>

            <div className="mt-8 inline-flex flex-col items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-4 backdrop-blur-sm sm:flex-row sm:gap-4">
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#EBD839]">
                <FaClock />
                Saturday Hours
              </span>
              <span className="text-xl font-bold text-white sm:text-2xl">
                9:00 AM – 3:00 PM
              </span>
            </div>
          </div>
        </div>

        {/* BRANCH GRID */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-16 lg:px-10">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[#459243] sm:text-3xl">
              Saturday Branch Locations
            </h2>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 sm:text-base">
              The following {saturdayBranches.length} branches welcome
              customers on Saturdays, in addition to regular weekday hours.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {saturdayBranches.map((branch) => (
              <div
                key={branch.name}
                className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#459243]/30 hover:shadow-lg"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#459243]/10 text-[#459243] transition-colors duration-300 group-hover:bg-[#459243] group-hover:text-white">
                    <FaLandmark className="text-xl" />
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-[#EBD839]/25 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#6b5e0f]">
                    <FaCalendarCheck className="text-[#b89f14]" />
                    Open Saturday
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900">
                  {getShortBranchName(branch.name)}
                </h3>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                  ASPAC Rural Bank Branch
                </p>

                <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
                  <FaMapMarkerAlt className="mt-0.5 shrink-0 text-[#459243]" />
                  <span>{branch.address}</span>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-gray-100 pt-4 text-sm">
                  <FaClock className="shrink-0 text-[#459243]" />
                  <span className="font-semibold text-gray-800">
                    9:00 AM – 3:00 PM
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADDITIONAL INFO */}
        <div className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-10">
          <div className="rounded-2xl border border-[#459243]/15 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#459243]/10 text-[#459243]">
                <FaCalendarCheck className="text-lg" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 sm:text-lg">
                  Saturday Banking
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base">
                  Selected ASPAC Rural Bank branches are available every
                  Saturday from 9:00 AM to 3:00 PM to make your banking more
                  convenient.
                </p>

                <p className="mt-4 flex items-start gap-2 text-xs text-gray-400">
                  <FaInfoCircle className="mt-0.5 shrink-0" />
                  Branch schedules may be subject to change during holidays
                  or special banking advisories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SaturdayBranches;
