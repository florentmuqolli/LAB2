import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await axios.get('/api/members/profile', { withCredentials: true });
      setIsAuthenticated(true);
      setRole(res.data.role);
    } catch (err) {
      setIsAuthenticated(false);
      setRole(null);
    }
  };

  useEffect(() => { checkAuth(); }, []);

  const login = async (email, password) => {
    const res = await axios.post('http://localhost:5000/api/members/login', { email, password }, { withCredentials: true });
    setIsAuthenticated(true);
    setRole(res.data.role);
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/members/logout', {}, { withCredentials: true });
    setIsAuthenticated(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};