import React, { createContext, useState, useContext, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { apiClient } from '../utils/api-client';

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  // Token is now managed by httpOnly cookie, so we don't store it in client state
  // We keep the isAuthenticated logic based on user presence
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await apiClient.get<{ user: User }>('/auth/me');
        setUser(data.user);
      } catch (error) {
        // Not authenticated or session expired
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const data = await apiClient.post<{ user: User }>(
        '/auth/signin',
        { email, password }
      );

      setUser(data.user);
    } catch (error) {
      throw error;
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    try {
      const data = await apiClient.post<{ user: User }>(
        '/auth/signup',
        { email, password, name }
      );

      setUser(data.user);
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await apiClient.post('/auth/signout', {});
    } catch (error) {
      console.error('Sign out error', error);
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      token: null, // Token is HTTP-only
      loading,
      signIn,
      signUp,
      signOut,
      isAuthenticated: !!user,
    }),
    [user, loading, signIn, signUp, signOut]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
