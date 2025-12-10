'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { ApiResponse, User } from '@/lib/types';

export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated';

type Credentials = { email: string; password: string; name?: string };

export type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  login: (payload: Credentials) => Promise<void>;
  register: (payload: Credentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (payload: Partial<User>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>('idle');
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setStatus('loading');
        const res = await apiClient.get<ApiResponse<User>>('/auth/me');
        setUser(res.data);
        setStatus('authenticated');
      } catch {
        setStatus('unauthenticated');
      }
    };
    loadProfile();
  }, []);

  const login = async (payload: Credentials) => {
    setStatus('loading');
    const res = await apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string; user: User }>>(
      '/auth/login',
      payload,
      { skipAuth: true },
    );
    apiClient.setTokens(res.data.accessToken, res.data.refreshToken);
    setUser(res.data.user);
    setStatus('authenticated');
  };

  const register = async (payload: Credentials) => {
    setStatus('loading');
    const res = await apiClient.post<ApiResponse<{ accessToken: string; refreshToken: string; user: User }>>(
      '/auth/register',
      payload,
      { skipAuth: true },
    );
    apiClient.setTokens(res.data.accessToken, res.data.refreshToken);
    setUser(res.data.user);
    setStatus('authenticated');
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // logout endpoint might fail if token expired; still clear locally.
    }
    apiClient.clearTokens();
    setUser(null);
    setStatus('unauthenticated');
    queryClient.clear();
  };

  const refreshProfile = async () => {
    try {
      const res = await apiClient.get<ApiResponse<User>>('/auth/me');
      setUser(res.data);
      setStatus('authenticated');
    } catch {
      setStatus('unauthenticated');
      apiClient.clearTokens();
    }
  };

  const updateProfile = async (payload: Partial<User>) => {
    const res = await apiClient.put<ApiResponse<User>>('/auth/profile', payload);
    setUser(res.data);
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    await apiClient.put<ApiResponse<unknown>>('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, status, login, register, logout, refreshProfile, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
