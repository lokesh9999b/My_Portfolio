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
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    image: 'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800',
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
    image: 'https://images.pexels.com/photos/7567557/pexels-photo-7567557.jpeg?auto=compress&cs=tinysrgb&w=800',
    accentHue: '#F5C518',
    githubUrl: 'https://github.com/lokesh9999b/pastebin-lite',
    liveUrl: 'https://pastebin-lite-self-beta.vercel.app',
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
          {project.liveUrl ? (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-amber-glow text-black text-xs font-bold rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 active:scale-95">
              <ExternalLink size={13} />
              Live Demo
            </a>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-glow text-black text-xs font-bold rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 active:scale-95 opacity-50 cursor-not-allowed">
              <ExternalLink size={13} />
              Live Demo
            </button>
          )}
          {project.githubUrl ? (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 border border-dark-4 text-text-secondary text-xs font-medium rounded-full hover:border-amber-glow/40 hover:text-white transition-all duration-200">
              <Github size={13} />
              View Source
            </a>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 border border-dark-4 text-text-secondary text-xs font-medium rounded-full hover:border-amber-glow/40 hover:text-white transition-all duration-200 opacity-50 cursor-not-allowed">
              <BookOpen size={13} />
              Internal Project
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
