import type { CSSProperties, ReactNode } from "react";
import {
  CalendarDays,
  Check,
  ChefHat,
  CloudOff,
  Paintbrush,
  Search,
  ShoppingBasket,
  Snowflake,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import s from "./mockups.module.css";
import type { PreviewVariant } from "@/data/projects";
import { cn } from "@/lib/utils";

type PreviewProps = {
  variant: PreviewVariant;
  accent: [string, string];
  /** Unique prefix for SVG gradient ids when several previews share a page. */
  idPrefix?: string;
  className?: string;
};

/**
 * Coded UI preview standing in for a screenshot. Swap it for a real image in ProjectCard when screenshots exist.
 * All text is sample interface copy and is hidden from assistive technology.
 */
export function ProjectPreview({ variant, accent, idPrefix, className }: PreviewProps) {
  const vars = { "--a1": accent[0], "--a2": accent[1] } as CSSProperties;
  const id = idPrefix ?? variant;
  return (
    <div className={cn(s.mock, className)} aria-hidden="true">
      <div className={cn(s.canvas, "preview-canvas", variant === "salon" || variant === "services" || variant === "jobs" ? s.light : s.dark)} style={vars}>
        {variant === "restaurant" && <Restaurant />}
        {variant === "pos" && <Pos id={id} />}
        {variant === "salon" && <Salon />}
        {variant === "inspection" && <Inspection />}
        {variant === "services" && <Services />}
        {variant === "jobs" && <Jobs id={id} />}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- shared pieces */

function Bar({ children }: { children?: ReactNode }) {
  return (
    <div className={s.bar}>
      <span className={cn(s.dot, s.r)} />
      <span className={cn(s.dot, s.y)} />
      <span className={cn(s.dot, s.g)} />
      {children ?? (
        <span className={s.url}>
          <span className={s.sk} style={{ width: "60%" }} />
        </span>
      )}
    </div>
  );
}

function Side({ brand, active = 0, items = 6 }: { brand: string; active?: number; items?: number }) {
  return (
    <div className={s.side}>
      <div className={s.brand}>
        <span className={s.brandMark} />
        {brand}
      </div>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className={cn(s.nav, i === active && s.navOn)}>
          <span className={s.navIcon} />
          <span className={cn(s.sk, i !== active && s.sk2)} style={{ width: `${48 + ((i * 17) % 36)}%` }} />
        </div>
      ))}
      <div style={{ marginTop: "auto" }} className={s.row}>
        <span className={s.avatar} style={{ background: "linear-gradient(135deg, var(--a1), var(--a2))" }} />
        <span className={s.col} style={{ flex: 1 }}>
          <span className={s.sk} style={{ width: "70%" }} />
          <span className={cn(s.sk, s.sk2)} style={{ width: "45%" }} />
        </span>
      </div>
    </div>
  );
}

