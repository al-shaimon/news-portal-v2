'use client';

import { useState } from 'react';
import { AdminShell } from '@/components/layout/AdminShell';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function SettingsPage() {
  const [settings, setSettings] = useState({ apiUrl: process.env.NEXT_PUBLIC_API_BASE || '', frontendUrl: '', rateLimit: 120 });

  return (
    <AdminShell title="Settings" description="Ops-level controls for rate limits and environment URLs.">
      <div className="grid gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-4">
        <Input
          label="API Base URL"
          value={settings.apiUrl}
          onChange={(e) => setSettings((s) => ({ ...s, apiUrl: e.target.value }))}
          helper="Read-only from env"
          readOnly
        />
        <Input
          label="Frontend URL"
          value={settings.frontendUrl}
          onChange={(e) => setSettings((s) => ({ ...s, frontendUrl: e.target.value }))}
          placeholder="https://news.thecontemporary.news"
        />
        <Input
          label="Rate limit (rpm)"
          type="number"
          value={settings.rateLimit}
          onChange={(e) => setSettings((s) => ({ ...s, rateLimit: Number(e.target.value) }))}
        />
        <Button className="w-fit">Save settings</Button>
        <p className="text-xs text-[var(--color-muted)]">API version: v1</p>
      </div>
    </AdminShell>
  );
}
