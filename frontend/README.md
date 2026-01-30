# 🚀 Portafolio Full-Stack Profesional

Portafolio personal profesional que demuestra competencias en desarrollo full-stack, incluyendo frontend moderno, backend robusto, persistencia de datos, seguridad y despliegue en la nube.

## 📋 Descripción

Este proyecto es un portafolio completo que incluye:
- **Hoja de vida profesional**: Experiencia laboral, educación, habilidades técnicas y contacto
- **Blog técnico**: Sistema de gestión de contenidos (CMS) para publicar artículos técnicos
- **Panel de administración**: Interfaz protegida para gestionar CV y posts del blog
- **Diseño responsive**: Optimizado para dispositivos móviles, tablets y desktop

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Biblioteca para interfaces de usuario
- **Vite** - Build tool de próxima generación
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router v7** - Navegación y rutas
- **Axios** - Cliente HTTP para consumir la API
- **React Quill** - Editor de texto enriquecido
- **DOMPurify** - Sanitización XSS

### Backend
- **Express.js 5** - Framework web de Node.js
- **MongoDB + Mongoose** - Base de datos NoSQL
- **JWT (jsonwebtoken)** - Autenticación basada en tokens
- **bcrypt** - Hash de contraseñas
- **express-validator** - Validación de entrada
- **Helmet** - Seguridad HTTP headers
- **CORS** - Control de acceso entre orígenes
- **express-rate-limit** - Limitación de tasa de peticiones
- **DOMPurify (isomorphic)** - Sanitización de contenido HTML

### DevOps
- **Git & GitHub** - Control de versiones
- **Vercel/Netlify** - Despliegue frontend
- **Render/Railway** - Despliegue backend
- **MongoDB Atlas** - Base de datos en la nube

## 💡 ¿Por qué MongoDB?

### Justificación Técnica

Elegí **MongoDB** sobre PostgreSQL por las siguientes razones específicas para este proyecto:

#### Ventajas para un Portafolio con Blog:

1. **Flexibilidad de esquemas**: Los posts del blog pueden tener campos variables (imágenes, código, videos) sin necesidad de migraciones complejas.

2. **JSON nativo**: Perfecta integración con Node.js/Express, ya que los documentos se almacenan como BSON (JSON binario).

3. **Escalabilidad horizontal**: Aunque no es crítico para un portafolio, MongoDB permite escalar fácilmente si el blog crece.

4. **Desarrollo ágil**: Permite iterar rápidamente sin preocuparse por esquemas rígidos.

5. **MongoDB Atlas gratuito**: Tier gratuito generoso (512 MB) ideal para proyectos personales.

### Comparación MongoDB vs PostgreSQL

| Característica | MongoDB | PostgreSQL |
|---------------|---------|------------|
| **Tipo** | NoSQL (Documentos) | SQL (Relacional) |
| **Esquema** | Flexible y dinámico | Rígido, requiere migraciones |
| **Estructura de datos** | JSON/BSON | Tablas con filas y columnas |
| **Relaciones** | Referencias o embebido | Joins potentes y eficientes |
| **Escalabilidad** | Horizontal (sharding) | Vertical principalmente |
| **Queries complejos** | Agregaciones potentes | SQL con joins complejos |
| **Transacciones ACID** | Soportadas (desde v4.0) | Nativas y robustas |
| **Curva de aprendizaje** | Menor para JS developers | Mayor (requiere SQL) |
| **Casos de uso ideales** | Blogs, CMS, datos no estructurados | Sistemas financieros, datos relacionales |

### Conclusión

Para un **portafolio personal con blog**, MongoDB es ideal porque:
- No necesitamos relaciones complejas entre tablas
- Los posts tienen estructura variable (título, contenido, imágenes, código)
- La integración con Node.js es natural y directa
- El desarrollo es más rápido y flexible

Si el proyecto requiriera **informes complejos, transacciones financieras o muchas relaciones entre entidades**, PostgreSQL sería la mejor opción.

## 📦 Instalación y Configuración Local

### Prerrequisitos

- Node.js 18+ y npm
- MongoDB instalado localmente o cuenta en MongoDB Atlas
- Git

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/portfolio-fullstack.git
cd portfolio-fullstack
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend/`:

```env
# Base de datos
MONGO_URI=mongodb://localhost:27017/portfolio
# O usar MongoDB Atlas:
# MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=tu_secreto_super_seguro_cambialo_en_produccion

# Server
PORT=5000
NODE_ENV=development

# Frontend URL (para CORS)
FRONTEND_URL=http://localhost:5173
```

**Crear usuario administrador:**

```bash
npm run create-admin
# Sigue las instrucciones en consola
```

**Iniciar servidor backend:**

```bash
npm run dev
```

El servidor estará corriendo en `http://localhost:5000`

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

Crear archivo `.env` en la carpeta `frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

**Iniciar servidor de desarrollo:**

```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### 4. Probar la aplicación

1. Abre `http://localhost:5173`
2. Navega a `/login`
3. Inicia sesión con las credenciales del admin
4. Accede a `/dashboard` para gestionar tu portafolio
5. Crea tu CV en `/dashboard/edit-cv`
6. Gestiona posts en `/admin`

