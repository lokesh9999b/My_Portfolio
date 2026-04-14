import { ExternalLink, BookOpen, ArrowUpRight } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'High Frequency Trading Engine',
    hook: 'Sub-millisecond order execution that never misses a tick.',
    description:
      'Built an HFT engine using Angular 19 and Node.js that streams live market data via WebSockets and Apache Kafka. Achieved sub-100ms order execution with real-time price graphs powered by Lightweight Charts — handling thousands of ticks per second without breaking a sweat.',
    tech: ['Angular 19', 'Node.js', 'Apache Kafka', 'WebSockets', 'Redis'],
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    accentHue: '#F5C518',
  },
  {
    title: 'AI-Powered Security App',
    hook: 'Zero-trust visitor intelligence powered by machine learning.',
    description:
      'Developed an enterprise security platform with AI-based face recognition and real-time threat detection. Integrates with CCTV feeds, provides automated alerts, and generates compliance reports — replacing manual guards with always-on intelligent surveillance.',
    tech: ['Angular', 'Node.js', 'Python (AI/ML)', 'MongoDB', 'Docker'],
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
    accentHue: '#F5C518',
  },
  {
    title: 'Real-Time Trading Dashboard',
    hook: 'Institution-grade order book and analytics — in the browser.',
    description:
      'Full-featured trading dashboard with live candlestick charts, order-book depth visualization, P&L tracking, and multi-symbol watchlists. Built with Angular Signals for zero-flicker reactive UI, integrating REST and WebSocket feeds seamlessly.',
    tech: ['Angular 18', 'TypeScript', 'RxJS', 'Lightweight Charts', 'Node.js'],
    image: 'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=800',
    accentHue: '#F5C518',
  },
  {
    title: 'Smart Employee Attendance App',
    hook: 'Effortless attendance tracking with QR codes and biometric sync.',
    description:
      'Cross-platform attendance solution using Angular with QR code scanning, GPS check-in validation, and biometric integration. Real-time reporting dashboard gives HR instant visibility into attendance patterns, leaves, and payroll-ready exports.',
    tech: ['Angular', 'Node.js', 'MongoDB', 'REST APIs', 'Docker'],
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
    accentHue: '#F5C518',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className="group bg-dark-2 border border-dark-4 rounded-2xl overflow-hidden hover:border-amber-glow/40 transition-all duration-500 hover:-translate-y-2"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transition: `opacity 0.7s ease ${(index % 2) * 100}ms, transform 0.7s ease ${(index % 2) * 100}ms, border-color 0.3s ease`,
      }}
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-2 via-dark-2/40 to-transparent" />
        <div className="absolute inset-0 bg-near-black/30 group-hover:bg-transparent transition-all duration-500" />
        <div className="absolute bottom-4 left-5">
          <span className="px-2.5 py-1 bg-amber-glow text-black text-xs font-bold rounded-full">
            {`0${index + 1}`}
          </span>
        </div>
      </div>

      <div className="p-7">
        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-amber-glow transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-amber-glow/80 text-sm font-semibold mb-3 leading-snug">
          {project.hook}
        </p>
        <p className="text-text-muted text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 bg-dark-3 border border-dark-4 text-text-secondary text-xs font-medium rounded-lg group-hover:border-amber-glow/20 transition-colors duration-200"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-amber-glow text-black text-xs font-bold rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 active:scale-95">
            <ExternalLink size={13} />
            Live Demo
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-dark-4 text-text-secondary text-xs font-medium rounded-full hover:border-amber-glow/40 hover:text-white transition-all duration-200">
            <BookOpen size={13} />
            View Case Study
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  // Typing effect for heading
  const headingFull = 'Selected Projects';
  const [typedHeading, setTypedHeading] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const typingStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || typingStarted.current) return;
    typingStarted.current = true;
    setShowCursor(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < headingFull.length) {
        setTypedHeading(headingFull.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1200);
      }
    }, 70);
    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="projects" className="bg-near-black py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <span className="text-amber-glow text-xs font-bold tracking-[0.3em] uppercase">Portfolio</span>
          <div className="flex items-end justify-between mt-3">
            <div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight whitespace-nowrap">
                {typedHeading}
                {showCursor && <span className="text-amber-glow animate-pulse">|</span>}
              </h2>
              <div className="h-1 w-12 bg-amber-glow mt-4 rounded-full" />
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="hidden sm:flex items-center gap-1.5 text-text-muted text-sm font-medium hover:text-amber-glow transition-colors duration-200 group"
            >
              Work together
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
