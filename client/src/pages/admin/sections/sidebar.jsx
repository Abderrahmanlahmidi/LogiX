import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home
} from "lucide-react";
import { SIDEBAR_ITEMS } from "../../../constants/DashboardConstants";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true); 
  const location = useLocation();
  const navigate = useNavigate(); 

  const role = useSelector((state) => state.auth.user.role);
  const items = SIDEBAR_ITEMS[role] || [];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <motion.div
      initial={{ width: 256 }}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="h-screen bg-bg border-r border-secondary flex flex-col p-4 relative shrink-0 sticky top-0"
    >
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="absolute -right-3 top-6 bg-bg border border-secondary text-text p-1 rounded-full hover:bg-bg-dark transition-colors z-50"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo */}
      <div className="flex items-center gap-3 mb-8 px-1">
        <div className="min-w-[2rem] h-8 bg-accent/20 rounded flex items-center justify-center">
          <LayoutDashboard className="h-5 w-5 text-accent" />
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.h1
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="text-text-light text-lg font-normal whitespace-nowrap overflow-hidden"
            >
              Dashboard
            </motion.h1>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-4 px-3 py-2.5 rounded transition-colors overflow-hidden whitespace-nowrap
                ${
                  isActive
                    ? "bg-bg-dark text-text-light"
                    : "text-text hover:bg-bg-dark hover:text-text-light"
                }
              `}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeBorder"
                  className="absolute left-0 top-0 h-full w-0.5 bg-accent rounded-r"
                />
              )}

              <item.icon className="h-5 w-5 min-w-[20px]" />

              <AnimatePresence>
                {isOpen && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ delay: 0.05 }}
                    className="text-sm font-normal"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer Buttons */}
      <div className="mt-auto space-y-2 pt-4 border-t border-secondary">
        {/* Home Button */}
        <button 
          onClick={handleGoHome}
          className="w-full cursor-pointer flex items-center gap-4 px-3 py-2 text-text hover:text-text-light hover:bg-bg-dark rounded transition-colors overflow-hidden whitespace-nowrap"
        >
          <Home className="h-5 w-5 min-w-[20px]" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="text-sm font-normal"
              >
                Go Home
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Logout Button */}
        <button className="w-full cursor-pointer flex items-center gap-4 px-3 py-2 text-error hover:bg-bg-dark rounded transition-colors overflow-hidden whitespace-nowrap">
          <LogOut className="h-5 w-5 min-w-[20px]" />
          <AnimatePresence>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                className="text-sm font-normal"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}