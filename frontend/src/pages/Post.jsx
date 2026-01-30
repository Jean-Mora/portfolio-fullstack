import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ... (resto de tus imports igual)
import axios from "axios";

const Post = () => {
  // ... (tus estados de id, post, loading igual)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // --- CAMBIO AQUÍ ---
        // Definimos la URL usando la variable que configuraste en Vercel
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        
        // Ahora usamos esa variable en la petición
        const res = await axios.get(`${API_URL}/api/posts/${id}`);
        // -------------------
        
        setPost(res.data);
      } catch (error) {
        console.error("Error al cargar el post", error);
        setError("No se pudo cargar el artículo");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // ... (el resto del diseño con Tailwind se queda exactamente igual)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-r-2 border-l-2 border-blue-400 mx-auto animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-slate-300 font-medium">Cargando artículo...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Artículo no encontrado</h2>
          <p className="text-slate-400 mb-8">{error || "El artículo que buscas no existe o ha sido eliminado"}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-emerald-500/50 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Blog
          </Link>
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .prose {
          line-height: 1.8;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
        }
        
        .prose h2 {
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #10b981;
        }
        
        .prose h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
          color: #3b82f6;
        }
        
        .prose ul, .prose ol {
          margin-left: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .prose li {
          margin-bottom: 0.5rem;
        }
        
        .prose code {
          background: rgba(15, 23, 42, 0.8);
          padding: 0.25rem 0.5rem;
          border-radius: 0.375rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.875rem;
          color: #10b981;
        }
        
        .prose pre {
          background: rgba(15, 23, 42, 0.8);
          padding: 1.5rem;
          border-radius: 0.75rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .prose pre code {
          background: transparent;
          padding: 0;
          color: #e2e8f0;
        }
        
        .prose blockquote {
          border-left: 4px solid #10b981;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #cbd5e1;
        }
      `}</style>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Back Button */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-3 glass-effect rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all font-semibold"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver al Blog
        </Link>
      </div>

      {/* Article Header */}
      <article className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Featured Image */}
        {post.featuredImage && (
          <div className="mb-12 rounded-3xl overflow-hidden">
            <img 
              src={post.featuredImage} 
              alt={post.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 text-slate-500 font-mono text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {post.createdAt && new Date(post.createdAt).toLocaleDateString("es-ES", {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs rounded-full border border-emerald-500/30 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8">
          <span className="text-gradient">{post.title}</span>
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-2xl text-slate-400 leading-relaxed mb-12 font-light">
            {post.excerpt}
          </p>
        )}

        {/* Divider */}
        <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full mb-12"></div>

        {/* Content */}
        <div className="prose text-lg text-slate-300">
          {post.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-wrap gap-4 justify-between items-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 glass-effect rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all font-semibold"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Ver más artículos
          </Link>

          {/* Share Buttons */}
          <div className="flex gap-3">
            <button className="p-3 glass-effect rounded-xl hover:bg-slate-800/60 transition-all">
              <svg className="w-5 h-5 text-slate-400 hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </button>
            <button className="p-3 glass-effect rounded-xl hover:bg-slate-800/60 transition-all">
              <svg className="w-5 h-5 text-slate-400 hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </button>
            <button className="p-3 glass-effect rounded-xl hover:bg-slate-800/60 transition-all">
              <svg className="w-5 h-5 text-slate-400 hover:text-emerald-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Post;