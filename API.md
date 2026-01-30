# Portafolio Full-Stack

## 🚀 Descripción
[Descripción del proyecto]

## 🛠️ Tecnologías

### Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Helmet, CORS, Rate Limiting

### ¿Por qué MongoDB?
**Justificación técnica:**
- Flexibilidad de esquemas para el blog (posts con diferentes campos)
- Fácil escalabilidad horizontal
- JSON nativo (ideal para APIs REST)
- MongoDB Atlas gratis

**Comparación con PostgreSQL:**
| Característica | MongoDB | PostgreSQL |
|---------------|---------|-----------|
| Tipo | NoSQL | SQL |
| Esquema | Flexible | Rígido |
| Joins | Limitados | Potentes |
| Escalabilidad | Horizontal | Vertical |

Para un portafolio con blog, MongoDB es ideal porque los posts pueden tener campos variables y no necesitamos relaciones complejas.

## 📦 Instalación Local

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env con tus credenciales
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Variables de Entorno

Backend (.env):
```
MONGO_URI=mongodb://...
JWT_SECRET=tu_secreto
PORT=5000
FRONTEND_URL=http://localhost:5173
```

## 🔗 Despliegue

- **Frontend**: [URL de Vercel/Netlify]
- **Backend**: [URL de Render/Railway]
- **Base de datos**: MongoDB Atlas

## 📚 Documentación API

Ver [API.md](./API.md)