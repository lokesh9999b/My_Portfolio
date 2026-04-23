import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-dark-1/95 backdrop-blur-md border-b border-dark-4' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="text-xl font-black tracking-tight"
        >
          <span className="text-white">Lokesh</span>
          <span className="text-amber-glow">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-text-secondary hover:text-amber-glow transition-colors duration-200 tracking-wide"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="px-5 py-2 text-sm font-bold bg-amber-glow text-black rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 active:scale-95"
          >
            Hire Me
          </button>
        </div>

        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-dark-1/98 backdrop-blur-md border-t border-dark-4 px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="text-left text-base font-medium text-text-secondary hover:text-amber-glow transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNav('#contact')}
            className="w-full py-3 text-sm font-bold bg-amber-glow text-black rounded-full hover:bg-amber-light transition-all"
          >
            Hire Me
          </button>
        </div>
      )}
    </nav>
  );
}
