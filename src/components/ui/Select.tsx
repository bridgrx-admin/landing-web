import { ChevronDown, Check } from "lucide-react";
import {
  Children,
  isValidElement,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ReactElement,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from "react";
import { classNames } from "../../lib/classNames";

type SelectOptionElement = ReactElement<
  React.OptionHTMLAttributes<HTMLOptionElement>,
  "option"
>;

export function Select({
  className,
  children,
  defaultValue,
  value,
  onChange,
  disabled,
  name,
  id,
  variant = "field",
}: {
  className?: string;
  children?: ReactNode;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  variant?: "field" | "inline";
}) {
  const reactId = useId();
  const selectId = id ?? reactId;
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | undefined>(
    typeof defaultValue === "string" || typeof defaultValue === "number"
      ? String(defaultValue)
      : undefined,
  );

  const options = useMemo(() => {
    return Children.toArray(children).filter(isValidElement) as SelectOptionElement[];
  }, [children]);

  const selectedValue = isControlled
    ? String(value ?? "")
    : internalValue ?? String(defaultValue ?? "");

  const selectedOption =
    options.find((option) => String(option.props.value) === selectedValue) ??
    options[0];
  const selectedLabel =
    typeof selectedOption?.props.children === "string"
      ? selectedOption.props.children
      : selectedOption?.props.children ?? "";

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const emitChange = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }

    onChange?.({
      target: { value: nextValue } as HTMLSelectElement,
      currentTarget: { value: nextValue } as HTMLSelectElement,
    } as ChangeEvent<HTMLSelectElement>);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (disabled) {
      return;
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const currentIndex = Math.max(
        0,
        options.findIndex((option) => String(option.props.value) === selectedValue),
      );
      const direction = event.key === "ArrowDown" ? 1 : -1;
      const nextIndex =
        (currentIndex + direction + options.length) % options.length;
      const nextOption = options[nextIndex];

      if (nextOption) {
        emitChange(String(nextOption.props.value));
      }
      setOpen(true);
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen((current) => !current);
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <input type="hidden" name={name} value={selectedValue} />
      <button
        type="button"
        id={selectId}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${selectId}-listbox`}
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        onKeyDown={handleKeyDown}
        className={classNames(
          variant === "inline"
            ? "flex h-11 w-auto min-w-0 touch-manipulation items-center justify-between gap-2 rounded-[12px] border-none bg-transparent px-0 text-left text-[17px] font-medium text-slate-900 outline-none transition hover:bg-transparent focus:ring-0 disabled:cursor-not-allowed disabled:opacity-60"
            : "flex h-11 w-full touch-manipulation items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-white px-3 text-left text-sm text-slate-900 outline-none transition focus:border-[#0B7BFF] focus:ring-2 focus:ring-[#0B7BFF]/15 disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
      >
        <span className="truncate">
          {typeof selectedLabel === "string" ? selectedLabel : selectedLabel}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
      </button>

      {open ? (
        <div
          id={`${selectId}-listbox`}
          role="listbox"
          aria-labelledby={selectId}
          className={classNames(
            "absolute top-[calc(100%+8px)] z-50 overflow-hidden rounded-[14px] border border-slate-200 bg-[#3f3f46] p-1 shadow-[0_24px_60px_rgba(15,23,42,0.22)]",
            variant === "inline" ? "left-0 min-w-[176px]" : "left-0 min-w-full",
          )}
        >
          {options.map((option) => {
            const optionValue = String(option.props.value);
            const isSelected = optionValue === selectedValue;

            return (
              <button
                key={optionValue}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  emitChange(optionValue);
                  setOpen(false);
                }}
                className={classNames(
                  "flex min-h-11 w-full touch-manipulation items-center gap-2 rounded-[10px] px-3 py-3 text-left text-[15px] font-medium text-slate-100 transition",
                  isSelected
                    ? "bg-white/10"
                    : "hover:bg-white/10 hover:text-white",
                )}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center">
                  {isSelected ? <Check className="h-4 w-4" /> : null}
                </span>
                <span className="truncate">
                  {option.props.children}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
