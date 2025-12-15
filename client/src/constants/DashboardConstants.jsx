import {
  Truck,
  MapPin,
  Wrench,
  Box,
  Users,
  Route,
  PieChart,
} from "lucide-react";

export const SIDEBAR_ITEMS = {
  Admin: [
    {
      name: "Maintenance Rules",
      path: "/dashboard",
      icon: Wrench,
    },
    {
      name: "Statistics",
      path: "/dashboard/statistics",
      icon: PieChart,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: Users,
    },
    {
      name: "Fleet",
      path: "/dashboard/fleets",
      icon: Truck,
    },

    {
      name: "Tires",
      path: "/dashboard/tires",
      icon: Box,
    },
    {
      name: "Trip",
      path: "/dashboard/trips",
      icon: Route,
    },
  ],

  Driver: [
    {
      name: "Maintenance Rules",
      path: "/dashboard",
      icon: Wrench,
    },
    {
      name: "Tracking",
      path: "/dashboard/tracking",
      icon: MapPin,
    },
  ],
};
