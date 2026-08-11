import type { InputHTMLAttributes } from "react";
import { classNames } from "../../lib/classNames";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={classNames(
        "h-10 w-full rounded-[14px] border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 shadow-[0_1px_0_rgba(15,23,42,0.02)] outline-none transition focus:border-[#0B7BFF] focus:ring-2 focus:ring-[#0B7BFF]/15",
        className
      )}
      {...props}
    />
  );
}
