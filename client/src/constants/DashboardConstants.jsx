import {
  LayoutDashboard,
  Truck,
  MapPin,
  Fuel,
  Wrench,
  Box,
  Users,
  Route
} from "lucide-react";

export const SIDEBAR_ITEMS = {
  Admin: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
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

    // {
    //   name: "Fuel",
    //   path: "/dashboard/fuel",
    //   icon: Fuel,
    // },
    // {
    //   name: "Maintenance",
    //   path: "/dashboard/maintenance",
    //   icon: Wrench,
    // },
  ],

  Driver: [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tracking",
      path: "/dashboard/tracking",
      icon: MapPin,
    },
  ],
};
