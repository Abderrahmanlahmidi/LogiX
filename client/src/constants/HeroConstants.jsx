import {
  Fuel,
  Wrench,
  BarChart3,
  ShieldCheck,
  Clock,
  Truck,
} from "lucide-react";

export const stats = [
  {
    label: "Active Trucks",
    value: "42",
    icon: Truck,
    color: "text-[var(--color-success)]",
    bgColor: "bg-[var(--color-success)]",
  },
  {
    label: "In Maintenance",
    value: "3",
    icon: Wrench,
    color: "text-[var(--color-warning)]",
    bgColor: "bg-[var(--color-warning)]",
  },
  {
    label: "Fuel Efficiency",
    value: "8.2 mpg",
    icon: Fuel,
    color: "text-[var(--color-accent)]",
    bgColor: "bg-[var(--color-accent)]",
  },
  {
    label: "On Time",
    value: "98%",
    icon: Clock,
    color: "text-[var(--color-success)]",
    bgColor: "bg-[var(--color-success)]",
  },
];

export const otherStats = [
  { value: "30%", label: "Fuel Savings", icon: Fuel },
  { value: "24/7", label: "Real-time", icon: ShieldCheck },
  { value: "99.9%", label: "Uptime", icon: BarChart3 },
];
