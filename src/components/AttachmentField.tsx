import React, { useMemo } from "react";

export type AttachmentValue = {
  file: File | null;
  error: string | null;
};

type Props = {
  value: AttachmentValue;
  onChange: (next: AttachmentValue) => void;
  disabled?: boolean;
  label?: string;
  required?: boolean;
  maxSizeMB?: number;
  allowed?: string[]; // mime types
};

const DEFAULT_ALLOWED = ["application/pdf", "image/jpeg", "image/png"];

const AttachmentField: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  label = "Attachment",
  required = false,
  maxSizeMB = 5,
  allowed = DEFAULT_ALLOWED,
}) => {
  const accept = useMemo(() => {
    // for input accept attribute
    const map: Record<string, string> = {
      "application/pdf": ".pdf",
      "image/jpeg": ".jpg,.jpeg",
      "image/png": ".png",
    };
    return allowed.map((a) => map[a] || a).join(",");
  }, [allowed]);

  const validate = (file: File | null) => {
    if (!file) {
      if (required) return "Attachment is required.";
      return null;
    }

    if (!allowed.includes(file.type)) {
      return "Invalid file type. Please upload PDF/JPG/PNG only.";
    }

    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File too large. Max ${maxSizeMB}MB only.`;
    }

    return null;
  };

  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="mt-1">
        <input
          type="file"
          accept={accept}
          disabled={disabled}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
          onChange={(e) => {
            const file = e.target.files?.[0] ?? null;
            const error = validate(file);
            onChange({ file, error });
          }}
        />
      </div>

      {value.file && !value.error && (
        <p className="text-xs text-gray-600 mt-1">
          Selected: <span className="font-medium">{value.file.name}</span> (
          {Math.ceil(value.file.size / 1024)} KB)
        </p>
      )}

      {value.error && (
        <p className="text-xs text-red-600 mt-1">{value.error}</p>
      )}

      {!value.file && !value.error && (
        <p className="text-xs text-gray-500 mt-1">
          Allowed: PDF/JPG/PNG up to {maxSizeMB}MB
        </p>
      )}
    </div>
  );
};

export default AttachmentField;
