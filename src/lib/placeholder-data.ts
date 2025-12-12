import { Article, Category } from './types';
import articlesJson from '../../article-seed-enhanced.json';

// Define placeholder categories
export const PLACEHOLDER_CATEGORIES: Category[] = [
  {
    id: '571545f2-a4fd-4c10-b4d6-cffa9ec0b871',
    name: { en: 'Politics', bn: 'রাজনীতি' },
    slug: 'politics',
    description: { en: 'Political news and analysis', bn: 'রাজনৈতিক সংবাদ এবং বিশ্লেষণ' },
    isActive: true,
    showInMenu: true,
    order: 1,
  },
  {
    id: 'tech-001',
    name: { en: 'Technology', bn: 'প্রযুক্তি' },
    slug: 'technology',
    description: {
      en: 'Latest tech news and innovations',
      bn: 'সর্বশেষ প্রযুক্তি সংবাদ এবং উদ্ভাবন',
    },
    isActive: true,
    showInMenu: true,
    order: 2,
  },
  {
    id: 'biz-001',
    name: { en: 'Business', bn: 'ব্যবসা' },
    slug: 'business',
    description: { en: 'Business and economy news', bn: 'ব্যবসা এবং অর্থনীতি সংবাদ' },
    isActive: true,
    showInMenu: true,
    order: 3,
  },
  {
    id: 'sports-001',
    name: { en: 'Sports', bn: 'ক্রীড়া' },
    slug: 'sports',
    description: { en: 'Sports news and updates', bn: 'ক্রীড়া সংবাদ এবং আপডেট' },
    isActive: true,
    showInMenu: true,
    order: 4,
  },
  {
    id: 'ent-001',
    name: { en: 'Entertainment', bn: 'বিনোদন' },
    slug: 'entertainment',
    description: { en: 'Entertainment and lifestyle', bn: 'বিনোদন এবং জীবনধারা' },
    isActive: true,
    showInMenu: true,
    order: 5,
  },
  {
    id: 'health-001',
    name: { en: 'Health', bn: 'স্বাস্থ্য' },
    slug: 'health',
    description: { en: 'Health and wellness news', bn: 'স্বাস্থ্য এবং সুস্থতা সংবাদ' },
    isActive: true,
    showInMenu: true,
    order: 6,
  },
  {
    id: 'edu-001',
    name: { en: 'Education', bn: 'শিক্ষা' },
    slug: 'education',
    description: { en: 'Education news and resources', bn: 'শিক্ষা সংবাদ এবং সম্পদ' },
    isActive: true,
    showInMenu: true,
    order: 7,
  },
  {
    id: 'env-001',
    name: { en: 'Environment', bn: 'পরিবেশ' },
    slug: 'environment',
    description: { en: 'Environmental news and climate', bn: 'পরিবেশগত সংবাদ এবং জলবায়ু' },
    isActive: true,
    showInMenu: true,
    order: 8,
  },
];

// Map category strings to category IDs
const categoryMap: Record<string, string> = {
  '571545f2-a4fd-4c10-b4d6-cffa9ec0b871': '571545f2-a4fd-4c10-b4d6-cffa9ec0b871',
  politics: '571545f2-a4fd-4c10-b4d6-cffa9ec0b871',
  technology: 'tech-001',
  business: 'biz-001',
  sports: 'sports-001',
  entertainment: 'ent-001',
  health: 'health-001',
  education: 'edu-001',
  environment: 'env-001',
};

// Transform article seed data to match Article type
export const PLACEHOLDER_ARTICLES: Article[] = (articlesJson as any[]).map((article, index) => {
  const categorySlug = typeof article.category === 'string' ? article.category : 'politics';
  const categoryId = categoryMap[categorySlug] || categoryMap['politics'];
  const category = PLACEHOLDER_CATEGORIES.find(
    (c) => c.id === categoryId || c.slug === categorySlug
  );

  return {
    id: `article-${index + 1}`,
    slug: `article-${index + 1}-${Date.now()}`,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    featuredImage: article.featuredImage || undefined,
    coverImage: article.featuredImage?.url,
    categoryId: category?.id,
    category: category,
    author: {
      id: 'author-1',
      name: 'Editorial Team',
      email: 'editor@thecontemporary.news',
      role: 'journalist',
      isActive: true,
    },
    status: article.status as 'published',
    isFeatured: article.isFeatured || false,
    isBreaking: article.isBreaking || false,
    isTrending: article.isTrending || false,
    publishedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    readingTime: 5,
    tags: article.tags || [],
  };
});

// Utility functions for filtering articles
export function getArticlesByCategory(categorySlug: string): Article[] {
  return PLACEHOLDER_ARTICLES.filter((article) => article.category?.slug === categorySlug);
}

export function getFeaturedArticles(limit: number = 4): Article[] {
  return PLACEHOLDER_ARTICLES.filter((article) => article.isFeatured).slice(0, limit);
}

export function getBreakingArticles(limit: number = 5): Article[] {
  return PLACEHOLDER_ARTICLES.filter((article) => article.isBreaking).slice(0, limit);
}

export function getTrendingArticles(limit: number = 6): Article[] {
  return PLACEHOLDER_ARTICLES.filter((article) => article.isTrending).slice(0, limit);
}

export function getLatestArticles(limit: number = 10): Article[] {
  return [...PLACEHOLDER_ARTICLES]
    .sort((a, b) => new Date(b.publishedAt!).getTime() - new Date(a.publishedAt!).getTime())
    .slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return PLACEHOLDER_ARTICLES.find((article) => article.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return PLACEHOLDER_CATEGORIES.find((category) => category.slug === slug);
}
