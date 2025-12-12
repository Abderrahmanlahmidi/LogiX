import { LoginForm } from "./sections/login/LoginForm";
import { LoginBillboard } from "./sections/login/LoginBillboard";
import { login } from "../../services/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: login,
    onSuccess: (response) => {

      const { data } = response;

      if (data && data.accessToken && data.user) {
        const user = {
          accessToken:data.accessToken,
          userId:data.user._id,
          role:data.user.roleId.name
        }
        
        localStorage.setItem("user", JSON.stringify(user));

        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    },
  });

  const handleSubmit = async (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      <LoginBillboard />
      <LoginForm
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
