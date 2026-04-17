import { useState, useEffect, useRef } from 'react';
import { Send, Calendar, CheckCircle, AlertCircle, Mail, MapPin, Zap } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, ContactSubmission } from '../lib/supabase';

const initialForm: ContactSubmission = {
  name: '',
  email: '',
  role_or_project: '',
  message: '',
};

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState<ContactSubmission>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Typing effect for heading
  const line1Full = "Let's build something";
  const line2Full = 'that matters.';
  const [typedLine1, setTypedLine1] = useState('');
  const [typedLine2, setTypedLine2] = useState('');
  const [showCursor, setShowCursor] = useState(false);
  const typingStarted = useRef(false);

  useEffect(() => {
    if (!isVisible || typingStarted.current) return;
    typingStarted.current = true;
    setShowCursor(true);

    let i = 0;
    // Type line 1
    const timer1 = setInterval(() => {
      if (i < line1Full.length) {
        setTypedLine1(line1Full.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer1);
        // Short pause then type line 2
        setTimeout(() => {
          let j = 0;
          const timer2 = setInterval(() => {
            if (j < line2Full.length) {
              setTypedLine2(line2Full.slice(0, j + 1));
              j++;
            } else {
              clearInterval(timer2);
              setTimeout(() => setShowCursor(false), 1200);
            }
          }, 80);
        }, 300);
      }
    }, 60);
  }, [isVisible]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    const { error } = await supabase.from('contact_submissions').insert([form]);
    if (error) {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    } else {
      setStatus('success');
      setForm(initialForm);
    }
  };

  return (
    <section id="contact" className="bg-dark-1 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div
          ref={ref}
          className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="mb-16">
            <span className="text-amber-glow text-xs font-bold tracking-[0.3em] uppercase">Get in Touch</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mt-3 leading-none">
              <span className="block whitespace-nowrap">
                {typedLine1}
                {showCursor && typedLine2 === '' && (
                  <span className="text-amber-glow animate-pulse">|</span>
                )}
              </span>
              <span className="block text-amber-glow whitespace-nowrap">
                {typedLine2}
                {showCursor && typedLine2.length > 0 && (
                  <span className="animate-pulse">|</span>
                )}
              </span>
            </h2>
            <div className="h-1 w-12 bg-amber-glow mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 flex flex-col gap-8">
              <p className="text-text-secondary text-base leading-relaxed">
                Whether you're building a startup, scaling distributed systems, or looking for an engineer who ships high-performance full-stack solutions — I'm ready to contribute.
              </p>

              <div className="space-y-5">
                {[
                  { icon: Mail, label: 'Email', value: import.meta.env.VITE_EMAIL },
                  { icon: MapPin, label: 'Location', value: 'Hyderabad, Telangana, India' },
                  { icon: Zap, label: 'Status', value: 'Open to opportunities' },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-dark-3 border border-dark-4 flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-amber-glow" />
                    </div>
                    <div>
                      <p className="text-text-muted text-xs font-medium uppercase tracking-wider">{label}</p>
                      <p className="text-white text-sm font-medium mt-0.5">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={import.meta.env.VITE_LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-amber-glow text-sm font-semibold hover:text-amber-light transition-colors duration-200 group mt-2"
              >
                <Calendar size={16} />
                Connect with me on LinkedIn
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </a>
            </div>

            <div className="lg:col-span-3">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center gap-4 bg-dark-2 border border-amber-glow/30 rounded-2xl p-10">
                  <CheckCircle size={48} className="text-amber-glow" />
                  <h3 className="text-white text-xl font-bold">Message Sent!</h3>
                  <p className="text-text-secondary text-sm">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2.5 bg-amber-glow text-black text-sm font-bold rounded-full hover:bg-amber-light transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-dark-2 border border-dark-4 rounded-2xl p-8 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
                        Your Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full bg-dark-3 border border-dark-4 text-white text-sm rounded-xl px-4 py-3 placeholder-text-muted focus:outline-none focus:border-amber-glow/60 focus:bg-dark-3/80 transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
                        Your Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full bg-dark-3 border border-dark-4 text-white text-sm rounded-xl px-4 py-3 placeholder-text-muted focus:outline-none focus:border-amber-glow/60 focus:bg-dark-3/80 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="role_or_project" className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
                      Role you're hiring for / Project you have in mind
                    </label>
                    <input
                      id="role_or_project"
                      name="role_or_project"
                      type="text"
                      value={form.role_or_project}
                      onChange={handleChange}
                      placeholder="e.g. Senior Backend Engineer / Scaling a payment system"
                      className="w-full bg-dark-3 border border-dark-4 text-white text-sm rounded-xl px-4 py-3 placeholder-text-muted focus:outline-none focus:border-amber-glow/60 focus:bg-dark-3/80 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-text-muted text-xs font-semibold uppercase tracking-wider mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell me about the challenge you're solving..."
                      className="w-full bg-dark-3 border border-dark-4 text-white text-sm rounded-xl px-4 py-3 placeholder-text-muted focus:outline-none focus:border-amber-glow/60 focus:bg-dark-3/80 transition-all duration-200 resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={15} />
                      {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full flex items-center justify-center gap-2.5 py-4 bg-amber-glow text-black font-bold text-sm rounded-xl hover:bg-amber-light transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-amber-glow/20"
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message &amp; Book a 15-min Call
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
