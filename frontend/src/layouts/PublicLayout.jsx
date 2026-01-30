import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const PublicLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar /> {/* Barra para rutas públicas */}
    <main className="flex-1 p-4">
      <Outlet /> {/* Home, Blog, Login, etc. */}
    </main>
  </div>
);

export default PublicLayout;
