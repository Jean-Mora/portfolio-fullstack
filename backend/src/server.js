import dotenv from 'dotenv';
dotenv.config(); // Render ya maneja las variables, no necesitas el path './.env'

import express from 'express';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit';

// Rutas
import authRoutes from './routes/auth.routes.js';
import postRoutes from './routes/post.routes.js';
import cvRoutes from './routes/cv.routes.js';

// Middleware de errores
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

// --- DB CONNECTION ---
const mongoUri = process.env.MONGO_URI; 
if (!mongoUri) {
  console.error('❌ ERROR: MONGO_URI no definida en las variables de entorno');
  process.exit(1);
}

mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB Conectado'))
  .catch(err => {
    console.error('❌ Error DB:', err);
    process.exit(1);
  });

// --- MIDDLEWARES ---
app.use(helmet());

// Configuración de CORS flexible para que funcione con Vercel
app.use(cors({
  origin: '*', // Permite peticiones de cualquier lugar (ideal para pruebas ahora)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// --- RATE LIMIT ---
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Demasiadas peticiones. Intenta más tarde.',
});
app.use('/api/', limiter);

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/cv', cvRoutes);

// --- ERRORES ---
app.use(errorHandler);

// --- SERVER ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
);