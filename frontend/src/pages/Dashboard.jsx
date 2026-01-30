import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalPosts: 0,
    cvComplete: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Obtener posts
        const postsRes = await api.get("/posts");
        
        // Verificar si existe CV
        let cvExists = false;
        try {
          await api.get("/cv");
          cvExists = true;
        } catch (err) {
          cvExists = false;
        }

        setStats({
          totalPosts: postsRes.data.length,
          cvComplete: cvExists,
        });
      } catch (err) {
        console.error("Error al cargar estadísticas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Bienvenido de vuelta! 👋
          </h1>
          <p className="text-gray-600">
            Gestiona tu portafolio desde aquí
          </p>
        </header>

        {/* Estadísticas */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Total de Posts</p>
                <p className="text-4xl font-bold text-gray-900 mt-2">{stats.totalPosts}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <Link
              to="/admin"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
            >
              Gestionar posts →
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Estado del CV</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stats.cvComplete ? "Completo ✓" : "Pendiente"}
                </p>
              </div>
              <div className={`${stats.cvComplete ? 'bg-green-100' : 'bg-yellow-100'} p-4 rounded-lg`}>
                <svg 
                  className={`w-8 h-8 ${stats.cvComplete ? 'text-green-600' : 'text-yellow-600'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <Link
              to="/dashboard/edit-cv"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-4 inline-block"
            >
              {stats.cvComplete ? "Editar CV →" : "Completar CV →"}
            </Link>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Acciones Rápidas</h2>
          
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              to="/admin"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition"
            >
              <div className="bg-blue-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Crear Post</p>
                <p className="text-sm text-gray-500">Nuevo artículo</p>
              </div>
            </Link>

            <Link
              to="/dashboard/edit-cv"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:shadow-md transition"
            >
              <div className="bg-green-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Editar CV</p>
                <p className="text-sm text-gray-500">Hoja de vida</p>
              </div>
            </Link>

            <Link
              to="/"
              target="_blank"
              className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:shadow-md transition"
            >
              <div className="bg-purple-100 p-3 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Ver Portafolio</p>
                <p className="text-sm text-gray-500">Vista pública</p>
              </div>
            </Link>
          </div>
        </section>

        {/* Alertas / Notificaciones */}
        {!stats.cvComplete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-6 h-6 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-yellow-800">Completa tu CV</p>
              <p className="text-yellow-700 text-sm mt-1">
                Tu portafolio estará más completo si agregas tu información profesional.
              </p>
              <Link
                to="/dashboard/edit-cv"
                className="text-yellow-800 font-medium text-sm mt-2 inline-block hover:underline"
              >
                Completar ahora →
              </Link>
            </div>
          </div>
        )}

        {stats.totalPosts < 4 && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 mt-4">
            <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-semibold text-blue-800">Posts del blog</p>
              <p className="text-blue-700 text-sm mt-1">
                Necesitas al menos 4 posts técnicos para completar los requisitos del proyecto.
                Actualmente tienes {stats.totalPosts} post{stats.totalPosts !== 1 ? 's' : ''}.
              </p>
              <Link
                to="/admin"
                className="text-blue-800 font-medium text-sm mt-2 inline-block hover:underline"
              >
                Crear post →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}