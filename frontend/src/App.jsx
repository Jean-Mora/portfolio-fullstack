import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./router/ProtectedRoute";

// App.jsx - al inicio
import EditCV from "./pages/EditCV";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";

function App() {
  return (
    <Routes>
      {/* Todas las rutas comparten MainLayout */}
      <Route element={<MainLayout />}>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<Post />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/edit-cv" element={<EditCV />} /> {/* 👈 NUEVA */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard/create-post" element={<div>¡Página de crear post funciona!</div>} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
