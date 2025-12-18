import { lazy, Suspense } from "react";
import { LoaderPage } from "../components/ui/loading/LoaderPage";

export const Home = lazy(() => import("../pages/home/Home"));
export const Login = lazy(() => import("../pages/auth/login"));
export const Register = lazy(() => import("../pages/auth/register"));
export const Dashboard = lazy(() => import("../pages/admin/dashboard"));
export const Profile = lazy(() => import("../pages/profile/profile"));


// eslint-disable-next-line react-refresh/only-export-components
export const withSuspense = (Component) => {
  return <Suspense fallback={<LoaderPage />}>{Component}</Suspense>;
};
