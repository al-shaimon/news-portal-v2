import Link from 'next/link';

const footerNav = [
  { label: 'About', href: '/about' },
  { label: 'Editorial standards', href: '/standards' },
  { label: 'Advertise', href: '/advertise' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
];

export function Footer() {
  return (
    <footer className="mt-12 border-t border-[var(--color-border)] bg-[#1d0c0c] text-sm text-[#f6f0f0]">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="headline text-xl font-black text-white">The Contemporary News</p>
          <p className="leading-relaxed text-[#e8dede]">
            Keep an eye on our News to get all the news including politics, business, sports, national-international
            breaking news, analytical and other news.
          </p>
          <p className="text-xs text-[#d5caca]">© {new Date().getFullYear()} The Contemporary | Powered by Sahariyaar</p>
        </div>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Navigate</h4>
            <div className="flex flex-col gap-1">
              {footerNav.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-[#f6cfd4]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Studios</h4>
            <p className="text-[#e8dede]">Dhaka · Singapore · Remote</p>
            <p className="text-[#e8dede]">newsdesk@thecontemporary.news</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Apps</h4>
            <p className="text-[#e8dede]">iOS · Android</p>
            <p className="text-[#e8dede]">Coming soon</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
