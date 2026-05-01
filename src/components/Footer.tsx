import { Github, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-app border-t border-theme">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <span className="text-xl font-black">
              <span className="text-primary">Lokesh</span>
              <span className="text-accent">.</span>
            </span>
            <div className="h-4 w-px bg-theme hidden sm:block" />
            <p className="text-subtle text-sm">
              © 2026 Lokesh Bommagani. All rights reserved.
            </p>
            <div className="h-4 w-px bg-theme hidden sm:block" />
            <p className="text-subtle text-xs">
              Built with precision in React + Vite + Tailwind.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: Github, href: import.meta.env.VITE_GITHUB_URL, label: 'GitHub' },
              { Icon: Linkedin, href: import.meta.env.VITE_LINKEDIN_URL, label: 'LinkedIn' },
              { Icon: Twitter, href: '#', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-full border border-theme flex items-center justify-center text-subtle hover:border-accent/50 hover:text-accent transition-all duration-200"
              >
                <Icon size={14} />
              </a>
            ))}

            <button
              onClick={scrollTop}
              aria-label="Scroll to top"
              className="w-8 h-8 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent hover:bg-accent hover:text-accent-contrast transition-all duration-200 ml-1"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
