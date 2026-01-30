import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

dotenv.config({ path: './.env' });

const updateAdminPassword = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const email = 'admin@portafolio.com';
  const password = 'admin2026!';

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.updateOne({ email }, { $set: { password: hashedPassword, role: 'ADMIN' } });

  console.log(`✅ Contraseña del admin actualizada correctamente`);
  process.exit(0);
};

updateAdminPassword();
