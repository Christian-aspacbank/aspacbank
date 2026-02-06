import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchableSelect from "./SearchableSelect";
import AttachmentField, { AttachmentValue } from "./AttachmentField";

type ApplyFormState = {
  fullName: string;
  mobileNumber: string;
  email: string;
  schoolOrOffice: string;

  station: string; // ✅ must exist
  division: string; // ✅ must exist

  loanAmount: string;
  desiredTermMonths: string;
  remarks: string;
};

const DEFAULT_FORM: ApplyFormState = {
  fullName: "",
  mobileNumber: "",
  email: "",
  schoolOrOffice: "",

  station: "", // ✅ must exist
  division: "", // ✅ must exist

  loanAmount: "",
  desiredTermMonths: "",
  remarks: "",
};

const generateReferenceNo = () => {
  const now = new Date();

  const datePart = now
    .toLocaleDateString("en-CA", { timeZone: "Asia/Manila" })
    .replace(/-/g, "");

  const timePart = now
    .toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour12: false })
    .replace(/:/g, "");

  const randPart = Math.random().toString(36).slice(2, 5).toUpperCase();

  return `APDS-${datePart}-${timePart}-${randPart}`;
};

const formatMoney = (value: string) => {
  const cleaned = String(value).replace(/,/g, "").trim();
  const n = Number(cleaned);
  if (!cleaned) return "";
  if (Number.isNaN(n)) return value;
  return n.toLocaleString("en-PH");
};

const toTitleCase = (value: string) => {
  return value
    .split(" ")
    .map((word) =>
      word.length > 0 ? word[0].toUpperCase() + word.slice(1) : "",
    )
    .join(" ");
};

export interface ApplyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "consents" | "statement" | "form";

