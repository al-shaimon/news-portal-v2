'use client';

import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline' | 'subtle';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const styles: Record<Variant, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-primary-contrast)] hover:opacity-90 shadow-sm shadow-[rgba(177,14,30,0.35)]',
  ghost:
    'bg-transparent text-[var(--color-ink)] hover:bg-[rgba(13,59,102,0.08)] hover:text-[var(--color-accent)] dark:hover:bg-[rgba(126,211,255,0.08)]',
  outline:
    'border border-[var(--color-border)] bg-[var(--color-surface-elevated)] text-[var(--color-ink)] hover:border-[var(--color-accent)]',
  subtle: 'bg-[var(--color-surface-elevated)] text-[var(--color-ink)] hover:bg-[rgba(0,0,0,0.03)]',
};

export function Button({ className, children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-60',
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
