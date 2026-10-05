import type { InputHTMLAttributes } from "react";
import { classNames } from "../../lib/classNames";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={classNames(
        // 16px (text-base), not text-sm, so focusing on mobile Safari
        // doesn't trigger an iOS zoom (guideline, "Component implementation
        // rules" > Inputs).
        "h-10 w-full rounded-lg border border-brand-line bg-white px-3 text-base text-brand-ink placeholder:text-brand-muted shadow-[0_1px_0_rgba(15,23,42,0.02)] outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15",
        className
      )}
      {...props}
    />
  );
}
