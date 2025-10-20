import React from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "yellow" | "ghost";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({
  variant = "primary",
  className,
  ...props
}: Props) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus-visible:outline-none";
  const variants: Record<Variant, string> = {
    primary: "bg-aspac-greenAA text-white hover:opacity-95", // AA-safe
    secondary:
      "border border-aspac-green text-aspac-green bg-white hover:bg-aspac-green-tint",
    yellow: "bg-aspac-yellow text-black hover:opacity-95", // dark text only
    ghost: "text-aspac-green hover:bg-aspac-green-tint",
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
}
