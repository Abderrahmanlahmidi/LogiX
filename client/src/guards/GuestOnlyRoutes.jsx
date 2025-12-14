import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function GuestOnlyRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {

    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
}
