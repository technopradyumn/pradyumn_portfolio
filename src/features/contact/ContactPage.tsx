import { useState } from 'react';
import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';
import { Copy, Check, Send } from 'lucide-react';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTENT.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-24 max-w-7xl mx-auto w-full min-h-[80vh] flex flex-col justify-center"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left Side - Info */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-7xl md:text-9xl font-serif font-bold mb-8 tracking-tighter">
            Let's<br />Talk<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-lg leading-relaxed">
            Have a project in mind? Let's build something great together.
            I'm currently available for freelance projects.
          </p>

          <div className="space-y-8">
            <div
              onClick={copyEmail}
              className="group flex items-center gap-4 text-2xl md:text-3xl font-bold cursor-pointer hover:text-blue-400 transition-colors"
            >
              <div className="p-4 bg-zinc-900 rounded-full border border-zinc-800 group-hover:border-blue-500/50 transition-colors">
                {copied ? <Check size={24} className="text-green-500" /> : <Copy size={24} />}
              </div>
              <span>{CONTENT.contact.email}</span>
            </div>

            <div className="flex gap-4 mt-8">
              {CONTENT.socials.map(s => (
                <a
                  key={s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-4 bg-zinc-900 rounded-full border border-zinc-800 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                >
                  <s.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Glass Form */}
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="glass-panel p-8 md:p-12 rounded-3xl border-t border-white/10"
        >
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Your Name</label>
              <input
                type="text"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-lg"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-lg"
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Project Details</label>
              <textarea
                rows={4}
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 focus:outline-none focus:border-blue-500 focus:bg-zinc-900 transition-all text-lg resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button className="w-full bg-white text-black py-4 rounded-xl font-bold text-lg uppercase tracking-wider hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group">
              Send Message
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};