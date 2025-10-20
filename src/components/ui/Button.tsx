import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "accent" | "outline" | "ghost";
};

export function Button({ variant = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold transition focus:outline-none focus-visible:ring-2";
  const variants = {
    primary:
      "bg-primary text-white hover:bg-aspac-green/90 focus-visible:ring-primary/40",
    accent:
      "bg-aspac-yellow text-black hover:bg-aspac-yellow/90 focus-visible:ring-aspac-yellow/40",
    outline:
      "border border-neutral-300 text-neutral-900 hover:border-primary hover:text-primary bg-white",
    ghost: "text-neutral-700 hover:text-primary",
  };
  return (
    <button className={clsx(base, variants[variant], className)} {...props} />
  );
}
