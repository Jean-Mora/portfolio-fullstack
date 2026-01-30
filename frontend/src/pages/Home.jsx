import { useState, useEffect } from "react";
import api from "../services/api";

export default function Home() {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await api.get("/cv");
        setCv(res.data);
      } catch (err) {
        console.error("Error al cargar CV:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-r-2 border-l-2 border-blue-400 mx-auto animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-slate-300 font-medium tracking-wide">Cargando portafolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');
        
        * {
          font-family: 'Syne', sans-serif;
        }
        
        code, .font-mono {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes slide-up {
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
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
          border: 1px solid transparent;
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
        
        .glass-effect {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl w-full relative z-10">
          <div className="text-center space-y-8 animate-slide-up">
            {/* Badge superior */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-effect rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-glow"></div>
              <span className="text-sm text-slate-300 font-medium">Disponible para proyectos</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight">
              <span className="text-gradient">
                {cv?.personalInfo?.name || "Tu Nombre"}
              </span>
            </h1>
            
            <p className="text-3xl md:text-4xl font-semibold text-slate-300 tracking-tight">
              {cv?.personalInfo?.title || "Desarrollador Full-Stack"}
            </p>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
              {cv?.personalInfo?.bio || "Apasionado por crear soluciones tecnológicas innovadoras que transforman ideas en realidad"}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {cv?.personalInfo?.email && (
                <a
                  href={`mailto:${cv.personalInfo.email}`}
                  className="group relative px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Contáctame
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              )}
              
              <div className="flex gap-3">
                {cv?.personalInfo?.github && (
                  <a
                    href={cv.personalInfo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-4 glass-effect rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/80 hover:scale-105 hover:border-emerald-400/50"
                  >
                    <svg className="w-6 h-6 group-hover:text-emerald-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
                
                {cv?.personalInfo?.linkedin && (
                  <a
                    href={cv.personalInfo.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group px-6 py-4 glass-effect rounded-xl font-semibold transition-all duration-300 hover:bg-slate-800/80 hover:scale-105 hover:border-blue-400/50"
                  >
                    <svg className="w-6 h-6 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      {cv?.personalInfo?.about && (
        <section className="relative py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="glass-effect rounded-3xl p-12 md:p-16 gradient-border">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient">
                Sobre Mí
              </h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                {cv.personalInfo.about}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Habilidades */}
      {cv?.skills && cv.skills.length > 0 && (
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              <span className="text-gradient">Stack Tecnológico</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cv.skills.map((skill, index) => (
                <div
                  key={index}
                  className="group glass-effect p-6 rounded-2xl text-center hover:bg-slate-800/60 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer gradient-border"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <p className="font-bold text-lg group-hover:text-emerald-400 transition-colors">
                    {skill}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Experiencia */}
      {cv?.experience && cv.experience.length > 0 && (
        <section className="relative py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              <span className="text-gradient">Experiencia</span>
            </h2>
            
            <div className="space-y-6">
              {cv.experience.map((exp, index) => (
                <div
                  key={index}
                  className="group glass-effect p-8 md:p-10 rounded-3xl gradient-border hover:bg-slate-800/60 transition-all duration-500 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">
                        {exp.position}
                      </h3>
                      <p className="text-xl text-slate-300 font-semibold">{exp.company}</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-700">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-slate-400 font-mono text-sm">
                        {exp.startDate} - {exp.endDate || "Presente"}
                      </span>
                    </div>
                  </div>
                  
                  {exp.description && (
                    <p className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
                      {exp.description}
                    </p>
                  )}
                  
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-300 text-lg">
                          <span className="text-emerald-400 mt-1 text-2xl">▸</span>
                          <span className="font-light">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Educación */}
      {cv?.education && cv.education.length > 0 && (
        <section className="relative py-32 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              <span className="text-gradient">Formación</span>
            </h2>
            
            <div className="space-y-6">
              {cv.education.map((edu, index) => (
                <div
                  key={index}
                  className="group glass-effect p-8 md:p-10 rounded-3xl gradient-border hover:bg-slate-800/60 transition-all duration-500"
                >
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">
                        {edu.degree}
                      </h3>
                      <p className="text-xl text-slate-300 font-semibold mb-3">{edu.institution}</p>
                      {edu.description && (
                        <p className="text-slate-400 text-lg font-light">{edu.description}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 rounded-xl border border-slate-700 self-start">
                      <span className="text-slate-400 font-mono text-sm">
                        {edu.startDate} - {edu.endDate || "En curso"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Proyectos */}
      {cv?.projects && cv.projects.length > 0 && (
        <section className="relative py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
              <span className="text-gradient">Proyectos Destacados</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {cv.projects.map((project, index) => (
                <div
                  key={index}
                  className="group glass-effect p-8 rounded-3xl gradient-border hover:bg-slate-800/60 transition-all duration-500 hover:scale-[1.03] flex flex-col"
                >
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-4 group-hover:text-emerald-300 transition-colors">
                    {project.name}
                  </h3>
                  
                  <p className="text-slate-300 text-lg mb-6 flex-grow font-light leading-relaxed">
                    {project.description}
                  </p>
                  
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-blue-900/30 text-emerald-300 text-sm rounded-xl border border-emerald-500/30 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold text-lg transition-colors"
                    >
                      Ver proyecto
                      <svg className="w-5 h-5 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-effect rounded-3xl p-12 md:p-16 gradient-border">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">¿Trabajemos Juntos?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 font-light leading-relaxed">
              Estoy siempre abierto a nuevas oportunidades y colaboraciones.<br />
              No dudes en contactarme para discutir tu próximo proyecto.
            </p>
            {cv?.personalInfo?.email && (
              <a
                href={`mailto:${cv.personalInfo.email}`}
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl text-xl font-bold transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/50 hover:scale-105"
              >
                Iniciar Conversación
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500 font-mono text-sm">
          <p>© 2026 {cv?.personalInfo?.name || "Tu Nombre"}. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}