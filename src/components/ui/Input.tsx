'use client';

import { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string; helper?: string };

export function Input({ label, helper, className, ...props }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
      {label && <span className="font-semibold text-[var(--color-ink)]">{label}</span>}
      <input
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-[var(--color-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] focus:border-[var(--color-accent)] focus:outline-none',
          className,
        )}
        {...props}
      />
      {helper && <span className="text-xs text-[var(--color-muted)]">{helper}</span>}
    </label>
  );
}
