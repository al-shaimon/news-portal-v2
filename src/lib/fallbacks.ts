import { Advertisement, Article, Category, DashboardOverview } from '@/lib/types';

export const sampleCategories: Category[] = [
  { id: 'world', name: 'World', slug: 'world', description: 'Global headlines', showInMenu: true },
  { id: 'business', name: 'Business', slug: 'business', description: 'Markets & money', showInMenu: true },
  { id: 'tech', name: 'Technology', slug: 'technology', description: 'Innovation & AI', showInMenu: true },
  { id: 'culture', name: 'Culture', slug: 'culture', description: 'Arts & life', showInMenu: true },
  { id: 'sport', name: 'Sport', slug: 'sport', description: 'Scores & stories', showInMenu: true },
];

export const sampleArticles: Article[] = [
  {
    id: 'a-1',
    title: 'Dawn Express: High-speed rail connects coast-to-coast in four hours',
    slug: 'dawn-express-coast-to-coast',
    summary: 'A new era of sustainable travel links major cities with whisper-quiet trains and material-efficient lines.',
    content:
      'Engineers describe the line as the cleanest infrastructure project of the decade, cutting flight demand by 40% in its first season.',
    coverImage:
      'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=1600&q=80',
    categoryId: 'world',
    readingTime: 4,
    tags: ['infrastructure', 'climate'],
    isFeatured: true,
  },
  {
    id: 'a-2',
    title: 'AI weather desk issues live micro-forecasts for coastal towns',
    slug: 'ai-weather-desk',
    summary: 'Localized predictions now update every 90 seconds, with community safety teams plugged into the network.',
    coverImage:
      'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1600&q=80',
    categoryId: 'technology',
    readingTime: 3,
    isTrending: true,
  },
  {
    id: 'a-3',
    title: 'Circular fashion startups turn textile waste into premium fibers',
    slug: 'circular-fashion-startups',
    summary: 'Studios in Dhaka and Nairobi lead a renaissance in recycled textiles with zero-dye dyeing processes.',
    coverImage:
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1600&q=80',
    categoryId: 'business',
    readingTime: 5,
    isTrending: true,
  },
  {
    id: 'a-4',
    title: 'Night markets reinvent the post-commute meal with chef-led stalls',
    slug: 'night-markets-reinvent-dinner',
    summary: 'Pop-up alleys bring regional recipes to downtown corridors while keeping queues digital-first.',
    coverImage:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    categoryId: 'culture',
    readingTime: 2,
    isBreaking: true,
  },
  {
    id: 'a-5',
    title: 'Renewable surge: rooftop wind tiles join solar on skyline',
    slug: 'renewable-surge-rooftop-wind',
    summary: 'Lightweight rotors add 18% more clean power to existing buildings without structural retrofits.',
    coverImage:
      'https://images.unsplash.com/photo-1542601098-8fc114e148e8?auto=format&fit=crop&w=1600&q=80',
    categoryId: 'business',
    readingTime: 4,
    isFeatured: false,
  },
];

export const sampleAds: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'The Contemporary Studio',
    type: 'image',
    position: 'banner',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    targetUrl: 'https://thecontemporary.news',
    priority: 10,
  },
  {
    id: 'ad-2',
    title: 'Data & Climate Summit',
    type: 'image',
    position: 'sidebar',
    imageUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://thecontemporary.news',
    priority: 8,
  },
];

export const sampleDashboard: DashboardOverview = {
  articles: { published: 182, draft: 24, scheduled: 12 },
  users: { total: 26, admins: 4, journalists: 12 },
  ads: { active: 8, paused: 3 },
  media: { library: 420 },
};
