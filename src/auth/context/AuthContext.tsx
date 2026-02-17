import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Definición de tipos
interface User {
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  mustChangePass: boolean;
  login: (token: string, user: User, mustChangePass: boolean) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Creamos el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  
  // Inicialización Lazy (Solo se ejecuta 1 vez al cargar)
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [mustChangePass, setMustChangePass] = useState<boolean>(() => {
    return localStorage.getItem('mustChangePass') === 'true';
  });

  const login = (newToken: string, newUser: User, changePass: boolean) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('mustChangePass', String(changePass));
    
    setToken(newToken);
    setUser(newUser);
    // CORRECCIÓN AQUÍ: Usamos el nombre correcto del setter
    setMustChangePass(changePass); 
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    // CORRECCIÓN AQUÍ: Usamos el nombre correcto del setter
    setMustChangePass(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      mustChangePass, 
      login, 
      logout, 
      isAuthenticated: !!token 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado
// Nota: Si la advertencia "Fast Refresh" persiste, es segura de ignorar en este archivo,
// ya que es estándar exportar el Hook junto con el Contexto.
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth debe usarse dentro de un AuthProvider');
  return context;
};

