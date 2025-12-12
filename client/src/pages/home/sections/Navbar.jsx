import React from "react";
import { Menu, X, Truck, Search, Bell, User } from "lucide-react";
import Button from "../../../components/ui/buttons/Button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown";

export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const navItems = [
    { label: "Fuel Management", icon: Search },
    { label: "Maintenance", icon: Bell },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-accent" />
              <span className="text-xl font-medium text-text-light">Logix</span>
              <span className="hidden sm:inline text-sm text-text font-medium ml-2 px-2 py-1 bg-bg-dark rounded">
                Fleet Management
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                icon={item.icon}
                className="gap-1 text-sm font-normal"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Right Side - User & Actions */}
          <div className="hidden md:flex items-center gap-2">
            {!user && (
              <>
                {/* <div className="h-6 w-px bg-secondary/50"></div> */}
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="sm"
                  icon={User}
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant="accent"
                  size="sm"
                >
                  Get Started
                </Button>
              </>
            )}
            {user && <ProfileDropdown  />}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-text hover:text-accent hover:bg-bg-dark rounded transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-secondary/30 bg-bg"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMenuOpen ? 1 : 0,
              height: isMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  fullWidth
                  icon={item.icon}
                  className="justify-start text-sm font-normal"
                >
                  {item.label}
                </Button>
              ))}

              <div className="pt-2 border-t border-secondary/30 mt-2 space-y-1">
                {!user && (
                  <>
                    <Button
                      onClick={() => navigate("/login")}
                      variant="secondary"
                      fullWidth
                      icon={User}
                      className="justify-start text-sm font-normal mt-2"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => navigate("/register")}
                      variant="accent"
                      fullWidth
                      className="text-sm font-normal mt-2"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
