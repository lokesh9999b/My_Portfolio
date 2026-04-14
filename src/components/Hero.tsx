import { useEffect, useRef, useState } from 'react';
import { Download, ArrowDown, Github, Linkedin, Twitter } from 'lucide-react';

const techStack = ['Angular', 'TypeScript', 'Node.js', 'Apache Kafka', 'Docker'];

// ── Galaxy canvas animation ──────────────────────────────────────────────────
function GalaxyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Resize canvas to fill section
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Stars
    const STAR_COUNT = 220;
    type Star = { x: number; y: number; r: number; alpha: number; da: number; speed: number };
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => {
      const r = Math.random() * 1.8 + 0.3;
      // Parallax: bigger stars move faster (foreground), tiny ones slower (background)
      const speed = r > 1.4
        ? Math.random() * 0.8 + 0.9   // fast — foreground layer
        : r > 0.8
        ? Math.random() * 0.5 + 0.4   // medium — mid layer
        : Math.random() * 0.25 + 0.15; // slow  — background layer
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r,
        alpha: Math.random() * 0.6 + 0.4,
        da: (Math.random() * 0.008 + 0.003) * (Math.random() < 0.5 ? 1 : -1),
        speed,
      };
    });

    // ── Shooting stars
    type Shoot = { x: number; y: number; len: number; speed: number; angle: number; alpha: number; active: boolean };
    const shoots: Shoot[] = Array.from({ length: 4 }, () => ({ x: 0, y: 0, len: 0, speed: 0, angle: 0, alpha: 0, active: false }));

    const spawnShoot = (s: Shoot) => {
      s.x = Math.random() * canvas.width * 0.8;
      s.y = Math.random() * canvas.height * 0.4;
      s.len = Math.random() * 120 + 60;
      s.speed = Math.random() * 8 + 6;
      s.angle = Math.PI / 5 + Math.random() * 0.3;
      s.alpha = 1;
      s.active = true;
    };

    // Stagger initial spawn
    shoots.forEach((s, i) => setTimeout(() => spawnShoot(s), i * 3500 + 2000));

    // ── Nebula pulse params
    let nebulaT = 0;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Slowly drifting nebula glow
      nebulaT += 0.004;
      const nx = w * 0.65 + Math.sin(nebulaT * 0.7) * 60;
      const ny = h * 0.3 + Math.cos(nebulaT * 0.5) * 40;
      const nebulaGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, 380);
      nebulaGrad.addColorStop(0, 'rgba(245,197,24,0.055)');
      nebulaGrad.addColorStop(0.5, 'rgba(245,197,24,0.018)');
      nebulaGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebulaGrad;
      ctx.fillRect(0, 0, w, h);

      // Second cooler nebula (blue-ish)
      const nx2 = w * 0.15 + Math.cos(nebulaT * 0.6) * 50;
      const ny2 = h * 0.7 + Math.sin(nebulaT * 0.4) * 30;
      const nebulaGrad2 = ctx.createRadialGradient(nx2, ny2, 0, nx2, ny2, 260);
      nebulaGrad2.addColorStop(0, 'rgba(100,120,255,0.04)');
      nebulaGrad2.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebulaGrad2;
      ctx.fillRect(0, 0, w, h);

      // Stars
      stars.forEach((star) => {
        star.alpha += star.da;
        if (star.alpha <= 0 || star.alpha >= 1) star.da *= -1;
        star.y -= star.speed;
        if (star.y < -2) star.y = h + 2;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        // Bigger stars get a warm amber tint
        const tint = star.r > 1.2
          ? `rgba(255,235,160,${star.alpha})`
          : `rgba(255,255,255,${star.alpha * 0.85})`;
        ctx.fillStyle = tint;
        ctx.fill();

        // Soft glow halo for larger stars
        if (star.r > 1.1) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 4);
          glow.addColorStop(0, `rgba(245,197,24,${star.alpha * 0.25})`);
          glow.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Shooting stars
      shoots.forEach((s) => {
        if (!s.active) return;
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.018;

        if (s.alpha <= 0) {
          s.active = false;
          setTimeout(() => spawnShoot(s), Math.random() * 5000 + 3000);
          return;
        }

        const tx = s.x - Math.cos(s.angle) * s.len;
        const ty = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tx, ty, s.x, s.y);
        grad.addColorStop(0, 'rgba(245,197,24,0)');
        grad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Lokesh';
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => setShowCursor(false), 1500);
      }
    }, 160);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-near-black flex flex-col justify-center overflow-hidden"
    >
      {/* Galaxy background */}
      <GalaxyCanvas />

      {/* Original ambient glows — kept on top of canvas */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #F5C518 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16" style={{ zIndex: 2 }}>
        <div className="max-w-4xl">
          <div
            className="mb-4 animate-fade-in"
            style={{ animationDelay: '0.1s', opacity: 0 }}
          >
            <span className="text-amber-glow text-xs font-bold tracking-[0.3em] uppercase border border-amber-glow/30 px-3 py-1.5 rounded-full">
              Hello, I&apos;m
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.2s', opacity: 0 }}
          >
            {typedText}
            {showCursor && (
              <span className="text-amber-glow animate-blink">|</span>
            )}
          </h1>

          <p
            className="text-lg sm:text-xl lg:text-2xl text-text-secondary font-light leading-relaxed mb-8 max-w-3xl animate-fade-up"
            style={{ animationDelay: '0.5s', opacity: 0 }}
          >
            Software Engineer at
            <span className="text-amber-glow font-medium"> Sify Technologies, turning hard problems into fast, reliable full-stack products.</span>
          </p>

          <div
            className="flex flex-wrap gap-2 mb-10 animate-fade-up"
            style={{ animationDelay: '0.75s', opacity: 0 }}
          >
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-semibold bg-dark-3 text-text-secondary border border-dark-4 rounded-full hover:border-amber-glow/50 hover:text-amber-glow transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          <div
            className="flex flex-wrap items-center gap-4 mb-12 animate-fade-up"
            style={{ animationDelay: '0.85s', opacity: 0 }}
          >
            <a
              href={import.meta.env.VITE_RESUME_PATH}
              download
              className="group flex items-center gap-2.5 px-7 py-3.5 bg-amber-glow text-black font-bold text-sm rounded-full hover:bg-amber-light transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-glow/20"
            >
              <Download size={16} />
              Download Resume
            </a>
            <button
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-2.5 px-7 py-3.5 border border-dark-4 text-text-secondary font-medium text-sm rounded-full hover:border-amber-glow/50 hover:text-white transition-all duration-200"
            >
              View My Work
            </button>
          </div>

          <div
            className="flex items-center gap-4 animate-fade-in"
            style={{ animationDelay: '1s', opacity: 0 }}
          >
            {[
              { Icon: Github, label: 'GitHub', href: import.meta.env.VITE_GITHUB_URL },
              { Icon: Linkedin, label: 'LinkedIn', href: import.meta.env.VITE_LINKEDIN_URL },
              // { Icon: Twitter, label: 'Twitter', href: '#' },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-dark-4 flex items-center justify-center text-text-muted hover:border-amber-glow/50 hover:text-amber-glow hover:bg-amber-glow/5 transition-all duration-200"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted animate-fade-in" style={{ animationDelay: '1.2s', opacity: 0, zIndex: 2 }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}
