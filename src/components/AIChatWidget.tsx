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
    { role: 'assistant', content: "Hey there! 👋 I'm **Lokesh's AI assistant**. Ask me anything about his skills, projects, or background!" }
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
          } catch (_) {}
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
      <div className="fixed bottom-6 right-6 z-50 group">
        {/* Pulse ring animation */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 animate-chat-ping opacity-40" />
        )}
        
        {/* Hover tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-1.5 bg-dark-2 border border-dark-4 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
          <Sparkles size={12} className="inline mr-1.5 text-amber-glow" />
          Chat with AI
          <div className="absolute top-full right-5 w-2 h-2 bg-dark-2 border-r border-b border-dark-4 transform rotate-45 -translate-y-1" />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full flex items-center justify-center text-dark-1 shadow-[0_4px_24px_rgba(245,197,24,0.4)] hover:shadow-[0_4px_32px_rgba(245,197,24,0.6)] hover:scale-110 active:scale-95 transition-all duration-300"
        >
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90 scale-110' : 'rotate-0'}`}>
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
          </div>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] sm:w-[420px] h-[560px] max-h-[80vh] bg-[#0A0A0A]/95 backdrop-blur-xl border border-dark-4 rounded-2xl shadow-[0_8px_64px_rgba(0,0,0,0.5)] flex flex-col z-50 overflow-hidden animate-fade-up">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-dark-2/80 to-dark-2/40 border-b border-dark-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-yellow-500/10 flex items-center justify-center text-amber-500 ring-2 ring-amber-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-white text-sm">Lokesh AI</h3>
              <p className="text-[11px] text-text-muted">Powered by Sarvam AI</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-emerald-400/80 font-medium">Online</span>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5" style={{ WebkitOverflowScrolling: 'touch' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${msg.role === 'user' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/15 text-amber-500'}`}>
                  {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.role === 'user' ? 'bg-indigo-600/90 text-white rounded-tr-sm' : 'bg-dark-3/80 text-gray-200 rounded-tl-sm border border-dark-4/50'}`}>
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
                <div className="w-7 h-7 rounded-full bg-amber-500/15 flex items-center justify-center text-amber-500 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-dark-3/80 border border-dark-4/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2.5">
                  <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                  <span className="text-[13px] text-text-muted">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="px-4 py-3.5 border-t border-dark-4/80 bg-dark-2/40">
            <div className="relative flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Lokesh..."
                className="flex-1 bg-dark-3/60 border border-dark-4 rounded-xl px-4 py-2.5 text-sm text-white placeholder-text-muted focus:outline-none focus:border-amber-500/40 focus:bg-dark-3/80 transition-all duration-200"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-9 h-9 bg-gradient-to-br from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-dark-1 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-40 disabled:hover:from-amber-500 disabled:hover:to-yellow-500 hover:shadow-[0_0_16px_rgba(245,197,24,0.3)]"
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
