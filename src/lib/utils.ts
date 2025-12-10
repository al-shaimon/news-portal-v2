export function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(value?: string | number | Date) {
  if (!value) return '';
  const date = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function readingTimeFromWords(words?: number) {
  if (!words) return '';
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export const heroGradientClass =
  'bg-[radial-gradient(circle_at_12%_20%,rgba(177,14,30,0.08),transparent_28%),radial-gradient(circle_at_88%_12%,rgba(13,59,102,0.12),transparent_26%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(255,92,108,0.12),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(126,211,255,0.16),transparent_32%)]';
