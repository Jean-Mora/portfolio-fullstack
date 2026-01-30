import { Navigate } from "react-router-dom";

const PrivateRoute = ({ user, children, role }) => {
  if (!user) return <Navigate to="/login" />;
  if (role && user.rol !== role) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
