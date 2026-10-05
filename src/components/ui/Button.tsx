import type { ButtonHTMLAttributes, ReactNode } from "react";
import { classNames } from "../../lib/classNames";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-primary text-white shadow-[0_8px_18px_rgba(244,81,44,0.24)] hover:bg-brand-primary-deep hover:shadow-[0_12px_24px_rgba(244,81,44,0.28)]",
  secondary:
    "bg-white text-brand-ink border border-brand-line hover:border-brand-primary/40 hover:bg-brand-bg",
  ghost: "bg-transparent text-brand-muted hover:bg-brand-cream",
  outline:
    "bg-white text-brand-ink border border-brand-outline hover:border-brand-primary/48 hover:bg-brand-bg",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/35 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
