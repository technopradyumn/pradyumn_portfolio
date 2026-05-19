import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { SERVICES } from '../../data/content';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);
  if (!service) return <Navigate to="/#services" />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <div className="px-6 py-24 max-w-4xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 hover:text-accent-cyan mb-12 text-sm uppercase tracking-widest transition-colors" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> All Services
        </Link>
        <h1 className="text-5xl md:text-8xl font-heading font-bold mb-12" style={{ color: 'var(--text-primary)' }}>{service.title}</h1>
        <p className="text-xl md:text-2xl leading-relaxed mb-16" style={{ color: 'var(--text-secondary)' }}>{service.fullDescription}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h3 className="text-2xl font-bold mb-8 font-heading text-accent-cyan">Key Capabilities</h3>
            <ul className="space-y-4">
              {service.features.map(f => (
                <li key={f} className="flex items-start gap-3">
                  <CheckCircle className="text-accent-cyan mt-1 shrink-0" size={20} />
                  <span className="text-lg" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-6 font-heading" style={{ color: 'var(--text-primary)' }}>Why this matters</h3>
            <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
              In today's AI-driven landscape, excellence in {service.title.toLowerCase()} is not just a competitive advantage — it's a necessity.
            </p>
            <Link to="/#contact" className="inline-block bg-accent-cyan text-black px-6 py-3 rounded-full font-bold hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all duration-300">
              Discuss your needs
            </Link>
          </div>
        </div>
        <section className="mb-24">
          <h2 className="text-4xl font-heading font-bold mb-12" style={{ color: 'var(--text-primary)' }}>My Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {service.process.map((step, i) => (
              <div key={i} className="pt-8 group" style={{ borderTop: '1px solid var(--border-color)' }}>
                <span className="text-accent-cyan font-mono text-sm mb-4 block">0{i + 1}</span>
                <h4 className="text-xl font-bold mb-2 font-heading group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>{step.title}</h4>
                <p style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="gradient-border p-12 text-center rounded-2xl">
          <h2 className="text-3xl font-heading font-bold mb-6" style={{ color: 'var(--text-primary)' }}>Ready to start?</h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Let's collaborate. I'm accepting new AI engineering projects for {new Date().getFullYear()}.</p>
          <Link to="/#contact" className="inline-block bg-accent-cyan text-black px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300">
            Start a Project
          </Link>
        </section>
      </div>
    </motion.div>
  );
};