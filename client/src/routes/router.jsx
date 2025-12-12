import { createBrowserRouter } from "react-router-dom";
import { routesConfig } from "./routesConfig";
import { withSuspense } from "./lazyRoutes";
import GuestOnlyRoute from "../private/GuestOnlyRoutes";
import ProtectedRoute from "../private/RoleProtectedRoutes";



export const router = createBrowserRouter(
  routesConfig.map((route) => {
    if (route.guestOnly) {
      return {
        ...route,
        element: withSuspense(
          <GuestOnlyRoute element={route.element} />
        ),
      };
    }

    if (route.protected) {
      return {
        ...route,
        element: withSuspense(
          <ProtectedRoute
            element={route.element}
            roles={route.roles}
          />
        ),
      };
    }

    return {
      ...route,
      element: withSuspense(route.element),
    };
  })
);