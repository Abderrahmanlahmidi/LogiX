import { Outlet } from "react-router-dom";
import Sidebar from "../sections/sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}