import { SiteShell } from '@/components/layout/SiteShell';
import PublicPage from './(public)/page';

export default function RootPage(): JSX.Element {
  return (
    <SiteShell>
      <PublicPage />
    </SiteShell>
  );
}
