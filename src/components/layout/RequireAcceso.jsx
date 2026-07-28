import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../services/authService";

export default function RequireAcceso({ children }) {
  const location = useLocation();
  if (!isAuthenticated()) {
    return <Navigate to="/acceso" replace state={{ from: location }} />;
  }
  return children;
}
