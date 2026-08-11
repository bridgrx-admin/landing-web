import type { HTMLAttributes, ReactNode } from "react";
import { classNames } from "../../lib/classNames";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={classNames(
        "rounded-lg border border-slate-200/80 bg-white shadow-[0_16px_48px_rgba(15,23,42,0.045)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
