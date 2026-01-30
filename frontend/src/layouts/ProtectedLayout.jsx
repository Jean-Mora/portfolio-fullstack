import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar /> {/* Barra para rutas protegidas */}
    <main className="flex-1 p-4">
      <Outlet /> {/* Dashboard, Admin, etc */}
    </main>
  </div>
);

export default ProtectedLayout;
