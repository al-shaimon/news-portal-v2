'use client';

import { useThemeMode } from '@/contexts/theme-context';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const { theme, toggle } = useThemeMode();

  return (
    <Button
      variant="ghost"
      className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-semibold"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
    >
      {theme === 'light' ? 'Dark mode' : 'Light mode'}
    </Button>
  );
}
