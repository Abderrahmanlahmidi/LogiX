import { createBrowserRouter } from "react-router-dom";
import { withSuspense } from "./lazyRoutes";

import GuestOnlyRoute from "../guards/GuestOnlyRoutes";
import ProtectedRoute from "../guards/RoleProtectedRoutes";

import {
  Home,
  Login,
  Register,
  Dashboard,
  Profile
} from "./lazyRoutes";

import Fleet from "../pages/admin/sections/fleet";
import Users from "../pages/admin/sections/users";
import Tires from "../pages/admin/sections/tires";
import Tracking from "../pages/admin/sections/tracking";
import Trip from "../pages/admin/sections/trip";
import MaintenanceRule from "../pages/admin/sections/maintenanceRule";


import Unauthorized from "../pages/private/unauthorized";
import NotFound from "../pages/private/notFound";


export const router = createBrowserRouter([

  {
    path: "/",
    element: withSuspense(<Home />),
  },
  {
    path: "/unauthorized",
    element: withSuspense(<Unauthorized />),
  },
  {
    path:"*",
    element: withSuspense(<NotFound />),
  },

  {
    element: <GuestOnlyRoute />,
    children: [
      {
        path: "/login",
        element: withSuspense(<Login />),
      },
      {
        path: "/register",
        element: withSuspense(<Register />),
      },
    ],
  },


  {
    element: <ProtectedRoute roles={["Admin", "Driver"]} />,
    children: [
      {
        path: "/dashboard",
        element: withSuspense(<Dashboard />),
        children: [
          {
            index: true,
            element: withSuspense(<MaintenanceRule />),
          },

          {
            element: <ProtectedRoute roles={["Admin"]} />,
            children: [
              {
                path: "users",
                element: withSuspense(<Users />),
              },
              {
                path: "fleets",
                element: withSuspense(<Fleet />),
              },
              {
                path: "tires",
                element: withSuspense(<Tires />),
              },
              {
                path: "trips",
                element: withSuspense(<Trip />)
              }
            ],
          },
          {
            element: <ProtectedRoute roles={["Driver"]} />,
            children: [
               {
                path: "tracking",
                element: withSuspense(<Tracking />),
              },
            ],
          },
        ],
      },

      {
        path: "/profile",
        element: withSuspense(<Profile />),
      },
    ],
  },
]);
