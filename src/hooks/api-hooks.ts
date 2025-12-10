'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import { sampleAds, sampleArticles, sampleCategories, sampleDashboard } from '@/lib/fallbacks';
import { Advertisement, ApiResponse, Article, Category, DashboardOverview, Media, User } from '@/lib/types';

const buildQuery = (params?: Record<string, string | number | boolean | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params || {}).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    search.append(key, String(value));
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
};

const fetcher = async <T,>(path: string) => {
  const res = await apiClient.get<ApiResponse<T>>(path);
  return res.data;
};

export const useMenuCategories = () =>
  useQuery({
    queryKey: ['categories', 'menu'],
    queryFn: () => fetcher<Category[]>(`/categories${buildQuery({ menu: true })}`),
    placeholderData: sampleCategories,
  });

export const useCategoryTree = () =>
  useQuery({
    queryKey: ['categories', 'tree'],
    queryFn: () => fetcher<Category[]>(`/categories${buildQuery({ active: true })}`),
    placeholderData: sampleCategories,
  });

export const useFeaturedArticles = () =>
  useQuery({
    queryKey: ['articles', 'featured'],
    queryFn: () => fetcher<Article[]>('/articles/featured'),
    placeholderData: sampleArticles,
  });

export const useBreakingTicker = () =>
  useQuery({
    queryKey: ['articles', 'breaking'],
    queryFn: () => fetcher<Article[]>('/articles/breaking'),
    placeholderData: sampleArticles.slice(0, 3),
  });

export const useTrendingArticles = () =>
  useQuery({
    queryKey: ['articles', 'trending'],
    queryFn: () => fetcher<Article[]>('/articles/trending'),
    placeholderData: sampleArticles,
  });

export const useLatestArticles = () =>
  useQuery({
    queryKey: ['articles', 'latest'],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery({ sort: 'publishedAt', order: 'desc', limit: 12 })}`),
    placeholderData: sampleArticles,
  });

export const useArticles = (params?: Record<string, string | number | boolean | undefined>) =>
  useQuery({
    queryKey: ['articles', params],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery(params)}`),
    placeholderData: sampleArticles,
  });

export const useArticle = (identifier: string) =>
  useQuery({
    enabled: !!identifier,
    queryKey: ['article', identifier],
    queryFn: () => fetcher<Article>(`/articles/${identifier}`),
    placeholderData: sampleArticles[0],
  });

export const useRelatedArticles = (categoryId?: string) =>
  useQuery({
    enabled: !!categoryId,
    queryKey: ['articles', 'related', categoryId],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery({ category: categoryId, limit: 6 })}`),
    placeholderData: sampleArticles,
  });

export const useCategory = (identifier: string) =>
  useQuery({
    enabled: !!identifier,
    queryKey: ['category', identifier],
    queryFn: () => fetcher<Category>(`/categories/${identifier}`),
    placeholderData: sampleCategories[0],
  });

export const useCategoryArticles = (identifier: string, params?: Record<string, string | number | boolean | undefined>) =>
  useQuery({
    enabled: !!identifier,
    queryKey: ['category', identifier, 'articles', params],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery({ category: identifier, ...params })}`),
    placeholderData: sampleArticles,
  });

export const useSearchArticles = (term: string, filters?: Record<string, string | number | boolean | undefined>) =>
  useQuery({
    enabled: term.length > 0,
    queryKey: ['articles', 'search', term, filters],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery({ search: term, ...filters })}`),
    placeholderData: sampleArticles,
  });

export const useAds = (position?: string, page?: string) =>
  useQuery({
    queryKey: ['ads', 'active', position, page],
    queryFn: () => fetcher<Advertisement[]>(`/advertisements/active${buildQuery({ position, page, type: 'image' })}`),
    placeholderData: sampleAds,
  });

export const useDashboardOverview = () =>
  useQuery({
    queryKey: ['dashboard', 'overview'],
    queryFn: () => fetcher<DashboardOverview>('/dashboard/stats'),
    placeholderData: sampleDashboard,
  });

export const useAdminArticles = (params?: Record<string, string | number | boolean | undefined>) =>
  useQuery({
    queryKey: ['admin', 'articles', params],
    queryFn: () => fetcher<Article[]>(`/articles${buildQuery(params)}`),
    placeholderData: sampleArticles,
  });

export const useAdminCategories = () =>
  useQuery({
    queryKey: ['admin', 'categories'],
    queryFn: () => fetcher<Category[]>('/categories'),
    placeholderData: sampleCategories,
  });

export const useAdminAds = () =>
  useQuery({
    queryKey: ['admin', 'ads'],
    queryFn: () => fetcher<Advertisement[]>('/advertisements'),
    placeholderData: sampleAds,
  });

export const useUsers = () =>
  useQuery({
    queryKey: ['admin', 'users'],
    queryFn: () => fetcher<User[]>('/users'),
    placeholderData: [],
  });

export const useMediaLibrary = (params?: Record<string, string | number | boolean | undefined>) =>
  useQuery({
    queryKey: ['admin', 'media', params],
    queryFn: () => fetcher<Media[]>(`/media${buildQuery(params)}`),
    placeholderData: [],
  });

export const useSaveArticle = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Article> & { id?: string }) =>
      payload.id
        ? apiClient.put<ApiResponse<Article>>(`/articles/${payload.id}`, payload)
        : apiClient.post<ApiResponse<Article>>('/articles', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'articles'] });
    },
  });
};

export const useSaveCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Category> & { id?: string }) =>
      payload.id
        ? apiClient.put<ApiResponse<Category>>(`/categories/${payload.id}`, payload)
        : apiClient.post<ApiResponse<Category>>('/categories', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'categories'] });
    },
  });
};

export const useSaveAd = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<Advertisement> & { id?: string }) =>
      payload.id
        ? apiClient.put<ApiResponse<Advertisement>>(`/advertisements/${payload.id}`, payload)
        : apiClient.post<ApiResponse<Advertisement>>('/advertisements', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ads'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'ads'] });
    },
  });
};

export const useSaveUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Partial<User> & { id?: string }) =>
      payload.id
        ? apiClient.put<ApiResponse<User>>(`/users/${payload.id}`, payload)
        : apiClient.post<ApiResponse<User>>('/users', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
  });
};

export const useUploadMedia = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { file: File; alt?: string; tags?: string[]; folder?: string }) => {
      const formData = new FormData();
      formData.append('file', payload.file);
      if (payload.alt) formData.append('alt', payload.alt);
      if (payload.folder) formData.append('folder', payload.folder);
      if (payload.tags?.length) formData.append('tags', payload.tags.join(','));
      return apiClient.post<ApiResponse<Media>>('/media/upload', formData, { formData: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'media'] });
    },
  });
};
