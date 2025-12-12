import { RegisterForm } from "./sections/register/RegisterForm";
import { RegisterBillboard } from "./sections/register/RegisterBillboard";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/apis/auth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, isSuccess } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    },
  });

  const handleSubmit = (data) => {
    mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      <RegisterBillboard />
      <RegisterForm
        isSuccess={isSuccess}
        isError={isError}
        isLoading={isPending}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
