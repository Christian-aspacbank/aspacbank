import React from "react";
import clsx from "clsx";

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "primary" | "accent" | "neutral";
};

export function Badge({ tone = "primary", className, ...props }: Props) {
  const base =
    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium";
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-aspac-yellow text-black",
    neutral: "bg-neutral-100 text-neutral-700",
  };
  return <span className={clsx(base, tones[tone], className)} {...props} />;
}
