import { classNames } from "../../lib/classNames";

type ToggleGroupProps = {
  items: string[];
  activeItem: string;
};

export function ToggleGroup({ items, activeItem }: ToggleGroupProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {items.map((item) => {
        const active = item === activeItem;
        return (
          <button
            key={item}
            type="button"
            className={classNames(
              "rounded-xl border px-3 py-2 text-left text-sm transition",
              active
                ? "border-slate-900 bg-slate-50 text-slate-900"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
