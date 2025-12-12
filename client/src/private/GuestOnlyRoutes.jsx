import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";


export default function GuestOnlyRoute({ element }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {

    return <Navigate to="/" replace />;
  }

  return element;
}
