import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';
import { Copy, Check, Send, Sparkles } from 'lucide-react';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTENT.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-24 max-w-7xl mx-auto w-full min-h-[80vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald mb-8">
            <Sparkles size={14} /> Available for AI Projects
          </div>
          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
            Let's<br />Talk<span className="gradient-text">.</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Have an AI project in mind? Need agentic workflows or RAG pipelines? Let's build something intelligent together.
          </p>
          <div className="space-y-6">
            <div onClick={copyEmail} className="group flex items-center gap-4 text-xl md:text-2xl font-bold cursor-pointer hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>
              <div className="p-4 glass-panel rounded-full group-hover:border-accent-cyan/30 transition-colors">
                {copied ? <Check size={22} className="text-accent-emerald" /> : <Copy size={22} />}
              </div>
              <span>{CONTENT.contact.email}</span>
            </div>
            <div className="flex gap-3 mt-8">
              {CONTENT.socials.map(s => (
                <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="p-4 glass-panel rounded-full hover:bg-accent-cyan/10 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300" style={{ color: 'var(--text-muted)' }}>
                  <s.icon size={22} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="gradient-border p-8 md:p-10 rounded-2xl">
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            const subj = `Portfolio Contact from ${formData.name}`;
            const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
            window.location.href = `mailto:${CONTENT.contact.email}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(body)}`;
          }}>
            {[
              { label: 'Your Name', type: 'text', key: 'name', placeholder: 'John Doe' },
              { label: 'Email Address', type: 'email', key: 'email', placeholder: 'john@example.com' },
            ].map(field => (
              <div key={field.key} className="space-y-2">
                <label className="text-sm font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{field.label}</label>
                <input type={field.type} value={(formData as any)[field.key]} onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                  className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-cyan/50 transition-all text-base" required placeholder={field.placeholder}
                  style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
              </div>
            ))}
            <div className="space-y-2">
              <label className="text-sm font-mono uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Project Details</label>
              <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full border rounded-xl px-4 py-4 focus:outline-none focus:border-accent-cyan/50 transition-all text-base resize-none" required placeholder="Tell me about your AI project..."
                style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)', color: 'var(--text-primary)' }} />
            </div>
            <button type="submit" className="w-full bg-accent-cyan text-black py-4 rounded-xl font-bold text-base uppercase tracking-wider hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer">
              Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};