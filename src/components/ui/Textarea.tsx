'use client';

import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; helper?: string };

export function Textarea({ label, helper, className, ...props }: Props) {
  return (
    <label className="flex flex-col gap-2 text-sm text-[var(--color-muted)]">
      {label && <span className="font-semibold text-[var(--color-ink)]">{label}</span>}
      <textarea
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] px-3 py-2 text-[var(--color-ink)] focus:border-[var(--color-accent)] focus:outline-none',
          className,
        )}
        rows={4}
        {...props}
      />
      {helper && <span className="text-xs text-[var(--color-muted)]">{helper}</span>}
    </label>
  );
}
