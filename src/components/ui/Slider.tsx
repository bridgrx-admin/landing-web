import type { InputHTMLAttributes } from "react";
import { classNames } from "../../lib/classNames";

type SliderProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  minLabel?: string;
  maxLabel?: string;
};

export function Slider({
  label,
  minLabel,
  maxLabel,
  className,
  ...props
}: SliderProps) {
  return (
    <div className={classNames("space-y-3", className)}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-900">{label}</span>
        <span className="text-xs text-slate-400">Drag to refine</span>
      </div>
      <input
        type="range"
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-200 accent-[#0B7BFF]"
        {...props}
      />
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{minLabel ?? "Low"}</span>
        <span>{maxLabel ?? "High"}</span>
      </div>
    </div>
  );
}
