import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

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

// --- ENV ---
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('❌ ERROR: MONGO_URI no definida');
  process.exit(1);
}

// --- DB ---
mongoose
  .connect(mongoUri)
  .then(() => console.log('✅ MongoDB Conectado'))
  .catch(err => {
    console.error('❌ Error DB:', err);
    process.exit(1);
  });

// --- MIDDLEWARES ---
app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

app.use(
  '/api/',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Demasiadas peticiones. Intenta más tarde.',
  })
);

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
