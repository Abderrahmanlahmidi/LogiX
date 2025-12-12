import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Truck, Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import Button from "../../../../components/ui/buttons/Button";
import Alert from "../../../../components/ui/alerts/Alert";

export const LoginForm = ({
  isSuccess,
  isError,
  isLoading = false,
  onSubmit = () => {},
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleFormSubmit = async (data) => {
    onSubmit(data);
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-bg">
      <div className="w-full max-w-sm">
        {/* Mobile Logo */}
        <div className="lg:hidden text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-3">
            <Truck className="h-8 w-8 text-accent" />
            <span className="text-2xl font-normal text-text-light">Logix</span>
          </div>
          <p className="text-text text-sm">Fleet Management</p>
        </div>

        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-normal text-text-light">Sign In</h2>
            <p className="text-text text-sm mt-1">Access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {(isSuccess || isError) && (
              <Alert
                type={isError ? "warning" : "success"}
                open={!!isError || !!isSuccess}
                onClose={() => {}}
                dismissible
                autoCloseSeconds={5}
              >
                {isError
                  ? "Login failed. Please check your credentials."
                  : "Login successful! Redirecting..."}
              </Alert>
            )}

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
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm text-text">Password</label>
                <Link
                  to="#"
                  className="text-xs text-accent hover:text-opacity-80"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 bg-bg border border-secondary rounded text-text-light text-sm focus:outline-none focus:border-accent"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Minimum 6 characters",
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
            </div>

            <Button
              type="submit"
              variant="accent"
              fullWidth
              icon={LogIn}
              loading={isLoading}
              disabled={isLoading}
              className="mt-4 text-sm font-normal"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>


          <div className="pt-4 text-center">
            <p className="text-xs text-text/60">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-accent hover:text-opacity-80"
              >
                Register
              </Link>
            </p>
            <p className="text-xs text-text/60 mt-2">© 2024 Logix</p>
          </div>
        </div>
      </div>
    </div>
  );
};