const DATA_PRIVACY_WAIVER_TEXT = `CLIENT INFORMATION / DATA PRIVACY WAIVER
I / we / undersigned hereby waived my / our rights and benefits under the provisions of R.A. 9510 (Credit Information System Act), R.A. 1405 (Secrecy of Bank Deposit Act), R.A. 6426 (Foreign Currency Deposits Act), R.A. 8791 (General Banking Law), R.A. 9160 (Anti-Money Laundering Act). RA 10173 (Data Privacy Act) and other laws on confidentiality of bank account, credit, loan and other related information (e.g. personal and sensitive data), and hereby authorize the Bank and / or its representatives to share, divulge, or make necessary disclosure of such otherwise confidential information or document which I / we / undersigned have submitted or disclosed to the Bank and / or its representatives in connection with my application and/or the grant thereof, and as may be necessary or in connection with acceptable banking practice/s, to third parties, including, but not limited to. the Bank’s affiliates, subsidiaries, agents, assigns or service providers, the Banker’s Association of the Philippines – Credit Bureau (BAP-CB) or the Credit Information Corporation (CIC) or other credit bureau or to any similarly authorized central monitoring entity or recipients or lenders duly authorized to share / collect / utilize / store such data derived therefrom, the Bangko Sentral ng Pilipinas (BSP), Anti-Money Laundering Council (AMLC) or other regulatory/auditing bodies / entities, as may be provided for by law and / or required by competent authority.
I / we / undersigned understand that the Bank may obtain further information concerning any information or statement made herein from appropriate sources, including but not limited to my previous and current employer/s, credit bureaus and agencies, banks, credit card companies and other financial institutions, relevant government agencies, barangay and/or homeowners’ association of the village / subdivision where I reside. I hereby authorize full disclosure of any information to the Bank by the afore-mentioned sources, and for this purpose expressly waive my rights under applicable bank secrecy laws.
I / we / undersigned further authorize the Bank, to conduct random verification with the Bureau of Internal Revenue (the “BIR”) in order to establish the authenticity of my tax statements (the “ITR”) and the accompanying financial statements / documents submitted to the Bank in accordance with banking regulatory requirements and / or to process, report, share and disclose my/our information to domestic or foreign authorities and / or tax authorities and / or withhold from me / us, such amounts as may be required by domestic or foreign regulatory and / or tax authorities in accordance with the requirements of United States Foreign Account Tax Compliance (FATCA), and such other rules and regulations issued and/or may be issued, by the Government of the Philippines in connection with FATCA as well as request information regarding the status of any court case to which I / we / undersigned am / are a party / parties to.
I / we / undersigned agree to hold the Bank free and harmless from any and all liabilities, claims and demands of whatever kind or nature in connection with or arising from the aforementioned collection, processing, use, storage, updating and transfer / disclosure / sharing / communication / reporting of information relating to me or my accounts pursuant to and in compliance with the consent given by me under this Agreement. The foregoing consent shall continue for the duration of, and shall survive the termination of this Agreement, or payment of any credit / loan / financial accommodation extended to me or transaction / dealing / arrangement / account, I may have with, or avail from the Bank.
SMS AND E-MAIL NOTICES. In addition to the above provisions, I / we / undersigned hereby agree, allow and authorize the Bank, its, affiliates and / or subsidiaries and their respective representatives, service providers and agents to send notices, instructions, alerts, reminders and relevant communications through broadcast messaging service, multi-media messaging service, short message service (SMS), otherwise known as “text messaging” and through e-mail or other media platforms concerning my loan, other account with the Bank and bank product offers.
I hereby hold the Bank free and harmless against any and all liabilities, including but not limited to, those relating to any violation of secrecy laws or regulations (if any), should third persons view or access my personal mobile / cellular phone and / or e-mail account. Furthermore, the Bank does not guarantee the timely delivery or absolute accuracy of any SMS or text sent to me, which may be delayed or corrupted on account of technological disruptions caused by third party mobile service providers and other factors beyond the control of the Bank.
It is agreed and understood that unless and until the Bank is in receipt of a written notice from the Borrower not to be sent such messages, the Borrower's authority as given herein shall be deemed continuing, valid and effective.`;

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<ApplyFormState>(DEFAULT_FORM);

  // ✅ attachment state (MUST be inside component)
  const [attachment, setAttachment] = useState<AttachmentValue>({
    file: null,
    error: null,
  });

  // ✅ validation flags
  const [consentsTouched, setConsentsTouched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  type FieldKey = keyof ApplyFormState;
  const [fieldTouched, setFieldTouched] = useState<
    Partial<Record<FieldKey, boolean>>
  >({});

  const touchField = (key: FieldKey) =>
    setFieldTouched((prev) => ({ ...prev, [key]: true }));

  const showError = (key: FieldKey) => !!submitAttempted || !!fieldTouched[key];

  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string>(generateReferenceNo());

  const [honeypot, setHoneypot] = useState("");
  const openedAtRef = useRef<number>(Date.now());

  const [schools, setSchools] = useState<string[]>([]);
  const [schoolsLoading, setSchoolsLoading] = useState(false);

  const [step, setStep] = useState<Step>("consents");
  const [agreeUndertaking, setAgreeUndertaking] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);

  // ✅ must scroll waiver to bottom before buttons appear
  const [waiverScrolledBottom, setWaiverScrolledBottom] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    setSchoolsLoading(true);

    fetch("/data/cebu_schools.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Schools JSON HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setSchools(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load schools:", err);
        setSchools([]);
      })
      .finally(() => setSchoolsLoading(false));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    // reset modal
    setReferenceNo(generateReferenceNo());
    setForm(DEFAULT_FORM);
    setAttachment({ file: null, error: null });

    setConsentsTouched(false);
    setSubmitAttempted(false);
    setFieldTouched({});
    setStatusMsg(null);

    openedAtRef.current = Date.now();
    setHoneypot("");

    setStep("consents");
    setAgreeUndertaking(false);
    setAgreePrivacy(false);
    setWaiverScrolledBottom(false);

    // load schools
    setSchoolsLoading(true);
    fetch("/data/cebu_schools.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw new Error(`Schools JSON HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => setSchools(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Failed to load schools:", err);
        setSchools([]);
      })
      .finally(() => setSchoolsLoading(false));
  }, [isOpen]);

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false;

    const mobile = form.mobileNumber.replace(/\D/g, "");
    if (mobile.length !== 11) return false;

    const email = form.email.trim().toLowerCase();
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email);
    if (!isEmailValid) return false;

    if (!form.schoolOrOffice.trim()) return false;

    const amount = Number(form.loanAmount.replace(/,/g, "").trim());
    if (!Number.isFinite(amount) || amount <= 0) return false;

    if (!form.desiredTermMonths.trim()) return false;

    // ✅ attachment is REQUIRED
    if (!attachment.file) return false;
    if (attachment.error) return false;

    return true;
  }, [form, attachment.file, attachment.error]);

  const update = <K extends keyof ApplyFormState>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onContinueFromConsents = () => {
    setConsentsTouched(true);
    setStatusMsg(null);

    if (!agreeUndertaking || !agreePrivacy) {
      setStatusMsg("Please check both consent boxes to continue.");
      return;
    }

    setWaiverScrolledBottom(false);
    setStep("statement");
  };

  const onAgreeStatement = () => {
    // ✅ clear form validation before entering form
    setSubmitAttempted(false);
    setFieldTouched({});
    setStatusMsg(null);
    setStep("form");
  };

  const onDoNotAgree = () => {
    setStatusMsg(null);
    setWaiverScrolledBottom(false);
    setStep("consents");
    setAgreeUndertaking(false);
    setAgreePrivacy(false);
    onClose(); // ✅ close entire modal
  };

  const onWaiverScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
    const el = e.currentTarget;
    const threshold = 6; // allowance
    const atBottom =
      el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;
    if (atBottom) setWaiverScrolledBottom(true);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ show field errors only on form step submit attempt
    if (step === "form") setSubmitAttempted(true);

    setStatusMsg(null);

    if (step !== "form") {
      setStatusMsg(
        "Please complete the Agreement and Data Privacy steps first.",
      );
      return;
    }

    if (!isValid) return;

    // ✅ REQUIRED ATTACHMENT CHECK
    if (!attachment.file) {
      setAttachment((prev) => ({
        ...prev,
        error: "Attachment is required.",
      }));
      setStatusMsg("Please attach a file before submitting.");
      return;
    }

    // ✅ clear previous "required" error once file exists
    if (attachment.error === "Attachment is required.") {
      setAttachment((prev) => ({ ...prev, error: null }));
    }

    if (attachment.error) {
      setStatusMsg(attachment.error);
      return;
    }

    const elapsedMs = Date.now() - openedAtRef.current;
    if (elapsedMs < 4000) {
      setStatusMsg(
        "Please review the form for a few seconds before submitting.",
      );
      return;
    }

    // Bot honeypot (if filled, pretend success)
    if (honeypot.trim()) {
      setStatusMsg("✅ Application sent successfully!");
      setForm(DEFAULT_FORM);
      setAttachment({ file: null, error: null });

      // ✅ reset validation flags
      setSubmitAttempted(false);
      setFieldTouched({});

      setTimeout(() => onClose(), 800);
      return;
    }

    const COOLDOWN_MS = 15000;
    const key = "apds_apply_last_submit";
    const last = Number(localStorage.getItem(key) || 0);
    if (last && Date.now() - last < COOLDOWN_MS) {
      setStatusMsg("Please wait 15 seconds before submitting again.");
      return;
    }
    localStorage.setItem(key, String(Date.now()));

    const submittedAt = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
    });

    setIsSending(true);

    try {
      const fd = new FormData();

      fd.append("referenceNo", referenceNo);
      fd.append("fullName", form.fullName.trim());
      fd.append("email", form.email.trim());
      fd.append("mobile", form.mobileNumber.trim());
      fd.append("school", form.schoolOrOffice.trim());

      // ✅ separated
      fd.append("division", (form.division || "-").trim());
      fd.append("station", (form.station || "-").trim());

      fd.append("loanAmount", formatMoney(form.loanAmount));
      fd.append("termMonths", form.desiredTermMonths);
      fd.append("remarks", form.remarks?.trim() ? form.remarks.trim() : "-");
      fd.append("submittedAt", submittedAt);
      fd.append("website", honeypot);

      // ✅ attachment (optional)
      if (attachment.file) {
        fd.append("attachment", attachment.file!, attachment.file!.name);
      }

      const API_BASE =
        process.env.NODE_ENV === "development" ? "http://localhost:4000" : "";

      const resp = await fetch(`${API_BASE}/api/submit`, {
        method: "POST",
        body: fd, // ✅ multipart/form-data
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            "❌ Failed to send. Please try again.",
        );
      }

      setStatusMsg("✅ Application sent successfully!");
      setForm(DEFAULT_FORM);
      setAttachment({ file: null, error: null });

      // ✅ reset validation flags
      setSubmitAttempted(false);
      setFieldTouched({});

      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setStatusMsg(err?.message || "❌ Failed to send. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start sm:items-center z-50 px-4 pt-10 pb-6 sm:py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => !isSending && onClose()}
        >
          <motion.div
            className="bg-white mt-10 sm:mt-16 p-4 sm:p-8 rounded-2xl w-full max-w-md sm:max-w-xl shadow-2xl max-h-[85svh] overflow-y-auto"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-900">
                  Connect with ARBI Now!
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Reference No:{" "}
                  <span className="font-semibold font-mono text-gray-800">
                    {referenceNo}
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Fill out the form below to apply for APDS loan.
                </p>
              </div>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
                onClick={onClose}
                disabled={isSending}
                aria-label="Close Inquire Now form"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
            >
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label>Company</label>
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* STEP 0 */}
              {step === "consents" && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Please review and confirm
                  </p>

                  <label className="mt-3 flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 accent-green-700"
                      checked={agreeUndertaking}
                      onChange={(e) => setAgreeUndertaking(e.target.checked)}
                      disabled={isSending}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        AGREEMENT AND UNDERTAKING
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        By submitting this inquiry, I certify and agree to the
                        following: I hereby voluntarily provide the details
                        herein to ASPAC Bank for the purpose of responding to my
                        loan inquiry. I consent to the Bank contacting me
                        through the contact information I have provided for this
                        said purpose including requests for additional
                        information and document submission. I agree to receive
                        product updates, offers, and advisories. I understand
                        this is not required to process my inquiry and I may opt
                        out anytime. I authorize the Bank and its service
                        providers (including intragroup entities and duly
                        contracted third parties) to conduct credit and
                        background checks and process my data solely for the
                        purposes stated above, with confidentiality and
                        safeguards consistent with BSP’s Financial Consumer
                        Protection and IT/security standards.
                      </p>
                    </div>
                  </label>

                  <label className="mt-4 flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="mt-1 h-5 w-5 accent-green-700"
                      checked={agreePrivacy}
                      onChange={(e) => setAgreePrivacy(e.target.checked)}
                      disabled={isSending}
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        DATA PRIVACY CONSENT
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                        In compliance with the requirements of the Data Privacy
                        Act, I hereby give my consent to ASPAC Bank Inc. and its
                        subsidiaries/affiliates to process, collect, store, and
                        access my personal and/or sensitive personal information
                        obtained in the course of my transaction/s with ASPAC
                        Bank Inc.
                      </p>
                    </div>
                  </label>

                  <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-end">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSending}
                      className="w-full sm:w-auto bg-gray-100 text-gray-800 font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-sm transition hover:bg-gray-200 disabled:opacity-60"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={onContinueFromConsents}
                      disabled={isSending || !agreeUndertaking || !agreePrivacy}
                      className="w-full sm:w-auto bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-lg transition hover:scale-[1.02] hover:bg-green-800 disabled:opacity-60"
                    >
                      Continue
                    </button>
                  </div>

                  {consentsTouched && statusMsg && (
                    <div className="text-sm rounded-lg bg-white border border-gray-200 p-3 mt-3">
                      {statusMsg}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 1 */}
              {step === "statement" && (
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <p className="text-sm font-semibold text-gray-800">
                    Client Information / Data Privacy Waiver
                  </p>

                  <div
                    className="mt-2 rounded-lg border border-gray-200 bg-white p-3 max-h-[45svh] overflow-y-auto"
                    onScroll={onWaiverScroll}
                  >
                    <pre className="whitespace-pre-wrap text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                      {DATA_PRIVACY_WAIVER_TEXT}
                    </pre>
                  </div>

                  {!waiverScrolledBottom && (
                    <p className="text-xs text-gray-500 mt-2">
                      Please scroll to the bottom to show the buttons.
                    </p>
                  )}

                  {waiverScrolledBottom && (
                    <div className="mt-4 flex flex-cols sm:flex-row gap-3 justify-end">
                      <button
                        type="button"
                        onClick={onDoNotAgree}
                        disabled={isSending}
                        className="w-full sm:w-auto bg-gray-100 text-gray-800 font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-sm transition hover:bg-gray-200 disabled:opacity-60"
                      >
                        I Do Not Agree
                      </button>

                      <button
                        type="button"
                        onClick={onAgreeStatement}
                        disabled={isSending}
                        className="w-full sm:w-auto bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-lg transition hover:scale-[1.02] hover:bg-green-800 disabled:opacity-60"
                      >
                        I Agree
                      </button>
                    </div>
                  )}

                  {statusMsg && (
                    <div className="text-sm rounded-lg bg-white border border-gray-200 p-3 mt-3">
                      {statusMsg}
                    </div>
                  )}
                </div>
              )}

              {step === "form" && (
                <>
                  {/* SECTION 1: Personal Information */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Personal Information
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Full Name */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="Full Name"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.fullName}
                          onChange={(e) =>
                            update("fullName", toTitleCase(e.target.value))
                          }
                          onBlur={() => touchField("fullName")}
                          disabled={isSending}
                        />
                        {showError("fullName") && !form.fullName.trim() && (
                          <p className="text-xs text-red-600 mt-1">
                            Full name is required.
                          </p>
                        )}
                      </div>

                      {/* Mobile */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="09XXXXXXXXX"
                          inputMode="numeric"
                          pattern="\d*"
                          maxLength={11}
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.mobileNumber}
                          onChange={(e) => {
                            const digitsOnly = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 11);
                            update("mobileNumber", digitsOnly);
                          }}
                          onKeyDown={(e) => {
                            const allowed = [
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "Tab",
                            ];
                            if (!allowed.includes(e.key) && !/^\d$/.test(e.key))
                              e.preventDefault();
                          }}
                          onBlur={() => touchField("mobileNumber")}
                          disabled={isSending}
                        />
                        {showError("mobileNumber") &&
                          form.mobileNumber.replace(/\D/g, "").length !==
                            11 && (
                            <p className="text-xs text-red-600 mt-1">
                              Mobile number should be 11 digits (e.g.,
                              09XXXXXXXXX).
                            </p>
                          )}
                      </div>

                      {/* Email - full row on desktop */}
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="name@gmail.com"
                          type="email"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.email}
                          onChange={(e) => update("email", e.target.value)}
                          onBlur={() => {
                            touchField("email");
                            update("email", form.email.trim());
                          }}
                          disabled={isSending}
                        />
                        {showError("email") && !form.email.trim() && (
                          <p className="text-xs text-red-600 mt-1">
                            Email is required.
                          </p>
                        )}
                        {showError("email") &&
                          form.email.trim() &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(
                            form.email.trim(),
                          ) && (
                            <p className="text-xs text-red-600 mt-1">
                              Please enter a valid email (e.g., name@gmail.com).
                            </p>
                          )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: Assignment / Location (Separated Division + Station) */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Assignment / Location
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Division */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Division <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="Division"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.division}
                          onChange={(e) =>
                            update("division", toTitleCase(e.target.value))
                          }
                          onBlur={() => touchField("division")}
                          disabled={isSending}
                        />
                        {showError("division") && !form.division.trim() && (
                          <p className="text-xs text-red-600 mt-1">
                            Division is required.
                          </p>
                        )}
                      </div>

                      {/* Station */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Station <span className="text-red-500">*</span>
                        </label>
                        <input
                          placeholder="Station"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.station}
                          onChange={(e) =>
                            update("station", toTitleCase(e.target.value))
                          }
                          onBlur={() => touchField("station")}
                          disabled={isSending}
                        />
                        {showError("station") && !form.station.trim() && (
                          <p className="text-xs text-red-600 mt-1">
                            Station is required.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: Loan Details */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4">
                    <p className="text-sm font-semibold text-gray-800">
                      Loan Details
                    </p>

                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* School / Office */}
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                          School / Office{" "}
                          <span className="text-red-500">*</span>
                        </label>

                        <SearchableSelect
                          value={form.schoolOrOffice}
                          options={schools}
                          placeholder={
                            schoolsLoading
                              ? "Loading schools..."
                              : "Search school (or type if not listed)"
                          }
                          disabled={isSending}
                          onChange={(v) => update("schoolOrOffice", v)}
                          onBlur={() => touchField("schoolOrOffice")}
                          maxResults={12}
                        />

                        {showError("schoolOrOffice") &&
                          !form.schoolOrOffice.trim() && (
                            <p className="text-xs text-red-600 mt-1">
                              School/Office is required.
                            </p>
                          )}
                      </div>

                      {/* Loan Amount */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Loan Amount (PHP){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          inputMode="numeric"
                          pattern="^[0-9,]*$"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                          value={form.loanAmount}
                          onChange={(e) => {
                            const digitsOnly = e.target.value.replace(
                              /[^\d]/g,
                              "",
                            );
                            update("loanAmount", formatMoney(digitsOnly));
                          }}
                          onKeyDown={(e) => {
                            const allowed = [
                              "Backspace",
                              "Delete",
                              "ArrowLeft",
                              "ArrowRight",
                              "Tab",
                            ];
                            if (!allowed.includes(e.key) && !/^\d$/.test(e.key))
                              e.preventDefault();
                          }}
                          onBlur={() => touchField("loanAmount")}
                          disabled={isSending}
                        />
                        {showError("loanAmount") && !form.loanAmount.trim() && (
                          <p className="text-xs text-red-600 mt-1">
                            Loan amount is required.
                          </p>
                        )}
                      </div>

                      {/* Term */}
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Desired Term (Months){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <select
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
                          value={form.desiredTermMonths}
                          onChange={(e) =>
                            update("desiredTermMonths", e.target.value)
                          }
                          onBlur={() => touchField("desiredTermMonths")}
                          disabled={isSending}
                        >
                          <option value="" disabled>
                            Select term
                          </option>
                          <option value="6">6 months</option>
                          <option value="12">12 months</option>
                          <option value="18">18 months</option>
                          <option value="24">24 months</option>
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60">60 months</option>
                        </select>

                        {showError("desiredTermMonths") &&
                          !form.desiredTermMonths.trim() && (
                            <p className="text-xs text-red-600 mt-1">
                              Term is required.
                            </p>
                          )}
                      </div>

                      {/* Attachment */}
                      <div className="sm:col-span-2">
                        <AttachmentField
                          value={attachment}
                          onChange={setAttachment}
                          disabled={isSending}
                          label="Latest Payslip"
                          required={true}
                          maxSizeMB={5}
                        />
                      </div>

                      {/* Remarks */}
                      <div className="sm:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                          Remarks
                        </label>
                        <textarea
                          placeholder="Optional notes (e.g., preferred contact time)"
                          className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 min-h-[70px] sm:min-h-[90px]"
                          value={form.remarks}
                          onChange={(e) => update("remarks", e.target.value)}
                          disabled={isSending}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  {statusMsg && (
                    <div className="text-sm rounded-lg bg-gray-50 border border-gray-200 p-3">
                      {statusMsg}
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      disabled={isSending}
                      className="w-full sm:w-auto bg-gray-100 text-gray-800 font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-sm transition hover:bg-gray-200 disabled:opacity-60"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full sm:w-auto bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-lg transition hover:scale-[1.02] hover:bg-green-800 disabled:opacity-60"
                    >
                      {isSending ? "Sending..." : "Submit Application"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyNowModal;
