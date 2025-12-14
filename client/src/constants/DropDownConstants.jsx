import { User, LayoutDashboard, LogOut } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../store/slices/authSlice";

export const MenuItem = ({ setIsOpen, setConfirmOpen }) => {
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.user?.role);

  const roleMenu = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/dashboard",
      roles: ["Admin", "Driver"],
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
      roles: ["Admin", "Driver"],
    },
  ];


  const menuItems = roleMenu.filter((item) => item.roles.includes(role));

  return (
    <div className="py-1">
      {menuItems.map((item, index) => (
        <button
          key={index}
          onClick={() => {
            navigate(item.path);
            setIsOpen(false);
          }}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-text hover:text-text-light hover:bg-bg-dark transition-colors ${
            item.color || ""
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </button>
      ))}


   <button
    onClick={() => {
      setConfirmOpen(true)
    }}
    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-error hover:text-error hover:bg-error/10 transition-colors"
   >
    <LogOut className="h-4 w-4" />
    Logout
   </button>
    </div>
  );
};
