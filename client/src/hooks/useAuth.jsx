import { useSelector } from "react-redux";


export const useAuth = () => {
  const {user, loading} = useSelector((state) => state.auth);

  return {
    isAuthenticated: !!user,
    role: user?.role || null,
    loading
  };
};
