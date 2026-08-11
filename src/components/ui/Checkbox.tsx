import type { InputHTMLAttributes } from "react";
import { classNames } from "../../lib/classNames";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  subtitle?: string;
};

export function Checkbox({
  label,
  subtitle,
  className,
  ...props
}: CheckboxProps) {
  return (
    <label
      className={classNames(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-transparent px-2 py-2 transition hover:border-slate-200 hover:bg-slate-50",
        className
      )}
    >
      <input
        type="checkbox"
        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0B7BFF] focus:ring-[#0B7BFF]/20"
        {...props}
      />
      <span className="space-y-0.5">
        <span className="block text-sm font-medium text-slate-800">
          {label}
        </span>
        {subtitle ? (
          <span className="block text-xs text-slate-500">{subtitle}</span>
        ) : null}
      </span>
    </label>
  );
}
