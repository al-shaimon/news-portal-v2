import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <Header />
      <main className="container py-6 md:py-10">{children}</main>
      <Footer />
    </div>
  );
}
