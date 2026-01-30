import { useState, useEffect } from "react";
import api from "../services/api";

export default function EditCV() {
  const [cv, setCv] = useState({
    personalInfo: {
      name: "",
      title: "",
      bio: "",
      about: "",
      email: "",
      phone: "",
      github: "",
      linkedin: "",
      portfolio: "",
    },
    skills: [],
    experience: [],
    education: [],
    projects: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    fetchCV();
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  const fetchCV = async () => {
    try {
      const res = await api.get("/cv");
      if (res.data) {
        setCv({
          personalInfo: {
            name: res.data.nombre || "",
            title: res.data.titulo || "",
            bio: res.data.bio || "",
            about: res.data.resumen || "",
            email: res.data.email || "",
            phone: res.data.telefono || "",
            github: res.data.github || "",
            linkedin: res.data.linkedin || "",
            portfolio: res.data.portfolio || "",
          },
          skills: res.data.habilidades || [],
          experience: res.data.experiencia || [],
          education: res.data.estudios || [],
          projects: res.data.projects || [],
        });
      }
    } catch (err) {
      console.error("Error al cargar CV:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePersonalInfoChange = (field, value) => {
    setCv((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value,
      },
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setCv((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (index) => {
    setCv((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setCv((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          position: "",
          company: "",
          startDate: "",
          endDate: "",
          description: "",
          achievements: [],
        },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index) => {
    setCv((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addEducation = () => {
    setCv((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateEducation = (index, field, value) => {
    setCv((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [field]: value } : edu
      ),
    }));
  };

  const removeEducation = (index) => {
    setCv((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      let response;
      try {
        response = await api.put("/cv", cv);
      } catch (err) {
        if (err.response?.status === 404) {
          response = await api.post("/cv", cv);
        } else {
          throw err;
        }
      }
      setSuccess("CV actualizado correctamente");
      setCv(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error al guardar el CV");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-emerald-400 mx-auto mb-6"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-r-2 border-l-2 border-blue-400 mx-auto animate-spin" style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="text-slate-300 text-lg font-medium">Cargando CV...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
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
      `}</style>

      {/* Decorative Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            <span className="text-gradient">Editar Hoja de Vida</span>
          </h1>
          <p className="text-slate-400 text-lg">Actualiza tu información profesional</p>
        </header>

        {/* Mensajes */}
        {success && (
          <div className="mb-6 glass-effect border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-emerald-400 font-semibold">{success}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 glass-effect border border-red-500/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-red-400 font-semibold">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Información Personal */}
          <section className="glass-effect rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Información Personal
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Nombre Completo <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={cv.personalInfo.name}
                  onChange={(e) => handlePersonalInfoChange("name", e.target.value)}
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Título Profesional <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={cv.personalInfo.title}
                  onChange={(e) => handlePersonalInfoChange("title", e.target.value)}
                  placeholder="Desarrollador Full-Stack"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Bio Corta
                </label>
                <input
                  type="text"
                  value={cv.personalInfo.bio}
                  onChange={(e) => handlePersonalInfoChange("bio", e.target.value)}
                  placeholder="Breve descripción de una línea"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Sobre Mí
                </label>
                <textarea
                  value={cv.personalInfo.about}
                  onChange={(e) => handlePersonalInfoChange("about", e.target.value)}
                  rows="4"
                  placeholder="Cuéntanos sobre ti..."
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={cv.personalInfo.email}
                  onChange={(e) => handlePersonalInfoChange("email", e.target.value)}
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={cv.personalInfo.phone}
                  onChange={(e) => handlePersonalInfoChange("phone", e.target.value)}
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  GitHub
                </label>
                <input
                  type="url"
                  value={cv.personalInfo.github}
                  onChange={(e) => handlePersonalInfoChange("github", e.target.value)}
                  placeholder="https://github.com/usuario"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={cv.personalInfo.linkedin}
                  onChange={(e) => handlePersonalInfoChange("linkedin", e.target.value)}
                  placeholder="https://linkedin.com/in/usuario"
                  className="w-full px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm"
                />
              </div>
            </div>
          </section>

          {/* Habilidades */}
          <section className="glass-effect rounded-3xl p-8 md:p-10">
            <h2 className="text-3xl font-bold mb-8 text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              Habilidades Técnicas
            </h2>
            
            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                placeholder="React, Node.js, MongoDB..."
                className="flex-1 px-5 py-4 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-blue-500/50 transition-all hover:scale-105"
              >
                Agregar
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              {cv.skills.map((skill, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl font-semibold"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="hover:text-red-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </section>

          {/* Experiencia Laboral */}
          <section className="glass-effect rounded-3xl p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                Experiencia
              </h2>
              <button
                type="button"
                onClick={addExperience}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </button>
            </div>

            <div className="space-y-6">
              {cv.experience.map((exp, index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-xl text-purple-400">Experiencia {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeExperience(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Cargo</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => updateExperience(index, "position", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Empresa</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, "company", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Inicio</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                        placeholder="Enero 2023"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Fin</label>
                      <input
                        type="text"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                        placeholder="Presente"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Descripción</label>
                      <textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(index, "description", e.target.value)}
                        rows="3"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-purple-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Educación */}
          <section className="glass-effect rounded-3xl p-8 md:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                Educación
              </h2>
              <button
                type="button"
                onClick={addEducation}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-xl font-bold hover:shadow-2xl hover:shadow-amber-500/50 transition-all hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Agregar
              </button>
            </div>

            <div className="space-y-6">
              {cv.education.map((edu, index) => (
                <div key={index} className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="font-bold text-xl text-amber-400">Educación {index + 1}</h3>
                    <button
                      type="button"
                      onClick={() => removeEducation(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Eliminar
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Título</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, "degree", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Institución</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, "institution", e.target.value)}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Inicio</label>
                      <input
                        type="text"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                        placeholder="2020"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Fin</label>
                      <input
                        type="text"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                        placeholder="2024"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-amber-500 outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-400 mb-2">Descripción</label>
                      <textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(index, "description", e.target.value)}
                        rows="2"
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Botón guardar */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-10 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
            >
              {saving ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Guardando...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                  </svg>
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}