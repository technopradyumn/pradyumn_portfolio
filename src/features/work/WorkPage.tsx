import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/content';
import { Project } from '../../types';

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const containerVariants: Variants = {
  visible: { transition: { staggerChildren: 0.1 } }
};

type FilterCategory = 'all' | 'ai' | 'mobile' | 'backend';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI / ML', value: 'ai' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Backend', value: 'backend' },
];

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const springConfig = { stiffness: 60, damping: 20, mass: 1 };

  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const springImgY = useSpring(imgY, springConfig);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const springTextY = useSpring(textY, springConfig);
  const rawScale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  const scale = useSpring(rawScale, springConfig);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const opacity = useSpring(rawOpacity, springConfig);

  const categoryBadges: Record<string, { text: string; className: string }> = {
    ai: { text: 'AI / ML', className: 'text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5' },
    mobile: { text: 'Mobile', className: 'text-accent-violet border-accent-violet/20 bg-accent-violet/5' },
    backend: { text: 'Backend', className: 'text-accent-emerald border-accent-emerald/20 bg-accent-emerald/5' },
  };

  const badge = categoryBadges[project.category] || categoryBadges.ai;

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col md:flex-row gap-10 md:gap-20 items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      <Link to={`/work/${project.slug}`} className="w-full md:w-3/5 block z-10 group">
        <motion.div style={{ y: springImgY, scale }} className="w-full">
          <div className="overflow-hidden rounded-2xl relative aspect-video glass-panel card-glow">
            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 will-change-transform" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider border ${badge.className}`}>
              {badge.text}
            </div>
          </div>
        </motion.div>
      </Link>

      <motion.div
        style={{ y: springTextY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-15%" }}
        variants={containerVariants}
        className="w-full md:w-2/5 flex flex-col gap-5 z-0"
      >
        <motion.div variants={textVariants} className="flex items-center gap-4">
          <span className="text-accent-cyan font-mono text-sm bg-accent-cyan/5 px-3 py-1 rounded-full border border-accent-cyan/20">{project.year}</span>
          <span className="h-px w-8" style={{ backgroundColor: 'var(--border-color)' }}></span>
          <span className="font-mono text-sm uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{project.client}</span>
        </motion.div>

        <motion.div variants={textVariants}>
          <Link to={`/work/${project.slug}`} className="block group/title">
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 leading-[1.1] group-hover/title:text-accent-cyan transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h2>
          </Link>
          <p className="leading-relaxed text-base pl-5" style={{ color: 'var(--text-secondary)', borderLeft: '2px solid var(--border-color)' }}>
            {project.fullDescription}
          </p>
        </motion.div>

        <motion.div variants={textVariants} className="flex flex-wrap gap-2 pt-1">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs border px-3 py-1.5 rounded-full hover:border-accent-cyan/30 hover:text-accent-cyan transition-colors cursor-default" style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--code-bg)' }}>
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div variants={textVariants}>
          <Link to={`/work/${project.slug}`} className="group inline-flex items-center gap-2 font-bold hover:text-accent-cyan transition-colors mt-1 text-base" style={{ color: 'var(--text-primary)' }}>
            View Case Study
            <span className="w-10 h-px group-hover:w-16 transition-all duration-300" style={{ backgroundColor: 'var(--text-primary)' }}></span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const WorkPage = () => {
  const [filter, setFilter] = useState<FilterCategory>('all');
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-24 max-w-7xl mx-auto w-full overflow-hidden">
      <div className="mb-24 mt-12">
        <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="text-6xl md:text-8xl font-heading font-bold mb-8 tracking-tight" style={{ color: 'var(--text-primary)' }}>
          Work<span className="gradient-text">.</span>
        </motion.h1>
        <motion.div initial={{ width: 0 }} animate={{ width: "80px" }} transition={{ duration: 1, delay: 0.5 }} className="h-0.5 bg-gradient-to-r from-accent-cyan to-accent-violet mb-8" />
        <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          A collection of AI systems, data pipelines, and mobile applications — each solving real-world challenges with intelligent engineering.
        </motion.p>

        <div className="flex flex-wrap gap-3">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wider border transition-all duration-300 cursor-pointer ${
                filter === f.value
                  ? 'bg-accent-cyan/10 border-accent-cyan/30 text-accent-cyan'
                  : 'bg-transparent hover:text-accent-cyan'
              }`}
              style={filter !== f.value ? { borderColor: 'var(--border-color)', color: 'var(--text-muted)' } : undefined}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-32 pb-24">
        {filtered.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};