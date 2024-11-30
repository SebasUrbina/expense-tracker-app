import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "../context/SessionContext";

const ProtectedRoute = () => {
  const { session } = useSession();

  // Si no hay sesión, redirige al login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Si hay sesión, renderiza las rutas hijas usando Outlet
  return <Outlet />;
};

export default ProtectedRoute;
