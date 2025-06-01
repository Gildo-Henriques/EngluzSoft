// src/context/AuthContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, telefone_contato: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao parsear dados do localStorage:', error);
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('https://engluzsoft-backend-1.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error('Erro na resposta do login:', text);
        throw new Error(`Erro ao fazer login (Status: ${response.status})`);
      }
      const data = await response.json();
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, telefone_contato: string, password: string): Promise<void> => {
    try {
      console.log('Enviando requisição de registro:', { name, email, telefone_contato, password });
      const response = await fetch('https://engluzsoft-backend-1.onrender.com/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, telefone_contato, password }),
      });

      const contentType = response.headers.get('Content-Type');
      console.log('Status:', response.status, 'Content-Type:', contentType);

      if (!response.ok) {
        const text = await response.text();
        console.error('Resposta de erro do backend:', text.slice(0, 200)); // Limita para evitar logs longos
        throw new Error(`Erro ao criar conta (Status: ${response.status}, Resposta: ${text.slice(0, 100)}...)`);
      }

      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Resposta não é JSON:', text.slice(0, 200));
        throw new Error(`Resposta do servidor não é JSON válido (Content-Type: ${contentType})`);
      }

      const data = await response.json();
      console.log('Resposta do backend:', data);

      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await fetch('https://engluzsoft-backend-1.onrender.com/api/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Erro no logout:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}