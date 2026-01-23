import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";

type ApplyFormState = {
  fullName: string;
  mobileNumber: string;
  email: string;
  schoolOrOffice: string;
  stationOrCity: string;
  loanAmount: string;
  desiredTermMonths: string;
  remarks: string;
};

const DEFAULT_FORM: ApplyFormState = {
  fullName: "",
  mobileNumber: "",
  email: "",
  schoolOrOffice: "",
  stationOrCity: "",
  loanAmount: "",
  desiredTermMonths: "",
  remarks: "",
};

const generateReferenceNo = () => {
  const now = new Date();

  const datePart = now
    .toLocaleDateString("en-CA", { timeZone: "Asia/Manila" }) // YYYY-MM-DD
    .replace(/-/g, "");

  const timePart = now
    .toLocaleTimeString("en-GB", { timeZone: "Asia/Manila", hour12: false }) // HH:MM:SS
    .replace(/:/g, ""); // HHMMSS

  const randPart = Math.random().toString(36).slice(2, 5).toUpperCase();

  return `APDS-${datePart}-${timePart}-${randPart}`;
};

const formatMoney = (value: string) => {
  const cleaned = String(value).replace(/,/g, "").trim();
  const n = Number(cleaned);
  if (!cleaned) return "";
  if (Number.isNaN(n)) return value; // keep as-is if non-numeric
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

const ApplyNowModal: React.FC<ApplyNowModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState<ApplyFormState>(DEFAULT_FORM);
  const [touched, setTouched] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [referenceNo, setReferenceNo] = useState<string>(generateReferenceNo());

  const [honeypot, setHoneypot] = useState("");
  const openedAtRef = useRef<number>(Date.now());

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  const [mobileBlurred, setMobileBlurred] = useState(false);
  const [emailBlurred, setEmailBlurred] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setReferenceNo(generateReferenceNo());
      setForm(DEFAULT_FORM);
      setTouched(false);
      setStatusMsg(null);
      setMobileBlurred(false);
      setEmailBlurred(false);

      // Bot protection resets
      openedAtRef.current = Date.now();
      setHoneypot("");
    }
  }, [isOpen]);

  const isValid = useMemo(() => {
    if (!form.fullName.trim()) return false;

    const mobile = form.mobileNumber.replace(/\D/g, "");
    if (mobile.length !== 11) return false;

    const email = form.email.trim().toLowerCase();
    const isComEmail = /^[^\s@]+@[^\s@]+\.com$/i.test(email);
    if (!isComEmail) return false;

    if (!form.schoolOrOffice.trim()) return false;

    const amount = Number(form.loanAmount.replace(/,/g, "").trim());
    if (!Number.isFinite(amount) || amount <= 0) return false;

    if (!form.desiredTermMonths.trim()) return false;

    return true;
  }, [form]);

  const update = <K extends keyof ApplyFormState>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setStatusMsg(null);

    if (!isValid) return;

    // Bot protection (time on page)
    const elapsedMs = Date.now() - openedAtRef.current;
    if (elapsedMs < 4000) {
      setStatusMsg(
        "Please review the form for a few seconds before submitting.",
      );
      return;
    }

    // Honeypot
    if (honeypot.trim()) {
      setStatusMsg("✅ Application sent successfully!");
      setForm(DEFAULT_FORM);
      setTouched(false);
      setMobileBlurred(false);
      setEmailBlurred(false);
      setTimeout(() => onClose(), 800);
      return;
    }

    // Cooldown (per browser)
    const COOLDOWN_MS = 15000; // 15 seconds
    const key = "apds_apply_last_submit";
    const last = Number(localStorage.getItem(key) || 0);
    if (last && Date.now() - last < COOLDOWN_MS) {
      setStatusMsg("Please wait 15 seconds before submitting again.");
      return;
    }
    localStorage.setItem(key, String(Date.now()));

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatusMsg(
        "EmailJS not configured. Check .env.local REACT_APP_* values.",
      );
      return;
    }

    const submittedAt = new Date().toLocaleString("en-PH", {
      timeZone: "Asia/Manila",
    });

    setIsSending(true);
    try {
      const templateParams = {
        reference_no: referenceNo,

        name: form.fullName.trim(),
        email: form.email.trim(),
        time: submittedAt,

        mobile_number: form.mobileNumber.trim(),
        school_office: form.schoolOrOffice.trim(),
        station_city: (form.stationOrCity || "-").trim(),

        loan_amount: formatMoney(form.loanAmount),
        term_months: form.desiredTermMonths,

        remarks: form.remarks?.trim() ? form.remarks.trim() : "-",
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, {
        publicKey: PUBLIC_KEY,
        limitRate: { throttle: 15000, id: "apds_apply" },
      });

      setStatusMsg("✅ Application sent successfully!");
      setForm(DEFAULT_FORM);
      setTouched(false);
      setMobileBlurred(false);
      setEmailBlurred(false);

      setTimeout(() => onClose(), 800);
    } catch (err: any) {
      setStatusMsg(
        err?.text || err?.message || "❌ Failed to send. Please try again.",
      );
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
                  Apply Now
                </h2>

                <p className="text-xs text-gray-500 mt-1">
                  Reference No:{" "}
                  <span className="font-semibold font-mono text-gray-800">
                    {referenceNo}
                  </span>
                </p>

                <p className="text-xs sm:text-sm text-gray-600 mt-2">
                  Fill out the form below to apply for APDS Loan.
                </p>
              </div>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-800 disabled:opacity-50"
                onClick={onClose}
                disabled={isSending}
                aria-label="Close Apply Now form"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={onSubmit}
              className="mt-4 sm:mt-6 space-y-3 sm:space-y-4"
            >
              {/* Honeypot field (bots may fill this) */}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
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
                    required
                    disabled={isSending}
                  />

                  {touched && !form.fullName.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Full name is required.
                    </p>
                  )}
                </div>

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
                      // block non-numeric keys (optional, extra safety)
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
                    onBlur={() => setMobileBlurred(true)}
                    required
                    disabled={isSending}
                  />

                  {mobileBlurred &&
                    form.mobileNumber.replace(/\D/g, "").length !== 11 && (
                      <p className="text-xs text-red-600 mt-1">
                        Mobile number should be 11 digits (e.g., 09XXXXXXXXX).
                      </p>
                    )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>

                  <input
                    placeholder="name@gmail.com"
                    type="email"
                    pattern="^[^@\s]+@[^@\s]+\.com$"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => setEmailBlurred(true)}
                    required
                    disabled={isSending}
                  />
                  {emailBlurred && !form.email.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Email is required.
                    </p>
                  )}

                  {emailBlurred &&
                    form.email.trim() &&
                    !/^[^\s@]+@[^\s@]+\.com$/i.test(form.email.trim()) && (
                      <p className="text-xs text-red-600 mt-1">
                        Please enter a valid email ending in .com (e.g.,
                        name@gmail.com).
                      </p>
                    )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    School / Office <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder="School / Office"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.schoolOrOffice}
                    onChange={(e) =>
                      update("schoolOrOffice", toTitleCase(e.target.value))
                    }
                    required
                    disabled={isSending}
                  />

                  {touched && !form.schoolOrOffice.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      School/Office is required.
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Station / City
                  </label>
                  <input
                    placeholder="Station"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.stationOrCity}
                    onChange={(e) =>
                      update("stationOrCity", toTitleCase(e.target.value))
                    }
                    disabled={isSending}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Loan Amount (PHP) <span className="text-red-500">*</span>
                  </label>
                  <input
                    placeholder=""
                    inputMode="numeric"
                    pattern="\d*"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    value={form.loanAmount}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/[^\d]/g, "");
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
                    required
                    disabled={isSending}
                  />

                  {touched && !form.loanAmount.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Loan amount is required.
                    </p>
                  )}
                </div>

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
                    required
                    disabled={isSending}
                  >
                    <option value="" disabled>
                      Select term
                    </option>
                    <option value="6">6 mos</option>
                    <option value="12 mos">12 mos</option>
                    <option value="18 mos">18 mos</option>
                    <option value="24 mos">24 mos</option>
                    <option value="36 mos">36 mos</option>
                    <option value="48 mos">48 mos</option>
                    <option value="60 mos">60 mos</option>
                  </select>

                  {touched && !form.desiredTermMonths.trim() && (
                    <p className="text-xs text-red-600 mt-1">
                      Term is required.
                    </p>
                  )}
                </div>

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

              {statusMsg && (
                <div className="text-sm rounded-lg bg-gray-50 border border-gray-200 p-3">
                  {statusMsg}
                </div>
              )}

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
                  disabled={isSending || !isValid}
                  className="w-full sm:w-auto bg-green-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-full shadow-lg transition hover:scale-[1.02] hover:bg-green-800 disabled:opacity-60"
                >
                  {isSending ? "Sending..." : "Submit Application"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ApplyNowModal;
