import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-r-2 border-l-2 border-blue-400 mx-auto animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-slate-300 font-medium">Cargando artículos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-400 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        
        * {
          font-family: 'Syne', sans-serif;
        }
        
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .glass-effect {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .gradient-border {
          position: relative;
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(145deg, #10b981, #3b82f6);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
      `}</style>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <header className="mb-20 text-center animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full mb-8">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-300 font-medium font-mono">Blog Técnico</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-gradient">Conocimiento</span>
              <br />
              <span className="text-white">Compartido</span>
            </h1>
            
            <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Artículos sobre desarrollo web, arquitectura de software y tecnologías modernas
            </p>
          </header>

          {/* Posts Grid */}
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="glass-effect rounded-3xl p-12 max-w-md mx-auto gradient-border">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                </div>
                <p className="text-slate-400 text-lg">No hay artículos publicados aún.</p>
                <p className="text-slate-500 text-sm mt-2">¡Vuelve pronto para ver nuevo contenido!</p>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {posts.map((post, index) => (
                <Link
                  key={post._id}
                  to={`/blog/${post._id}`}
                  className="group glass-effect rounded-3xl overflow-hidden gradient-border hover:bg-slate-800/60 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Featured Image Area */}
                  {post.featuredImage ? (
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={post.featuredImage} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="relative h-64 bg-gradient-to-br from-emerald-900/30 to-blue-900/30 flex items-center justify-center">
                      <svg className="w-16 h-16 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-8 flex-1 flex flex-col">
                    {/* Date & Tags */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-mono">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {post.createdAt &&
                          new Date(post.createdAt).toLocaleDateString("es-ES", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors leading-tight">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-slate-400 text-lg leading-relaxed mb-6 flex-grow line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-slate-800/50 text-emerald-400 text-xs rounded-full border border-emerald-500/30 font-semibold"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="px-3 py-1 text-slate-500 text-xs">
                            +{post.tags.length - 3} más
                          </span>
                        )}
                      </div>
                    )}

                    {/* Read More */}
                    <div className="flex items-center gap-2 text-blue-400 font-bold group-hover:gap-4 transition-all">
                      <span>Leer artículo</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Newsletter CTA (optional) */}
          {posts.length > 0 && (
            <div className="mt-20 glass-effect rounded-3xl p-12 text-center gradient-border max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-gradient">¿Te gusta el contenido?</span>
              </h3>
              <p className="text-slate-400 mb-6">
                Suscríbete para recibir los últimos artículos directamente en tu correo
              </p>
              <div className="flex gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-6 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all hover:scale-105">
                  Suscribir
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;