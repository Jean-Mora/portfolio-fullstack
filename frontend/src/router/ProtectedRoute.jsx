import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { user, loading } = useAuth(); // ← Obtén loading también

  // ✅ Espera a que termine de verificar el token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // ✅ Ahora sí verifica si hay usuario
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // Renderiza rutas hijas
};

export default ProtectedRoute;