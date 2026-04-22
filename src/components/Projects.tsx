import { ExternalLink, BookOpen, ArrowUpRight, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useRef, useState } from 'react';

const projects = [
  {
    title: 'High-Frequency Crypto Trading Engine',
    hook: 'Real-time trade monitoring platform with live sub-millisecond updates.',
    description:
      'Built a high-performance data pipeline and trading engine. Streams live BTC/USDT data from Finnhub via WebSockets, processed through Apache Kafka and Redis for low-latency updates, and persisted in MongoDB for historical trend analysis.',
    tech: ['Angular', 'Node.js', 'Kafka', 'Redis', 'MongoDB', 'Docker'],
    image: '/projects/trading_engine.png',
    accentHue: '#F5C518',
    githubUrl: 'https://github.com/lokesh9999b/Trading-Project',
    liveUrl: '',
  },
  {
    title: 'Security Compliance Portal',
    hook: 'Zero-trust visitor intelligence powered by machine learning.',
    description:
      'An enterprise security platform and AI-driven compliance application. Utilized Groq LLM to automate remediation plans, reducing manual resolution times and integrating AI intelligence into enterprise security workflows.',
    tech: ['Angular', 'Node.js', 'Python (AI/ML)', 'LLM', 'Docker'],
    image: '/projects/security_portal.png',
    accentHue: '#F5C518',
    githubUrl: '',
    liveUrl: '',
  },
  {
    title: 'Smart Employee Attendance App',
    hook: 'Effortless attendance tracking with geofencing and image verification.',
    description:
      'A secure Employee Attendance System featuring complex Role-Based Access Control (RBAC) and dynamic validation workflows. Achieved 99% accuracy in automated payroll disbursement through reliable geofencing and photo check-ins.',
    tech: ['Angular', 'Node.js', 'MongoDB', 'REST APIs', 'Docker'],
    image: '/projects/attendance_app.png',
    accentHue: '#F5C518',
    githubUrl: 'https://github.com/lokesh9999b/ifl-Attendance-Application',
    liveUrl: '',
  },
  {
    title: 'Pastebin Lite',
    hook: 'A lightning-fast, lightweight snippet sharing application.',
    description:
      'Developed a modern pastebin clone with a clean UI and seamless code-sharing links. Built to quickly share code snippets and text passages with syntax highlighting focus and robust URL generation.',
    tech: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    image: '/projects/pastebin_lite.png',
    accentHue: '#F5C518',
    githubUrl: 'https://github.com/lokesh9999b/pastebin-lite',
    liveUrl: 'https://pastebin-lite-self-beta.vercel.app',
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col md:flex-row ${
        isEven ? 'md:flex-row' : 'md:flex-row-reverse'
      } items-center gap-8 lg:gap-16 py-16 border-b border-dark-4 last:border-0 relative`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Glow Effect behind image - only visible on hover */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-amber-glow/5 rounded-[100px] blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
      />

      {/* Image Container */}
      <div className="w-full md:w-[55%] relative z-10 perspective-1000">
        <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] border border-white/5 bg-dark-2 shadow-2xl transition-all duration-700 group-hover:border-amber-glow/30 group-hover:shadow-[0_0_40px_rgba(245,197,24,0.1)] group-hover:-translate-y-2">
          {/* Default Grayscale mapping -> Color on hover */}
          <div className="absolute inset-0 bg-dark-2 mix-blend-overlay opacity-40 group-hover:opacity-0 transition-opacity duration-700 z-10" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 scale-[1.02]"
          />
          {/* Glass Gradient Header */}
          <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black/80 via-black/30 to-transparent z-10 opacity-70 group-hover:opacity-20 transition-opacity duration-700" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 to-transparent z-10 opacity-90" />
          
          <div className="absolute top-6 left-6 z-20 overflow-hidden rounded-full backdrop-blur-md bg-white/10 border border-white/20 px-4 py-1.5 shadow-lg">
            <span className="text-white text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-glow animate-pulse" />
              Project 0{index + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="w-full md:w-[45%] flex flex-col justify-center relative z-10">
        <div className="flex items-center gap-4 mb-5">
          <div className="h-px flex-grow bg-gradient-to-r from-amber-glow/0 via-amber-glow/50 to-amber-glow/0 md:hidden" />
          <span className="text-amber-glow font-mono text-sm tracking-widest uppercase opacity-80 hidden md:block">
            Showcase
          </span>
          <div className="h-px w-12 bg-amber-glow/50 hidden md:block" />
        </div>

        <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-amber-glow transition-all duration-500 leading-tight">
          {project.title}
        </h3>

        <p className="text-lg lg:text-xl text-amber-glow/90 font-medium mb-6 leading-snug">
          {project.hook}
        </p>

        <p className="text-text-muted text-base lg:text-lg leading-relaxed mb-8">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2.5 mb-10">
          {project.tech.map((t, i) => (
            <span
              key={t}
              className="px-3.5 py-1.5 bg-white/5 border border-white/10 text-text-secondary text-xs sm:text-sm font-medium rounded-xl group-hover:border-amber-glow/20 group-hover:text-white transition-colors duration-300 backdrop-blur-sm shadow-sm"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4">
          {project.liveUrl ? (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2.5 px-6 py-3 bg-amber-glow text-black text-sm font-bold rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(245,197,24,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
            >
              <ExternalLink size={16} strokeWidth={2.5} />
              Live Demo
            </a>
          ) : (
            <button disabled className="flex items-center gap-2.5 px-6 py-3 bg-white/5 text-white/40 text-sm font-bold rounded-full border border-white/5 cursor-not-allowed">
              <ExternalLink size={16} strokeWidth={2.5} />
              Internal Demo
            </button>
          )}

          {project.githubUrl ? (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-2.5 px-6 py-3 border text-white text-sm font-bold rounded-full border-white/20 hover:border-amber-glow/50 hover:bg-amber-glow/5 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm group/btn"
            >
              <Github size={16} className="group-hover/btn:text-amber-glow transition-colors" />
              Source Code
            </a>
          ) : (
            <button disabled className="flex items-center gap-2.5 px-6 py-3 border text-white/40 text-sm font-bold rounded-full border-white/10 cursor-not-allowed">
              <BookOpen size={16} />
              Proprietary Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, isVisible } = useScrollAnimation();

  // Typing effect for heading
  const headingFull = 'Selected Work';
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
    <section id="projects" className="bg-[#09090b] py-24 lg:py-32 relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/4 w-1/2 h-40 bg-amber-glow/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-1/2 h-64 bg-amber-glow/5 blur-[150px] pointer-events-none" />

      <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10">
        <div
          ref={ref}
          className={`mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-glow animate-pulse" />
            <span className="text-white/80 text-xs font-bold tracking-widest uppercase">Portfolio</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mt-2 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight">
                {typedHeading}
                {showCursor && <span className="text-amber-glow animate-pulse font-light opacity-80">|</span>}
              </h2>
              <p className="mt-6 text-text-muted text-lg lg:text-xl max-w-xl leading-relaxed">
                A selection of high-impact engineering projects, featuring low-latency system design, AI integrations, and full-stack architecture.
              </p>
            </div>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-amber-glow/10 border border-white/10 hover:border-amber-glow/30 text-white text-sm font-semibold transition-all duration-300 group whitespace-nowrap"
            >
              Collaborate With Me
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-amber-glow transition-transform" />
            </a>
          </div>
        </div>

        <div className="flex flex-col">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
