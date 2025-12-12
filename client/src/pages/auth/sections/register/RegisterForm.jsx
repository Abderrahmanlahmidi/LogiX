import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  Truck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  UserPlus,
  ArrowLeft,
} from "lucide-react";
import Button from "../../../../components/ui/buttons/Button";
import Alert from "../../../../components/ui/alerts/Alert";

export const RegisterForm = ({
  isSuccess,
  isError,
  isLoading = false,
  onSubmit = () => {},
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const password = watch("password");

  const handleFormSubmit = async (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-bg">
      <div className="w-full max-w-sm">
        <div className="lg:hidden text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Truck className="h-8 w-8 text-accent" />
            <span className="text-2xl font-normal text-text-light">Logix</span>
          </div>
          <p className="text-text text-sm">Fleet Management</p>
        </div>

        <div className="space-y-6">

          <div className="text-center mb-8">
            <h2 className="text-xl font-normal text-text-light">
              Create Account
            </h2>
            <p className="text-text text-sm mt-1">Start managing your fleet</p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {(isSuccess || isError) && (
              <Alert
                type={isError ? "warning" : "success"}
                open={!!isError || !!isSuccess}
                onClose={() => {false}}
                dismissible
                autoCloseSeconds={5}
              >
                {isError
                  ? "Login failed. Please check your credentials."
                  : "Login successful! Redirecting..."}
              </Alert>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-text mb-1">
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full pl-9 pr-3 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    {...register("firstName", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-xs text-error">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-text mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full pl-9 pr-3 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                    {...register("lastName", {
                      required: "Last name is required",
                      minLength: {
                        value: 2,
                        message: "Minimum 2 characters",
                      },
                    })}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-xs text-error">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-text mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-text mb-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-9 pr-3 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-error">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-text mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                      message: "Must include uppercase, lowercase, and number",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/60 hover:text-text"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-error">
                  {errors.password.message}
                </p>
              )}
              <p className="text-xs text-text/60 mt-1">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            </div>

            <div>
              <label className="block text-sm text-text mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="accent"
              fullWidth
              icon={UserPlus}
              loading={isLoading}
              disabled={isLoading}
              className="mt-4 text-sm font-normal"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="pt-4 border-t border-secondary text-center">
            <p className="text-xs text-text/60">
              Already have an account?{" "}
              <Link to="/login" className="text-accent hover:text-opacity-80">
                Sign In
              </Link>
            </p>
          </div>

          <div className="pt-4 text-center">
            <p className="text-xs text-text/60 mt-2">
              © 2024 Logix Fleet Management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
