'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/auth-context';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

export default function ProfilePage() {
  const status = useProtectedRoute();
  const { user, updateProfile, changePassword } = useAuth();
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [passwords, setPasswords] = useState({ current: '', next: '' });
  const [message, setMessage] = useState<string | null>(null);

  if (status === 'loading' || status === 'idle') {
    return <p className="text-[var(--color-muted)]">Loading profile...</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="space-y-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-md">
        <h1 className="headline text-2xl font-extrabold">Profile</h1>
        <Input
          label="Name"
          value={profile.name}
          onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
        />
        <Input
          label="Email"
          value={profile.email}
          onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
        />
        <Button
          onClick={async () => {
            await updateProfile(profile);
            setMessage('Profile updated');
          }}
        >
          Save profile
        </Button>
      </div>

      <div className="space-y-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-elevated)] p-6 shadow-md">
        <h2 className="headline text-xl font-bold">Change password</h2>
        <Input
          label="Current password"
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
        />
        <Input
          label="New password"
          type="password"
          value={passwords.next}
          onChange={(e) => setPasswords((prev) => ({ ...prev, next: e.target.value }))}
        />
        <Button
          variant="outline"
          onClick={async () => {
            await changePassword(passwords.current, passwords.next);
            setMessage('Password updated');
            setPasswords({ current: '', next: '' });
          }}
        >
          Update password
        </Button>
      </div>

      {message && <p className="text-sm text-[var(--color-accent)]">{message}</p>}
    </div>
  );
}
