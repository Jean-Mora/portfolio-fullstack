import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white px-4 relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        
        * {
          font-family: 'Syne', sans-serif;
        }
        
        .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { opacity: 1; box-shadow: 0 0 40px rgba(16, 185, 129, 0.6); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glitch {
          animation: glitch 0.3s infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        {/* 404 Number */}
        <div className="mb-8 relative">
          <h1 className="text-9xl md:text-[200px] font-extrabold leading-none">
            <span className="text-gradient">404</span>
          </h1>
          
          {/* Glitch Effect Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-glitch pointer-events-none">
            <span className="text-9xl md:text-[200px] font-extrabold text-emerald-400">404</span>
          </div>
        </div>

        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-emerald-500/30 animate-pulse-glow">
            <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        {/* Messages */}
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          ¡Ups! Página no encontrada
        </h2>
        
        <p className="text-xl text-slate-400 mb-4 leading-relaxed">
          Parece que te has perdido en el ciberespacio.
        </p>
        
        <p className="text-lg text-slate-500 mb-10">
          La página que buscas no existe o ha sido movida a otra dimensión.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al Inicio
          </Link>

          <Link
            to="/blog"
            className="group px-8 py-4 bg-slate-800/60 backdrop-blur-sm border border-slate-700 text-slate-300 hover:text-white font-bold rounded-xl hover:bg-slate-700/60 transition-all duration-300 hover:scale-105 flex items-center gap-3"
          >
            Explorar el Blog
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        {/* Fun Message */}
        <div className="mt-12 inline-block px-6 py-3 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-full">
          <p className="text-slate-500 text-sm font-mono">
            <span className="text-emerald-400">Error Code:</span> LOST_IN_SPACE_404
          </p>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed bottom-10 right-10 text-slate-700 opacity-50 pointer-events-none">
        <svg className="w-32 h-32 animate-float" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      </div>

      <div className="fixed top-10 left-10 text-slate-700 opacity-30 pointer-events-none">
        <svg className="w-24 h-24 animate-float" style={{ animationDelay: '1s' }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      </div>
    </section>
  );
};

export default NotFound;