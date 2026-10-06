import { tech, type TechDefinition, type TechKey } from "@/data/tech";
import { cn } from "@/lib/utils";

/** Very dark brand colours (Next.js, Express, GitHub) would vanish on the dark theme, so they render light. */
function readableColor(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return luminance < 0.28 ? "#e6e8ee" : `#${hex.replace("#", "")}`;
}

export function techColor(key: TechKey) {
  const def = tech[key] as TechDefinition;
  return def.kind === "brand" ? def.color ?? readableColor(def.icon.hex) : def.color;
}

export function techLabel(key: TechKey) {
  return (tech[key] as TechDefinition).label;
}

/** Brand logo (Simple Icons) or a Lucide fallback for concepts without a logo. */
export function TechIcon({ name, className, colored = true }: { name: TechKey; className?: string; colored?: boolean }) {
  const def = tech[name] as TechDefinition;
  const color = colored ? techColor(name) : "currentColor";

  if (def.kind === "lucide") {
    const LucideComponent = def.icon;
    return <LucideComponent aria-hidden="true" strokeWidth={1.75} className={cn("size-5", className)} style={{ color }} />;
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={cn("size-5", className)} fill={color}>
      <path d={def.icon.path} />
    </svg>
  );
}