## 🗂️ Estructura del Proyecto

```
portfolio-fullstack/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── post.controller.js
│   │   │   └── cv.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── error.middleware.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Post.js
│   │   │   └── CV.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── post.routes.js
│   │   │   └── cv.routes.js
│   │   ├── validators/
│   │   │   ├── auth.validator.js
│   │   │   └── post.validator.js
│   │   └── server.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EditorRichText.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Post.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditCV.jsx
│   │   │   ├── Admin.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
├── API.md
└── README.md
```

## 🔐 Variables de Entorno

### Backend (.env)

```env
# MongoDB
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/portfolio

# JWT Secret (Genera uno seguro: openssl rand -base64 32)
JWT_SECRET=tu_secreto_jwt_super_seguro

# Puerto del servidor
PORT=5000

# Entorno
NODE_ENV=production

# URL del frontend (para CORS)
FRONTEND_URL=https://tu-portafolio.vercel.app
```

### Frontend (.env)

```env
# URL de la API en producción
VITE_API_URL=https://tu-api.render.com/api
```

## 🌐 Despliegue

### Frontend (Vercel)

**Enlace:** [https://tu-portafolio.vercel.app](https://tu-portafolio.vercel.app)

**Pasos:**
1. Crear cuenta en [Vercel](https://vercel.com)
2. Conectar repositorio de GitHub
3. Configurar:
   - Framework: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Agregar variable de entorno: `VITE_API_URL`
5. Deploy

### Backend (Render)

**Enlace:** [https://tu-api.render.com](https://tu-api.render.com)

**Pasos:**
1. Crear cuenta en [Render](https://render.com)
2. New → Web Service
3. Conectar repositorio
4. Configurar:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `node src/server.js`
5. Agregar variables de entorno (MONGO_URI, JWT_SECRET, etc.)
6. Deploy

### Base de Datos (MongoDB Atlas)

**Pasos:**
1. Crear cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear cluster gratuito (M0)
3. Configurar acceso:
   - Database Access: Crear usuario
   - Network Access: Permitir acceso desde cualquier IP (0.0.0.0/0)
4. Obtener connection string
5. Agregar a variables de entorno del backend

## 📚 Documentación de la API

Ver [API.md](./API.md) para documentación completa de endpoints.

### Endpoints Principales

**Autenticación:**
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrar usuario (solo admin)

**Posts:**
- `GET /api/posts` - Listar todos los posts
- `GET /api/posts/:slug` - Obtener post por slug
- `POST /api/posts` - Crear post (protegido)
- `PUT /api/posts/:id` - Actualizar post (protegido)
- `DELETE /api/posts/:id` - Eliminar post (protegido)

**CV:**
- `GET /api/cv` - Obtener CV
- `POST /api/cv` - Crear CV (protegido)
- `PUT /api/cv` - Actualizar CV (protegido)

## 🔒 Seguridad Implementada

### Backend
✅ **Helmet** - Headers de seguridad HTTP  
✅ **CORS** - Configurado solo para dominio del frontend  
✅ **Rate Limiting** - Máximo 100 peticiones por 15 minutos  
✅ **Bcrypt** - Hash de contraseñas con salt  
✅ **JWT** - Autenticación basada en tokens  
✅ **express-validator** - Validación de entrada  
✅ **DOMPurify** - Sanitización de HTML  
✅ **Variables de entorno** - Secretos no expuestos  

### Frontend
✅ **DOMPurify** - Prevención XSS en contenido HTML  
✅ **Protected Routes** - Rutas protegidas con autenticación  
✅ **Token en localStorage** - Gestión segura de sesión  

## 🧪 Testing

```bash
# Backend
cd backend
npm test

# Frontend
cd frontend
npm test
```

## 📈 Características Implementadas

- ✅ Sistema de autenticación JWT
- ✅ CRUD completo de posts
- ✅ Editor de texto rico (React Quill)
- ✅ Gestión completa de CV
- ✅ Diseño responsive
- ✅ Protección contra XSS
- ✅ Rate limiting
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Loading states
- ✅ Mensajes de éxito/error
- ✅ Slugs automáticos para posts
- ✅ Fechas formateadas

## 🎨 Capturas de Pantalla

### Home - Portafolio
![Home](./screenshots/home.png)

### Blog
![Blog](./screenshots/blog.png)

### Panel de Administración
![Admin](./screenshots/admin.png)

## 🤝 Contribuciones

Este es un proyecto personal, pero sugerencias y feedback son bienvenidos.

## 📝 Licencia

MIT License - Puedes usar este código libremente.

## 👨‍💻 Autor

**Tu Nombre**
- Email: tu@email.com
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- LinkedIn: [Tu Nombre](https://linkedin.com/in/tu-usuario)
- Portfolio: [https://tu-portafolio.vercel.app](https://tu-portafolio.vercel.app)

## 🙏 Agradecimientos

- Anthropic por Claude
- React y Vite teams
- MongoDB y Express communities
- Tailwind CSS

---

**Desarrollado con ❤️ usando React, Node.js y MongoDB**