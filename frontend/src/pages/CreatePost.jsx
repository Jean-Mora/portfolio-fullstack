import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Save, X, Plus, Tag } from 'lucide-react';

const postSchema = z.object({
  title: z.string().min(5, 'El título debe tener al menos 5 caracteres').max(120),
  slug: z
    .string()
    .min(5, 'El slug debe tener al menos 5 caracteres')
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Solo letras minúsculas, números y guiones'),
  excerpt: z.string().min(30, 'El extracto debe tener al menos 30 caracteres').max(300),
  content: z.string().min(200, 'El contenido debe tener al menos 200 caracteres'),
  tags: z.array(z.string()).min(1, 'Agrega al menos una etiqueta').max(8, 'Máximo 8 etiquetas'),
  status: z.enum(['draft', 'published']),
  featuredImage: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
});

export default function CreatePost() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      tags: [],
      status: 'draft',
      featuredImage: '',
    },
  });

  const tags = watch('tags') || [];

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed)) {
      setValue('tags', [...tags, trimmed]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setValue('tags', tags.filter((t) => t !== tagToRemove));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const toastId = toast.loading('Creando post...');

    try {
      await axios.post('/api/posts', data);
      toast.success('¡Post creado exitosamente!', { id: toastId });
      reset();
      navigate('/dashboard');
    } catch (error) {
      const message =
        error.response?.data?.message || 'Error al crear el post. Intenta nuevamente.';
      toast.error(message, { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
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

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold">
              <span className="text-gradient">Crear Nuevo Post</span>
            </h1>
            <p className="mt-3 text-slate-400 text-lg">Comparte tu conocimiento con el mundo</p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 px-5 py-3 text-slate-300 hover:text-white glass-effect rounded-xl transition-all hover:bg-slate-800/60"
          >
            <X size={20} /> <span className="hidden sm:inline">Cancelar</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Grid 2 columnas para algunos campos */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Título */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Título <span className="text-red-400">*</span>
              </label>
              <input
                {...register('title')}
                type="text"
                className="w-full px-5 py-4 glass-effect rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg font-semibold"
                placeholder="Ej: Cómo optimizar React en 2026"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Slug (URL) <span className="text-red-400">*</span>
              </label>
              <input
                {...register('slug')}
                type="text"
                className="w-full px-5 py-4 glass-effect rounded-xl text-emerald-400 placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono"
                placeholder="como-optimizar-react-2026"
              />
              {errors.slug && (
                <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Estado */}
            <div>
              <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
                Estado
              </label>
              <select
                {...register('status')}
                className="w-full px-5 py-4 glass-effect rounded-xl text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
              >
                <option value="draft" className="bg-slate-900">📝 Borrador</option>
                <option value="published" className="bg-slate-900">✨ Publicado</option>
              </select>
            </div>
          </div>

          {/* Extracto */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
              Extracto / Meta descripción <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('excerpt')}
              rows={3}
              className="w-full px-5 py-4 glass-effect rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all resize-none"
              placeholder="Breve resumen que aparecerá en previews y SEO (30-300 caracteres)"
            />
            {errors.excerpt && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.excerpt.message}
              </p>
            )}
          </div>

          {/* Contenido */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
              Contenido <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('content')}
              rows={16}
              className="w-full px-5 py-4 glass-effect rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm resize-none"
              placeholder="Escribe aquí el post completo... (Markdown soportado en backend)"
            />
            {errors.content && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Imagen destacada */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide">
              URL de imagen destacada (opcional)
            </label>
            <input
              {...register('featuredImage')}
              type="url"
              className="w-full px-5 py-4 glass-effect rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all font-mono text-sm"
              placeholder="https://images.unsplash.com/photo-..."
            />
            {errors.featuredImage && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.featuredImage.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-bold text-slate-300 mb-2 uppercase tracking-wide flex items-center gap-2">
              <Tag size={16} />
              Etiquetas
            </label>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-sm font-semibold"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-emerald-400 hover:text-red-400 focus:outline-none transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Nueva etiqueta (Enter para agregar)"
                className="flex-1 px-5 py-4 glass-effect rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-6 py-4 bg-slate-800/60 hover:bg-slate-700/60 rounded-xl transition-all font-semibold text-white flex items-center gap-2"
              >
                <Plus size={18} /> Agregar
              </button>
            </div>

            {errors.tags && (
              <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.tags.message || 'Debes agregar al menos una etiqueta'}
              </p>
            )}
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} /> Guardando...
                </>
              ) : (
                <>
                  <Save size={20} /> Publicar Post
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 sm:flex-none px-8 py-4 glass-effect text-slate-300 font-bold rounded-xl hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-slate-600 transition-all"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}