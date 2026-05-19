import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Bot, Brain, Database, Smartphone, Server } from 'lucide-react';
import { SERVICES } from '../../data/content';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15, mass: 1 } }
};

const IconMap: Record<string, any> = { 'bot': Bot, 'brain': Brain, 'database': Database, 'smartphone': Smartphone, 'server': Server };
const iconColors: Record<string, string> = { 'bot': 'text-accent-cyan', 'brain': 'text-accent-violet', 'database': 'text-accent-emerald', 'smartphone': 'text-blue-400', 'server': 'text-orange-400' };
const iconGrads: Record<string, string> = { 'bot': 'from-accent-cyan/15 to-accent-cyan/5', 'brain': 'from-accent-violet/15 to-accent-violet/5', 'database': 'from-accent-emerald/15 to-accent-emerald/5', 'smartphone': 'from-blue-500/15 to-blue-500/5', 'server': 'from-orange-500/15 to-orange-500/5' };

export const ServicesPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-24 max-w-7xl mx-auto w-full">
    <div className="mb-20 mt-12">
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-8xl font-heading font-bold mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
        Services<span className="gradient-text">.</span>
      </motion.h1>
      <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ duration: 1, delay: 0.5 }} className="h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet mb-8" />
      <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg max-w-2xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        End-to-end AI engineering — from autonomous agents and RAG pipelines to scalable infrastructure and intelligent mobile apps.
      </motion.p>
    </div>
    <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-24">
      {SERVICES.map((svc, i) => {
        const Icon = IconMap[svc.icon] || Bot;
        return (
          <motion.div key={svc.id} variants={cardVariants} className="group glass-panel p-8 rounded-2xl card-glow flex flex-col h-full overflow-hidden relative">
            <div className={`absolute inset-0 bg-gradient-to-br ${iconGrads[svc.icon] || iconGrads.bot} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
            <Link to={`/services/${svc.slug}`} className="block h-full relative z-10 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div className={`p-4 rounded-2xl ${iconColors[svc.icon] || 'text-accent-cyan'} group-hover:scale-110 transition-all duration-300 border`} style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-color)' }}>
                  <Icon size={28} strokeWidth={1.5} />
                </div>
                <span className="font-mono text-sm" style={{ color: 'var(--text-muted)' }}>0{i + 1}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 font-heading group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>{svc.title}</h3>
              <p className="mb-8 line-clamp-3 leading-relaxed text-sm" style={{ color: 'var(--text-secondary)' }}>{svc.description}</p>
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-6">
                  {svc.features.slice(0, 3).map(f => (
                    <span key={f} className="text-xs border px-2 py-1 rounded-md font-mono" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)', backgroundColor: 'var(--code-bg)' }}>{f}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-muted)' }}>
                  Learn More <ArrowRight className="w-4 h-4 -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  </motion.div>
);