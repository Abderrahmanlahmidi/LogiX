import React from "react";
import { Menu, X, Truck, User, Home, Info, Wrench } from "lucide-react";
import Button from "../../../components/ui/buttons/Button";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropdown from "./ProfileDropDown";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const navLinks = [
    { label: "Home", to: "/", icon: Home },
    { label: "About", to: "/about", icon: Info },
    { label: "Services", to: "/services", icon: Wrench },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg border-b border-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Truck className="h-8 w-8 text-accent" />
            <span className="text-xl font-medium text-text-light">Logix</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-2 text-sm text-text hover:text-accent transition"
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2">

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              {!user && (
                <>
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
              {user && <ProfileDropdown />}
            </div>

            {/* Mobile */}
            <div className="flex items-center gap-2 md:hidden">
              {user && <ProfileDropdown />}

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-text hover:text-accent hover:bg-bg-dark rounded"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden border-t border-secondary/30 bg-bg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.25 }}
          >
            <div className="px-3 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-text hover:text-accent"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </Link>
              ))}

              {!user && (
                <div className="pt-3 border-t border-secondary/30 space-y-2">
                  <Button
                    onClick={() => navigate("/login")}
                    variant="secondary"
                    fullWidth
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="accent"
                    fullWidth
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}