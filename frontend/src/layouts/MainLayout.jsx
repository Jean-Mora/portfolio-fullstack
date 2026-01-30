import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <Navbar /> {/* Solo aparece una vez */}
    <main className="flex-1 p-4">
      <Outlet /> {/* Aquí se renderizan todas las páginas */}
    </main>
  </div>
);

export default MainLayout;
