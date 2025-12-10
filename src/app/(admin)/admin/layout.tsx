'use client';

import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  useProtectedRoute('/auth/login');
  return children;
}
