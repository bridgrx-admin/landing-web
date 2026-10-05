import { classNames } from "../../lib/classNames";

export type TabAccent = "rider" | "merchant";

export type TabItem = {
  id: string;
  label: string;
  /** Rider Violet / Merchant Green when this tab represents that surface
   *  (see BridgrX UI Brand Guideline, "Product UI system"). Omit for the
   *  neutral ink treatment. */
  accent?: TabAccent;
};

type TabsProps = {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
};

// Segmented pill control -> full radius, per the guideline's "Radius pill"
// rule (badges and segmented pill controls only).
const accentActiveClasses: Record<TabAccent | "default", string> = {
  default: "bg-white text-brand-ink shadow-sm",
  rider: "bg-white text-brand-rider shadow-sm",
  merchant: "bg-white text-brand-merchant shadow-sm",
};

export function Tabs({ items, activeId, onChange }: TabsProps) {
  return (
    <div className="inline-flex rounded-full border border-brand-line bg-brand-cream p-1">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => onChange(item.id)}
          className={classNames(
            "rounded-full px-3.5 py-2 text-sm font-medium transition",
            item.id === activeId
              ? accentActiveClasses[item.accent ?? "default"]
              : "text-brand-muted hover:text-brand-ink",
          )}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
