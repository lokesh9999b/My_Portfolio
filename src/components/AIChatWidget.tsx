import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, User, Bot, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { supabase } from '../lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! 👋 I'm **Nexus** — Lokesh's personal AI assistant. Ask me anything about his skills, projects, experience — or just chat about tech!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Auto-focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    
    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { messages: newMessages }
      });

      if (error) {
        console.error("Function invocation error:", error);
        let errorDetail = error.message;
        if (error instanceof Error && 'context' in error) {
          try {
            const ctx = (error as any).context;
            if (ctx && typeof ctx.json === 'function') {
              const body = await ctx.json();
              errorDetail = body?.error || errorDetail;
            }
          } catch {}
        }
        throw new Error(errorDetail);
      }

      if (data?.error) {
        console.error("API error in response:", data.error);
        setMessages([...newMessages, { role: 'assistant', content: `Something went wrong. Please try again in a moment.` }]);
        return;
      }

      const aiReply = data?.choices?.[0]?.message?.content || "I'm sorry, I'm having trouble connecting right now.";
      setMessages([...newMessages, { role: 'assistant', content: aiReply }]);
    } catch (err: any) {
      console.error("Chat error:", err);
      setMessages([...newMessages, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 group">
        {/* Pulse ring animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-accent to-accent-hover animate-chat-ping opacity-40" />
        )}
        
        {/* Hover tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-surface border border-theme rounded-lg text-primary text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
          <Sparkles size={12} className="inline mr-1.5 text-accent" />
          Chat with AI
          <div className="absolute top-full right-5 w-2 h-2 bg-surface border-r border-b border-theme transform rotate-45 -translate-y-1" />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-accent to-accent-hover rounded-full flex items-center justify-center text-accent-contrast shadow-lg shadow-accent/40 hover:shadow-xl hover:shadow-accent/50 hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}>
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-3 bottom-20 h-[calc(100dvh-6rem)] max-h-[560px] sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[420px] sm:h-[560px] sm:max-h-[80vh] bg-app/95 backdrop-blur-xl border border-theme rounded-2xl shadow-[0_8px_64px_rgba(0,0,0,0.35)] flex flex-col z-50 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="px-4 sm:px-5 py-4 bg-gradient-to-r from-surface/80 to-surface/40 border-b border-theme flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/30 to-accent-hover/10 flex items-center justify-center text-accent ring-2 ring-accent/20">
              <Bot className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-heading font-semibold text-primary text-sm">Nexus</h3>
              <p className="text-[11px] text-subtle">Lokesh's AI Assistant</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400/80 font-medium">Online</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-3.5 sm:px-5 py-4 sm:py-5 space-y-4 sm:space-y-5" style={{ WebkitOverflowScrolling: 'touch' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === 'user' ? 'bg-accent/20 text-accent' : 'bg-elevated text-accent'}`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[84%] sm:max-w-[80%] rounded-2xl px-3.5 sm:px-4 py-2.5 ${msg.role === 'user' ? 'bg-accent text-accent-contrast rounded-tr-sm' : 'bg-elevated/80 text-muted rounded-tl-sm border border-theme/50'}`}>
                  {msg.role === 'assistant' ? (
                    <div className="chat-markdown text-[14px] leading-relaxed">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-[14px] leading-relaxed">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-7 h-7 rounded-full bg-elevated flex items-center justify-center text-accent mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-elevated/80 border border-theme/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-accent" />
                  <span className="text-[13px] text-subtle">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="px-3.5 sm:px-4 py-3.5 border-t border-theme/80 bg-surface/40">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Lokesh..."
                className="min-w-0 flex-1 bg-elevated/60 border border-theme rounded-xl px-4 py-2.5 text-sm text-primary placeholder-subtle focus:outline-none focus:border-accent/40 focus:bg-elevated/80 transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 bg-gradient-to-br from-accent to-accent-hover hover:from-accent-hover hover:to-accent text-accent-contrast rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:hover:from-accent disabled:hover:to-accent-hover hover:shadow-lg hover:shadow-accent/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
