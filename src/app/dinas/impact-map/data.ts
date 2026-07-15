export interface MapKPIData {
  title: string;
  value: string | number;
  iconName: "clipboard" | "store" | "globe" | "barChart";
  colorClass: string;
  iconBgClass: string;
}

export interface ProvinceRank {
  name: string;
  projectsCount: number;
  percentage: number; // For progress bar
}

export interface MapHighlight {
  id: string;
  region: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProvinceDetail {
  id: string;
  name: string;
  projects: number;
  successRate: number;
  status: "High Impact" | "In Progress";
  coordX: number; // percentage X position on custom SVG map
  coordY: number; // percentage Y position on custom SVG map
}

export const mapKpiData: MapKPIData[] = [
  {
    title: "TOTAL PROJECTS",
    value: "4,281",
    iconName: "clipboard",
    colorClass: "text-blue-600",
    iconBgClass: "bg-blue-50",
  },
  {
    title: "MSMES HELPED",
    value: "1,902",
    iconName: "store",
    colorClass: "text-indigo-600",
    iconBgClass: "bg-indigo-50",
  },
  {
    title: "ACTIVE PROVINCES",
    value: "27",
    iconName: "globe",
    colorClass: "text-amber-600",
    iconBgClass: "bg-amber-50",
  },
  {
    title: "AVG HCS",
    value: "76.4",
    iconName: "barChart",
    colorClass: "text-emerald-600",
    iconBgClass: "bg-emerald-50",
  },
];

export const provinceRankings: ProvinceRank[] = [
  { name: "Jawa Barat", projectsCount: 1245, percentage: 100 },
  { name: "Jawa Timur", projectsCount: 982, percentage: 79 },
  { name: "Banten", projectsCount: 756, percentage: 61 },
  { name: "Jakarta", projectsCount: 642, percentage: 52 },
];

export const mapHighlights: MapHighlight[] = [
  {
    id: "hl-1",
    region: "WEST JAVA",
    title: "Digital Literacy Hubs",
    description: "Empowering 120+ rural schools with interactive learning tools.",
    imageUrl: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    id: "hl-2",
    region: "EAST JAVA",
    title: "MSME Finance Inclusion",
    description: "Micro-credit facilities extended to 450+ small businesses.",
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&h=250&q=80",
  },
  {
    id: "hl-3",
    region: "BANTEN",
    title: "Community Equity Program",
    description: "New social infrastructure serving 15,000 residents weekly.",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=400&h=250&q=80",
  },
];

export const provincesMapData: ProvinceDetail[] = [
  { id: "prov-1", name: "Sumatera Utara", projects: 421, successRate: 71.5, status: "In Progress", coordX: 20, coordY: 30 },
  { id: "prov-2", name: "Sumatera Barat", projects: 310, successRate: 74.8, status: "In Progress", coordX: 23, coordY: 45 },
  { id: "prov-3", name: "Riau", projects: 290, successRate: 72.0, status: "In Progress", coordX: 26, coordY: 38 },
  { id: "prov-4", name: "DKI Jakarta", projects: 642, successRate: 85.0, status: "High Impact", coordX: 43, coordY: 70 },
  { id: "prov-5", name: "Jawa Barat", projects: 1245, successRate: 82.4, status: "High Impact", coordX: 47, coordY: 74 },
  { id: "prov-6", name: "Jawa Tengah", projects: 580, successRate: 78.2, status: "High Impact", coordX: 52, coordY: 76 },
  { id: "prov-7", name: "Jawa Timur", projects: 982, successRate: 79.1, status: "High Impact", coordX: 58, coordY: 78 },
  { id: "prov-8", name: "Banten", projects: 756, successRate: 76.5, status: "High Impact", coordX: 38, coordY: 72 },
  { id: "prov-9", name: "Bali", projects: 180, successRate: 81.0, status: "High Impact", coordX: 63, coordY: 80 },
  { id: "prov-10", name: "Sulawesi Selatan", projects: 280, successRate: 73.5, status: "In Progress", coordX: 71, coordY: 55 },
  { id: "prov-11", name: "Kalimantan Timur", projects: 220, successRate: 75.9, status: "In Progress", coordX: 56, coordY: 42 },
];
