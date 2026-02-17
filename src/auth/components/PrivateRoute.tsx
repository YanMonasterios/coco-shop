import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";

export const PrivateRoute = () => {
  const { isAuthenticated, mustChangePass } = useAuth();

  // Si no está logueado -> Login
  if (!isAuthenticated) return <Navigate to="/auth/login" />;
  
  // Si debe cambiar contraseña -> Change Password
  if (mustChangePass) return <Navigate to="/auth/change-password" />;
 
  // Si todo ok -> Renderiza la ruta hija (Outlet)
  return <Outlet />;
};
