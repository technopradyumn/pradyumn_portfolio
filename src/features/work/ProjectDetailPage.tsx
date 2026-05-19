import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data/content';

const catBadges: Record<string, { text: string; cls: string }> = {
  ai: { text: 'AI / ML', cls: 'text-accent-cyan bg-accent-cyan/10 border-accent-cyan/20' },
  mobile: { text: 'Mobile', cls: 'text-accent-violet bg-accent-violet/10 border-accent-violet/20' },
  backend: { text: 'Backend', cls: 'text-accent-emerald bg-accent-emerald/10 border-accent-emerald/20' },
};

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);
  if (!project) return <Navigate to="/#work" />;
  const badge = catBadges[project.category] || catBadges.ai;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <div className="w-full h-[60vh] relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-primary), var(--gradient-overlay) 60%, transparent)' }} />
        <div className="absolute bottom-12 left-6 md:left-24 max-w-7xl w-full">
          <Link to="/#work" className="inline-flex items-center gap-2 hover:text-accent-cyan mb-6 text-sm uppercase tracking-widest transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <ArrowLeft size={16} /> Back to Work
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${badge.cls}`}>{badge.text}</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-bold" style={{ color: 'var(--text-primary)' }}>{project.title}</h1>
        </div>
      </div>
      <div className="px-6 py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-24 pb-12" style={{ borderBottom: '1px solid var(--border-color)' }}>
          {[
            { label: 'Role', value: project.role },
            { label: 'Client', value: project.client },
            { label: 'Year', value: project.year },
          ].map(item => (
            <div key={item.label}>
              <span className="block text-sm mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>{item.label}</span>
              <span className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>{item.value}</span>
            </div>
          ))}
          <div>
            <span className="block text-sm mb-2 font-mono" style={{ color: 'var(--text-muted)' }}>Link</span>
            <a href={project.link} target="_blank" rel="noreferrer" className="text-lg flex items-center gap-2 hover:text-accent-cyan transition-colors font-medium" style={{ color: 'var(--text-primary)' }}>
              View Project <ExternalLink size={16} />
            </a>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-16">
          {project.tags.map(tag => (
            <span key={tag} className="text-sm border px-4 py-2 rounded-full font-mono" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--code-bg)' }}>{tag}</span>
          ))}
        </div>
        <div className="space-y-20">
          <section>
            <h3 className="text-2xl font-bold mb-6 font-heading text-accent-cyan">The Challenge</h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.challenges}</p>
          </section>
          <section>
            <h3 className="text-2xl font-bold mb-6 font-heading text-accent-violet">The Solution</h3>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{project.solution}</p>
          </section>
        </div>
      </div>
      <div className="px-6 py-24 text-center" style={{ borderTop: '1px solid var(--border-color)' }}>
        <p className="mb-4 font-mono text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>Continue exploring</p>
        <h2 className="text-4xl font-heading font-bold hover:text-accent-cyan cursor-pointer transition-colors" style={{ color: 'var(--text-primary)' }}>
          <Link to="/#work">View All Works</Link>
        </h2>
      </div>
    </motion.div>
  );
};