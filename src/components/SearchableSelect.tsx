import React from "react";

type SearchableSelectProps = {
  value: string;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  maxResults?: number;
};

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  options,
  placeholder = "Type to search...",
  disabled,
  onChange,
  onBlur,
  maxResults = 10,
}) => {
  const wrapRef = React.useRef<HTMLDivElement | null>(null);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);

  const filtered = React.useMemo(() => {
    const q = value.trim().toLowerCase();
    if (!q) return options.slice(0, maxResults);
    return options
      .filter((opt) => opt.toLowerCase().includes(q))
      .slice(0, maxResults);
  }, [value, options, maxResults]);

  React.useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", onDocDown);
    return () => document.removeEventListener("mousedown", onDocDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    if (activeIndex < 0) return;
    const el = listRef.current?.querySelector(
      `[data-idx="${activeIndex}"]`,
    ) as HTMLElement | null;
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  const selectOption = (opt: string) => {
    onChange(opt);
    setOpen(false);
    setActiveIndex(-1);
  };

  return (
    <div ref={wrapRef} className="relative">
      <input
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
          setActiveIndex(-1);
        }}
        onBlur={() => onBlur?.()}
        onKeyDown={(e) => {
          if (!open && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
            setOpen(true);
            return;
          }

          if (e.key === "Escape") {
            setOpen(false);
            setActiveIndex(-1);
            return;
          }

          if (e.key === "ArrowDown") {
            e.preventDefault();
            if (!filtered.length) return;
            setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
            return;
          }

          if (e.key === "ArrowUp") {
            e.preventDefault();
            if (!filtered.length) return;
            setActiveIndex((i) => Math.max(i - 1, 0));
            return;
          }

          if (e.key === "Enter") {
            if (!open) return;
            if (activeIndex >= 0 && filtered[activeIndex]) {
              e.preventDefault();
              selectOption(filtered[activeIndex]);
            }
          }
        }}
        aria-autocomplete="list"
        aria-expanded={open}
      />

      {open && (
        <div
          ref={listRef}
          className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-56 overflow-auto"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <div className="px-3 py-2 text-sm text-gray-500">
              No matches. (You can still type a custom office/school.)
            </div>
          ) : (
            filtered.map((opt, idx) => {
              const active = idx === activeIndex;
              return (
                <div
                  key={opt}
                  data-idx={idx}
                  role="option"
                  aria-selected={active}
                  className={[
                    "px-3 py-2 text-sm cursor-pointer",
                    active ? "bg-green-50" : "bg-white",
                    "hover:bg-green-50",
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    selectOption(opt);
                  }}
                >
                  {opt}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