function AreaChart({ id, color }: { id: string; color: string }) {
  const line = "M0 32 C10 30 14 22 24 24 C34 26 38 15 48 17 C58 19 62 9 72 11 C82 13 88 5 100 6";
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={s.draw}>
      <defs>
        <linearGradient id={`${id}-area`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L100 40 L0 40 Z`} fill={`url(#${id}-area)`} />
      <path data-line="" d={line} fill="none" stroke={color} strokeWidth="1.6" pathLength={100} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function StatusPill({ tone, children }: { tone: "green" | "amber" | "blue" | "red" | "violet"; children: ReactNode }) {
  const tones = {
    green: { background: "rgba(34,197,94,.15)", color: "#16a34a" },
    amber: { background: "rgba(245,158,11,.16)", color: "#d97706" },
    blue: { background: "rgba(59,130,246,.15)", color: "#2563eb" },
    red: { background: "rgba(239,68,68,.14)", color: "#dc2626" },
    violet: { background: "rgba(108,99,255,.16)", color: "#6c63ff" },
  } as const;
  return (
    <span className={s.pill} style={tones[tone]}>
      {children}
    </span>
  );
}

/* ----------------------------------------------------------------------------- restaurant */

const dishes = [
  { name: "Zinger Burger", price: "Rs 650", hue: ["#f59e0b", "#b45309"] },
  { name: "Crispy Wings", price: "Rs 520", hue: ["#f97316", "#9a3412"] },
  { name: "Fajita Pizza", price: "Rs 1,200", hue: ["#ef4444", "#7f1d1d"] },
  { name: "Chicken Wrap", price: "Rs 480", hue: ["#eab308", "#854d0e"] },
  { name: "Loaded Fries", price: "Rs 390", hue: ["#facc15", "#a16207"] },
  { name: "Mint Lemonade", price: "Rs 250", hue: ["#4ade80", "#166534"] },
];

function Restaurant() {
  return (
    <div className={s.app}>
      <Bar />
      <div className={s.body}>
        <Side brand="Hot & Spicy" active={1} items={5} />
        <div className={s.main}>
          <div className={cn(s.row, s.between)}>
            <div className={s.col}>
              <span className={s.h1}>Menu</span>
              <span className={s.small}>Online orders and counter sales</span>
            </div>
            <span className={cn(s.pill, s.pulse)} style={{ background: "rgba(34,197,94,.15)", color: "#4ade80" }}>
              ● Kitchen live
            </span>
          </div>
          <div className={s.row} style={{ gap: ".45em" }}>
            {["Burgers", "Pizza", "Wraps", "Drinks", "Desserts"].map((c, i) => (
              <span
                key={c}
                className={s.pill}
                style={i === 0 ? { background: "linear-gradient(135deg,var(--a1),var(--a2))", color: "#fff" } : { background: "var(--panel-2)", color: "var(--sub)" }}
              >
                {c}
              </span>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: ".7em" }}>
            {dishes.map((d) => (
              <div key={d.name} className={s.tile}>
                <span
                  style={{
                    height: "3.6em",
                    borderRadius: ".55em",
                    background: `radial-gradient(circle at 40% 35%, ${d.hue[0]}, ${d.hue[1]} 70%)`,
                  }}
                />
                <span className={s.strong}>{d.name}</span>
                <span className={cn(s.row, s.between)}>
                  <span className={s.small}>{d.price}</span>
                  <span style={{ width: "1.2em", height: "1.2em", borderRadius: ".35em", background: "linear-gradient(135deg,var(--a1),var(--a2))" }} />
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className={s.side} style={{ width: "15em", borderRight: 0, borderLeft: ".08em solid var(--line)" }}>
          <div className={cn(s.row, s.between)}>
            <span className={s.h2}>Order #1042</span>
            <ChefHat style={{ width: "1em", height: "1em", color: "var(--a1)" }} />
          </div>
          <span className={s.small}>Dine-in · Table 4</span>
          {[
            ["2×", "Zinger Burger", "1,300"],
            ["1×", "Loaded Fries", "390"],
            ["2×", "Mint Lemonade", "500"],
          ].map(([q, n, p]) => (
            <div key={n} className={cn(s.row, s.between)} style={{ padding: ".45em 0", borderBottom: ".08em solid var(--line)" }}>
              <span className={s.row} style={{ gap: ".4em" }}>
                <span className={s.small} style={{ color: "var(--a1)", fontWeight: 700 }}>
                  {q}
                </span>
                <span className={s.strong}>{n}</span>
              </span>
              <span className={s.small}>{p}</span>
            </div>
          ))}
          <div style={{ marginTop: "auto" }} className={s.col}>
            <span className={cn(s.row, s.between)}>
              <span className={s.small}>Total</span>
              <span className={s.h2}>Rs 2,190</span>
            </span>
            <span className={s.btn} style={{ width: "100%" }}>
              Send to kitchen
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- retail POS */

const products = [
  ["Milk 1L", "220"],
  ["Bread", "150"],
  ["Eggs (12)", "380"],
  ["Rice 5kg", "1,850"],
  ["Tea 450g", "690"],
  ["Sugar 1kg", "160"],
  ["Cooking Oil", "590"],
  ["Biscuits", "120"],
];

function Pos({ id }: { id: string }) {
  return (
    <div className={s.app}>
      <Bar>
        <span className={s.small} style={{ marginLeft: ".9em", fontWeight: 600 }}>
          POS · Counter 1
        </span>
        <span className={cn(s.pill, s.pulse)} style={{ marginLeft: "auto", background: "rgba(245,158,11,.16)", color: "#fbbf24", gap: ".35em" }}>
          <CloudOff style={{ width: "1.1em", height: "1.1em" }} /> Offline · saving locally
        </span>
      </Bar>
      <div className={s.body}>
        <div className={s.main}>
          <div className={cn(s.row, s.panel)} style={{ padding: ".55em .8em" }}>
            <Search style={{ width: ".9em", height: ".9em", color: "var(--sub)" }} />
            <span className={cn(s.sk, s.sk2)} style={{ width: "40%" }} />
            <span className={s.pill} style={{ marginLeft: "auto", background: "var(--panel-2)", color: "var(--sub)" }}>
              Scan barcode
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0,1fr))", gap: ".65em" }}>
            {products.map(([name, price], i) => (
              <div key={name} className={s.tile}>
                <span
                  style={{
                    height: "2.6em",
                    borderRadius: ".5em",
                    display: "grid",
                    placeItems: "center",
                    background: `linear-gradient(135deg, color-mix(in srgb, var(--a${(i % 2) + 1}) 30%, transparent), transparent)`,
                  }}
                >
                  <ShoppingBasket style={{ width: "1.1em", height: "1.1em", color: `var(--a${(i % 2) + 1})` }} />
                </span>
                <span className={s.strong}>{name}</span>
                <span className={s.small}>Rs {price}</span>
              </div>
            ))}
          </div>
          <div className={cn(s.panel, s.chart)}>
            <span className={cn(s.row, s.between)}>
              <span className={s.strong}>Today&apos;s sales</span>
              <span className={s.up}>Synced when back online</span>
            </span>
            <AreaChart id={id} color="#10b981" />
          </div>
        </div>
        <div className={s.side} style={{ width: "17em", borderRight: 0, borderLeft: ".08em solid var(--line)" }}>
          <span className={s.h2}>Current sale</span>
          {[
            ["2×", "Milk 1L", "440"],
            ["1×", "Rice 5kg", "1,850"],
            ["3×", "Biscuits", "360"],
            ["1×", "Tea 450g", "690"],
          ].map(([q, n, p]) => (
            <div key={n} className={cn(s.row, s.between)} style={{ padding: ".45em 0", borderBottom: ".08em solid var(--line)" }}>
              <span className={s.row} style={{ gap: ".4em" }}>
                <span className={s.small} style={{ color: "var(--a1)", fontWeight: 700 }}>
                  {q}
                </span>
                <span className={s.strong}>{n}</span>
              </span>
              <span className={s.small}>{p}</span>
            </div>
          ))}
          <div style={{ marginTop: "auto" }} className={s.col}>
            <span className={cn(s.row, s.between)}>
              <span className={s.small}>Subtotal</span>
              <span className={s.small}>3,340</span>
            </span>
            <span className={cn(s.row, s.between)}>
              <span className={s.small}>Total</span>
              <span className={s.h1}>Rs 3,340</span>
            </span>
            <span className={s.btn} style={{ width: "100%", height: "2.6em" }}>
              Charge Rs 3,340
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- salon booking */

function Salon() {
  const booked = new Set([3, 9, 10, 16, 22, 23]);
  return (
    <div className={s.app}>
      <div className={cn(s.bar, s.between)} style={{ height: "3em" }}>
        <span className={s.row} style={{ gap: ".5em" }}>
          <span className={s.brandMark} style={{ width: "1.5em", height: "1.5em", borderRadius: "50%" }} />
          <span style={{ fontSize: ".8em", fontWeight: 800, letterSpacing: "-.01em" }}>Huma&apos;s Signature</span>
        </span>
        <span className={s.row} style={{ gap: "1.2em" }}>
          {[40, 34, 46, 38].map((w, i) => (
            <span key={i} className={cn(s.sk, s.sk2)} style={{ width: `${w / 10}em` }} />
          ))}
          <span className={s.btn}>Book now</span>
        </span>
      </div>
      <div className={s.body} style={{ padding: "2em 2.2em", gap: "2em", alignItems: "center" }}>
        <div className={s.col} style={{ flex: 1, gap: ".9em" }}>
          <span className={s.pill} style={{ alignSelf: "flex-start", background: "color-mix(in srgb, var(--a1) 14%, transparent)", color: "var(--a1)" }}>
            Signature styling
          </span>
          <span style={{ fontSize: "2.2em", fontWeight: 800, letterSpacing: "-.035em", lineHeight: 1.05 }}>
            Look and feel
            <br />
            your best.
          </span>
          <span className={s.col} style={{ gap: ".4em" }}>
            <span className={cn(s.sk, s.sk2)} style={{ width: "88%" }} />
            <span className={cn(s.sk, s.sk2)} style={{ width: "72%" }} />
          </span>
          <span className={s.row}>
            <span className={s.btn}>Book appointment</span>
            <span className={s.btn} style={{ background: "transparent", color: "var(--text)", border: ".1em solid var(--line)" }}>
              View services
            </span>
          </span>
          <span className={s.row} style={{ gap: ".3em", marginTop: ".3em" }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} style={{ width: ".85em", height: ".85em", color: "#f59e0b", fill: "#f59e0b" }} />
            ))}
            <span className={s.small} style={{ marginLeft: ".3em" }}>
              Loved by our clients
            </span>
          </span>
        </div>
        <div className={cn(s.panel, s.col)} style={{ width: "24em", padding: "1.1em", gap: ".7em", boxShadow: "0 1.2em 2.4em -1.2em rgba(15,23,42,.25)" }}>
          <span className={cn(s.row, s.between)}>
            <span className={s.h2}>Book appointment</span>
            <CalendarDays style={{ width: "1em", height: "1em", color: "var(--a1)" }} />
          </span>
          <span className={cn(s.row, s.between)}>
            <span className={s.strong}>October</span>
            <span className={s.small}>Hair · Styling</span>
          </span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: ".3em" }}>
            {Array.from({ length: 28 }, (_, i) => (
              <span
                key={i}
                style={{
                  height: "1.5em",
                  borderRadius: ".35em",
                  display: "grid",
                  placeItems: "center",
                  fontSize: ".55em",
                  fontWeight: 600,
                  ...(i === 14
                    ? { background: "linear-gradient(135deg,var(--a1),var(--a2))", color: "#fff" }
                    : booked.has(i)
                      ? { background: "var(--panel-2)", color: "var(--sub)", textDecoration: "line-through" }
                      : { background: "var(--panel-2)", color: "var(--text)" }),
                }}
              >
                {i + 1}
              </span>
            ))}
          </div>
          <span className={s.row} style={{ gap: ".35em", flexWrap: "wrap" }}>
            {["10:00", "11:30", "1:00", "3:30"].map((t, i) => (
              <span
                key={t}
                className={s.pill}
                style={i === 1 ? { background: "color-mix(in srgb, var(--a1) 18%, transparent)", color: "var(--a1)" } : { background: "var(--panel-2)", color: "var(--sub)" }}
              >
                {t}
              </span>
            ))}
          </span>
          <span className={s.btn} style={{ width: "100%" }}>
            Confirm booking
          </span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- property inspection */

function Inspection() {
  const rows: [string, "green" | "amber" | "blue" | "red", string][] = [
    ["Scheduled", "blue", "Mon"],
    ["In progress", "amber", "Today"],
    ["Completed", "green", "Sep 28"],
    ["Issue found", "red", "Sep 26"],
    ["Completed", "green", "Sep 24"],
  ];
  return (
    <div className={s.app}>
      <Bar />
      <div className={s.body}>
        <Side brand="Inspections" active={0} />
        <div className={s.main} style={{ paddingRight: "17em" }}>
          <div className={cn(s.row, s.between)}>
            <div className={s.col}>
              <span className={s.h1}>Inspections</span>
              <span className={s.small}>Admin overview</span>
            </div>
            <span className={s.btn}>+ New inspection</span>
          </div>
          <div className={s.kpis} style={{ gridTemplateColumns: "repeat(3, minmax(0,1fr))" }}>
            {[
              ["Scheduled", "24"],
              ["In progress", "8"],
              ["Completed", "112"],
            ].map(([l, v]) => (
              <div key={l} className={cn(s.panel, s.kpi)}>
                <span className={s.small}>{l}</span>
                <span className={s.kpiValue}>{v}</span>
              </div>
            ))}
          </div>
          <div className={s.panel} style={{ overflow: "hidden" }}>
            {rows.map(([status, tone, date], i) => (
              <div key={i} className={s.tr} style={{ gridTemplateColumns: "1.4em 1fr auto auto" }}>
                <span className={s.avatar} style={{ background: `hsl(${200 + i * 28} 70% 55%)` }} />
                <span className={s.col}>
                  <span className={s.sk} style={{ width: `${60 + ((i * 13) % 30)}%` }} />
                  <span className={cn(s.sk, s.sk2)} style={{ width: "38%" }} />
                </span>
                <StatusPill tone={tone}>{status}</StatusPill>
                <span className={s.small}>{date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={s.phone} style={{ right: "1.6em", top: "4.4em" }}>
        <span className={s.notch} />
        <div className={s.phoneScreen}>
          <span className={s.small}>Inspector app</span>
          <span className={s.h2}>Today&apos;s inspection</span>
          <div className={cn(s.panel, s.col)} style={{ padding: ".7em" }}>
            <span className={s.sk} style={{ width: "80%" }} />
            <span className={cn(s.sk, s.sk2)} style={{ width: "55%" }} />
          </div>
          {["Exterior", "Electrical", "Plumbing", "Kitchen", "Bedrooms"].map((item, i) => (
            <span key={item} className={cn(s.row, s.between)} style={{ padding: ".25em 0" }}>
              <span className={s.strong}>{item}</span>
              <span
                style={{
                  width: "1.15em",
                  height: "1.15em",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: i < 3 ? "linear-gradient(135deg,var(--a1),var(--a2))" : "var(--panel-2)",
                }}
              >
                {i < 3 && <Check style={{ width: ".7em", height: ".7em", color: "#fff" }} />}
              </span>
            </span>
          ))}
          <span style={{ height: ".45em", borderRadius: ".3em", background: "var(--panel-2)", overflow: "hidden" }}>
            <span style={{ display: "block", width: "60%", height: "100%", background: "linear-gradient(90deg,var(--a1),var(--a2))" }} />
          </span>
          <span className={s.btn} style={{ marginTop: "auto" }}>
            Submit report
          </span>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- home services */

const categories = [
  { icon: Wrench, label: "Plumbing" },
  { icon: Zap, label: "Electrical" },
  { icon: Sparkles, label: "Cleaning" },
  { icon: Snowflake, label: "AC Repair" },
  { icon: Paintbrush, label: "Painting" },
];

function Services() {
  return (
    <div className={s.app}>
      <div className={cn(s.bar, s.between)} style={{ height: "3em" }}>
        <span className={s.row} style={{ gap: ".5em" }}>
          <span className={s.brandMark} style={{ width: "1.5em", height: "1.5em" }} />
          <span style={{ fontSize: ".8em", fontWeight: 800 }}>Home Services</span>
        </span>
        <span className={s.row} style={{ gap: "1.2em" }}>
          {[38, 44, 34].map((w, i) => (
            <span key={i} className={cn(s.sk, s.sk2)} style={{ width: `${w / 10}em` }} />
          ))}
          <span className={s.btn}>Sign in</span>
        </span>
      </div>
      <div className={s.col} style={{ flex: 1, alignItems: "center", padding: "2em 2.4em 1.6em", gap: "1em" }}>
        <span className={s.pill} style={{ background: "color-mix(in srgb, var(--a2) 15%, transparent)", color: "var(--a2)" }}>
          Trusted local professionals
        </span>
        <span style={{ fontSize: "2em", fontWeight: 800, letterSpacing: "-.035em", textAlign: "center", lineHeight: 1.08 }}>
          Book home services
          <br />
          in a few clicks.
        </span>
        <div className={cn(s.panel, s.row)} style={{ width: "34em", padding: ".45em .45em .45em .9em", boxShadow: "0 1em 2em -1.2em rgba(15,23,42,.3)" }}>
          <Search style={{ width: ".95em", height: ".95em", color: "var(--sub)" }} />
          <span className={s.small} style={{ flex: 1 }}>
            What do you need help with?
          </span>
          <span className={s.btn}>Search</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, minmax(0,1fr))", gap: ".7em", width: "100%", marginTop: ".4em" }}>
          {categories.map(({ icon: CategoryIcon, label }, i) => (
            <div key={label} className={s.tile} style={{ alignItems: "center", padding: ".9em .5em" }}>
              <span
                style={{
                  width: "2.4em",
                  height: "2.4em",
                  borderRadius: ".7em",
                  display: "grid",
                  placeItems: "center",
                  background: `color-mix(in srgb, var(--a${(i % 2) + 1}) 16%, transparent)`,
                }}
              >
                <CategoryIcon style={{ width: "1.2em", height: "1.2em", color: `var(--a${(i % 2) + 1})` }} />
              </span>
              <span className={s.strong}>{label}</span>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0,1fr))", gap: ".7em", width: "100%" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={cn(s.tile, s.row)} style={{ flexDirection: "row", gap: ".6em" }}>
              <span style={{ width: "2.6em", height: "2.6em", borderRadius: ".55em", flex: "none", background: `linear-gradient(135deg, hsl(${30 + i * 40} 85% 70%), hsl(${10 + i * 40} 75% 50%))` }} />
              <span className={s.col} style={{ flex: 1 }}>
                <span className={s.sk} style={{ width: "75%" }} />
                <span className={s.row} style={{ gap: ".2em" }}>
                  <Star style={{ width: ".7em", height: ".7em", color: "#f59e0b", fill: "#f59e0b" }} />
                  <span className={cn(s.sk, s.sk2)} style={{ width: "40%" }} />
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------------------- job portal */

function Jobs({ id }: { id: string }) {
  const apps: [string, string, "amber" | "blue" | "green" | "red", string][] = [
    ["MERN Developer", "#6c63ff", "blue", "Interview"],
    ["Frontend Engineer", "#0ea5e9", "amber", "Pending"],
    ["React Developer", "#10b981", "green", "Selected"],
    ["Backend Developer", "#f97316", "red", "Rejected"],
  ];
  return (
    <div className={s.app}>
      <Bar />
      <div className={s.body}>
        <Side brand="JobPortal" active={1} />
        <div className={s.main}>
          <div className={cn(s.row, s.between)}>
            <div className={s.col}>
              <span className={s.h1}>Welcome back</span>
              <span className={s.small}>Track every application in one place</span>
            </div>
            <span className={s.btn}>Find jobs</span>
          </div>
          <div className={s.kpis}>
            {[
              ["Applied", "12"],
              ["Interviews", "3"],
              ["Selected", "1"],
              ["Saved", "18"],
            ].map(([l, v]) => (
              <div key={l} className={cn(s.panel, s.kpi)}>
                <span className={s.small}>{l}</span>
                <span className={s.kpiValue}>{v}</span>
              </div>
            ))}
          </div>
          <div className={s.row} style={{ alignItems: "stretch", flex: 1, minHeight: 0 }}>
            <div className={s.panel} style={{ flex: 1.4, overflow: "hidden" }}>
              <div className={s.tr} style={{ gridTemplateColumns: "1fr auto" }}>
                <span className={s.strong}>Recent applications</span>
                <span className={s.small}>View all</span>
              </div>
              {apps.map(([role, color, tone, status]) => (
                <div key={role} className={s.tr} style={{ gridTemplateColumns: "1.5em 1fr auto" }}>
                  <span style={{ width: "1.5em", height: "1.5em", borderRadius: ".4em", background: color }} />
                  <span className={s.col}>
                    <span className={s.strong}>{role}</span>
                    <span className={cn(s.sk, s.sk2)} style={{ width: "45%" }} />
                  </span>
                  <StatusPill tone={tone}>{status}</StatusPill>
                </div>
              ))}
            </div>
            <div className={cn(s.panel, s.chart)} style={{ flex: 1 }}>
              <span className={s.strong}>Profile views</span>
              <AreaChart id={id} color="#6c63ff" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
