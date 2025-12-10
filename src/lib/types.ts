export type Role = 'super_admin' | 'admin' | 'journalist' | 'reader';

export type Pagination = {
  page: number;
  limit: number;
  total: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  pagination?: Pagination;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string | null;
  isActive?: boolean;
  showInMenu?: boolean;
  order?: number;
  children?: Category[];
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  summary?: string;
  content?: string;
  contentBn?: string;
  coverImage?: string;
  categoryId?: string;
  category?: Category;
  author?: User;
  status?: 'draft' | 'published' | 'scheduled';
  isFeatured?: boolean;
  isBreaking?: boolean;
  isTrending?: boolean;
  publishedAt?: string;
  readingTime?: number;
  tags?: string[];
};

export type AdPlacement = 'hero' | 'banner' | 'sidebar' | 'in_content' | 'popup';

export type Advertisement = {
  id: string;
  name: string;
  type: 'image' | 'video' | 'html';
  position: AdPlacement;
  imageUrl?: string;
  targetUrl?: string;
  activeFrom?: string;
  activeTo?: string;
  priority?: number;
  impressions?: number;
  clicks?: number;
};

export type Media = {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
  folder?: string;
  type?: string;
  tags?: string[];
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive?: boolean;
};

export type DashboardOverview = {
  articles?: Record<string, number>;
  users?: Record<string, number>;
  ads?: Record<string, number>;
  media?: Record<string, number>;
};
