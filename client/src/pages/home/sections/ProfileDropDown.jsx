import { useState } from "react";
import { User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { userInfo } from "../../../services/apis/userProfile";
import { DisplayImages } from "../../../constants/DisplayImagesConstants";
import { MenuItem } from "../../../constants/DropDownConstants";
import { ConfirmPopup } from "../../../components/ui/confirmPopup/ConfirmPopup";
import { clearUser } from "../../../store/slices/authSlice";
import { api } from "../../../services/api";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();
  const id = useSelector((state) => state.auth.user?.userId);
  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => userInfo(id),
  });

  const fullName = `${data?.data.firstName || ""} ${
    data?.data.lastName || ""
  }`.trim();
  const truncatedName =
    fullName.length > 15 ? fullName.substring(0, 15) + "..." : fullName;

  const profile = data?.data.profile;

  const email = data?.data.email || "";
  const truncatedEmail =
    email.length > 20 ? email.substring(0, 20) + "..." : email;

  const handleLogout = async () => {
    try {
      await api.post(
        "/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(clearUser());
      localStorage.removeItem("user");
      setIsOpen(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const dropdownVariants = {
    closed: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    open: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center gap-2 p-1.5 rounded hover:border hover:border-bg-dark transition-colors"
        >
          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center overflow-hidden flex-shrink-0">
            {profile ? (
              <img
                src={DisplayImages(profile)}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <User className="h-4 w-4 text-accent" />
              </>
            )}
          </div>
          <div className="hidden md:block text-left">
            <div className="text-sm font-normal text-text-light">
              {truncatedName || "User"}
            </div>
            <div className="text-xs text-text">
              {truncatedEmail || "user@example.com"}
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-text transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Tooltip on hover */}
        {showTooltip && (fullName.length > 15 || email.length > 20) && (
          <div className="absolute top-full left-0 mt-1 p-2 bg-bg-dark border border-secondary rounded text-xs z-50 whitespace-nowrap">
            <div className="font-medium text-text-light">{fullName}</div>
            <div className="text-text">{email}</div>
          </div>
        )}
      </div>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              variants={dropdownVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute right-0 mt-2 w-56 bg-bg border border-secondary rounded shadow-lg z-50"
            >
              {/* Full User Info with Profile Image */}
              <div className="p-3 border-b border-secondary">
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="font-normal text-text-light truncate">
                      {fullName || "User"}
                    </div>
                    <div className="text-xs text-text truncate">
                      {email || "user@example.com"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <MenuItem setIsOpen={setIsOpen} setConfirmOpen={setShowConfirm} />

              {setShowConfirm && (
                <ConfirmPopup
                  isOpen={showConfirm}
                  onClose={() => setShowConfirm(false)}
                  onConfirm={handleLogout}
                  title="Confirm Logout"
                  message="Are you sure you want to log out? You will need to sign in again."
                  confirmText="Logout"
                  cancelText="Cancel"
                  type="warning"
                />
              )}

              {/* Version Info */}
              <div className="p-3 border-t border-secondary">
                <div className="text-xs text-text/60">Logix v2.0.1</div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
