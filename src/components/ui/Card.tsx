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
        "rounded-lg border border-brand-line/90 bg-white shadow-[0_16px_48px_rgba(5,5,5,0.045)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
