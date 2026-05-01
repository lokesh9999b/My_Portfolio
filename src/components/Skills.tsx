import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Monitor, Server, Database, Cloud } from 'lucide-react';

const skills = [
  {
    icon: Monitor,
    title: 'Frontend',
    items: ['Angular (14–19)', 'TypeScript', 'RxJS / Signals', 'Tailwind CSS', 'Lightweight Charts'],
    color: 'from-accent/10 to-transparent',
  },
  {
    icon: Server,
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'Microservices', 'REST APIs', 'WebSockets'],
    color: 'from-accent/10 to-transparent',
  },
  {
    icon: Database,
    title: 'Data & Streaming',
    items: ['Apache Kafka', 'Redis', 'MongoDB', 'MySQL', 'MSSQL'],
    color: 'from-accent/10 to-transparent',
  },
  {
    icon: Cloud,
    title: 'DevOps & Cloud',
    items: ['Docker', 'Azure (App Services)', 'GitHub Actions (CI/CD)', 'AWS', 'Python / SQL'],
    color: 'from-accent/10 to-transparent',
  },
];

export default function Skills() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="bg-section py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="mb-16">
            <span className="text-accent text-xs font-bold tracking-[0.3em] uppercase">Expertise</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary mt-3 leading-tight">
              Skills
            </h2>
            <div className="h-1 w-12 bg-accent mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skill, i) => {
              const Icon = skill.icon;
              return (
                <div
                  key={skill.title}
                  className="group relative bg-surface border border-theme rounded-2xl p-7 hover:border-accent/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                  style={{
                    transitionDelay: `${i * 80}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    transition: `opacity 0.6s ease ${i * 80}ms, transform 0.6s ease ${i * 80}ms, border-color 0.3s ease, translate 0.3s ease`,
                  }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10">
                    <div className="w-11 h-11 rounded-xl bg-elevated border border-theme flex items-center justify-center mb-5 group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-300">
                      <Icon size={20} className="text-accent" />
                    </div>

                    <h3 className="text-primary font-bold text-lg mb-4">{skill.title}</h3>

                    <ul className="space-y-2">
                      {skill.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                          <span className="text-muted text-sm font-medium group-hover:text-primary transition-colors duration-200">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
