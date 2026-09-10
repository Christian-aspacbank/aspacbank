"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useModalA11y } from "../hooks/useModalA11y";

type AlertDialogProps = {
  open: boolean;
  title?: string;
  message?: string;
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
  loadingText?: string;
  confirmClassName?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function AlertDialog({
  open,
  title = "Are you sure?",
  message = "Please confirm this action.",
  icon = "⚠️",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  loadingText = "Processing...",
  confirmClassName = "bg-red-600 hover:bg-red-500",
  onConfirm,
  onCancel,
}: AlertDialogProps) {
  const panelRef = useModalA11y<HTMLDivElement>(open, () => {
    if (!loading) onCancel();
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!loading) onCancel();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="alert-dialog-title"
            tabIndex={-1}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xs rounded-2xl bg-white p-5 text-center shadow-2xl"
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-xl">
              {icon}
            </div>

            <h3 id="alert-dialog-title" className="text-base font-bold text-slate-800">{title}</h3>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              {message}
            </p>

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
              >
                {cancelText}
              </button>

              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={[
                  "flex-1 rounded-full px-4 py-2 text-sm font-semibold text-white transition disabled:opacity-60",
                  confirmClassName,
                ].join(" ")}
              >
                {loading ? loadingText : confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}