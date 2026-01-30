import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Ruta para obtener datos actuales del usuario (recomendado)
          const res = await api.get('/auth/me'); // o '/users/me' si tienes esa ruta
          setUser(res.data.user); // { id, username, role, ... }
        } catch (err) {
          console.error('Token inválido al cargar usuario:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await api.post('/auth/login', credentials);

      localStorage.setItem('token', data.token);

      // Guarda el usuario completo que devuelve el backend (incluye role)
      setUser(data.user); // ← ¡Aquí está el fix! data.user tiene role

      return data; // opcional, para manejar en Login.jsx
    } catch (err) {
      throw err; // para que Login.jsx lo capture
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);