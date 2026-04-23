import React from 'react';
import { Award, BookOpen, Code2, Medal } from 'lucide-react';

const certificationsList = [
  {
    title: "DevOps Engineer Expert",
    issuer: "Microsoft",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
  },
  {
    title: "Azure Developer Associate",
    issuer: "Microsoft",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
  },
  {
    title: "Microsoft 365 Fundamentals",
    issuer: "Microsoft",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    style: "bg-white p-1 rounded"
  },
  {
    title: "Azure Fundamentals",
    issuer: "Microsoft",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg"
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    style: "bg-white p-2 rounded-lg"
  },
  {
    title: "AWS Certified Developer Associate 2024",
    issuer: "Udemy",
    icon: <BookOpen className="w-8 h-8 text-amber-glow" />
  },
  {
    title: "Data, ML, and AI Tasks",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Build and Secure Networks",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Foundational Infrastructure",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Create and Manage Cloud Resources",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Cloud Computing: Data, ML, AI",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Cloud Computing: Networking & Security",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Cloud Computing: Infrastructure",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "Cloud Computing Fundamentals",
    issuer: "Google Cloud",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg"
  },
  {
    title: "E-Commerce Level 1.1",
    issuer: "Unstop",
    icon: <Award className="w-8 h-8 text-amber-glow" />
  },
  {
    title: "Python Basic",
    issuer: "HackerRank",
    icon: <Code2 className="w-8 h-8 text-amber-glow" />
  },
  {
    title: "Machine Learning",
    issuer: "Hewlett Group",
    icon: <Medal className="w-8 h-8 text-amber-glow" />
  },
  {
    title: "Data Analytics with Python",
    issuer: "NPTEL",
    icon: <Code2 className="w-8 h-8 text-amber-glow" />
  },
  {
    title: "Cloud Development with HTML/CSS/JS",
    issuer: "IBM",
    icon: <BookOpen className="w-8 h-8 text-amber-glow" />
  }
];

const Certifications = () => {
  return (
    <section id="certifications" className="py-20 relative bg-near-black">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-dark-4 to-transparent blur-sm"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center mb-4">
          My <span className="text-amber-glow">Certifications</span>
        </h2>
        <p className="text-text-muted text-center max-w-2xl mx-auto">
          A showcase of my continuous learning and professional validations across top cloud providers and technology platforms.
        </p>
      </div>

      {/* Scroller Container */}
      <div className="w-full overflow-hidden flex flex-col gap-6 relative py-4">
        {/* Gradients for fading effect on edges */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-near-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-near-black to-transparent z-10 pointer-events-none"></div>

        {/* Marquee Row */}
        <div className="flex w-fit group">
          {/* Duplicating the list to create seamless infinite scroll */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex animate-marquee group-hover:[animation-play-state:paused]">
              {certificationsList.map((cert, idx) => (
                <div 
                  key={idx} 
                  className="mx-4 flex-shrink-0 w-[280px] bg-dark-2 rounded-xl p-6 border border-dark-4 hover:border-amber-glow/50 hover:shadow-[0_0_15px_rgba(245,197,24,0.15)] transition-all duration-300 flex flex-col items-center justify-center text-center gap-3 cursor-pointer"
                >
                  <div className="w-16 h-16 flex items-center justify-center bg-dark-3 rounded-xl mb-2 drop-shadow-md">
                    {cert.image ? (
                      <img src={cert.image} alt={cert.issuer} className={`max-w-[70%] max-h-[70%] object-contain ${cert.style || ''}`} />
                    ) : (
                      cert.icon
                    )}
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-base whitespace-normal leading-tight line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                      {cert.title}
                    </h3>
                    <p className="text-amber-glow/80 text-xs mt-2 uppercase tracking-wider font-semibold">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
