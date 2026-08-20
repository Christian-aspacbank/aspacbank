import React from "react";

export type AdvisoryKind =
  | "Holiday"
  | "Closure"
  | "Relocation"
  | "Compliance"
  | "Service"
  | "General";

export interface NearbyBranch {
  name: string;
  address: string;
  phone: string;
  hours: string;
  saturdayHours?: string;
}

export interface Advisory {
  id: string;
  kind: AdvisoryKind;
  title: string;
  effective: string; 
  summary?: string;
  paragraphs: string[];
  cta?: { label: string; href: string };
  accent?: string; 
  extra?: React.ReactNode;
}

export const KIND_BADGE: Record<AdvisoryKind, { bg: string; text: string; border: string }> = {
  Closure: { bg: "bg-amber-50 text-amber-800 border-amber-200", text: "text-amber-800", border: "border-amber-500" },
  Relocation: { bg: "bg-blue-50 text-blue-800 border-blue-200", text: "text-blue-800", border: "border-blue-500" },
  Compliance: { bg: "bg-purple-50 text-purple-800 border-purple-200", text: "text-purple-800", border: "border-purple-500" },
  Service: { bg: "bg-emerald-50 text-emerald-800 border-emerald-200", text: "text-emerald-800", border: "border-emerald-500" },
  General: { bg: "bg-slate-50 text-slate-800 border-slate-200", text: "text-slate-800", border: "border-slate-500" },
  Holiday: { bg: "bg-rose-50 text-rose-800 border-rose-200", text: "text-rose-800", border: "border-rose-500" },
};

export const NEARBY_BRANCHES: NearbyBranch[] = [
  {
    name: "ASPAC BANK – Danao Branch",
    address: "Pio Del Pilar St., Danao City, Cebu",
    phone: "0917-108-6575",
    hours: "9:00 AM – 3:00 PM (Mon–Fri)",
    saturdayHours: "9:00 AM – 3:00 PM (Sat)",
  },
  {
    name: "ASPAC BANK – Bantayan Branch",
    address: "Ticad, Poblacion Bantayan, Cebu",
    phone: "0917-128-4422",
    hours: "9:00 AM – 3:00 PM (Mon–Fri)",
  },
];