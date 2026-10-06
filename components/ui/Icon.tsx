import {
  Briefcase,
  CodeXml,
  Download,
  FlaskConical,
  FolderGit2,
  Globe,
  Heart,
  Layers,
  Lightbulb,
  Map,
  Monitor,
  Network,
  Package,
  PenTool,
  Plug,
  Rocket,
  SearchCheck,
  Server,
  Smartphone,
  Store,
  Users,
  Zap,
  ChefHat,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";

const icons = {
  briefcase: Briefcase,
  code: CodeXml,
  download: Download,
  test: FlaskConical,
  folder: FolderGit2,
  web: Globe,
  heart: Heart,
  layers: Layers,
  lightbulb: Lightbulb,
  map: Map,
  monitor: Monitor,
  desktop: Monitor,
  network: Network,
  package: Package,
  pen: PenTool,
  plug: Plug,
  rocket: Rocket,
  search: SearchCheck,
  service: Server,
  mobile: Smartphone,
  store: Store,
  users: Users,
  zap: Zap,
  kitchen: ChefHat,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof icons;

/** Renders a Lucide icon from a string key, so plain data files can reference icons. */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden="true" strokeWidth={1.75} {...props} />;
}
