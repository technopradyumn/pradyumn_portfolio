import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/content';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';

const catColors: Record<string, string> = {
  'Gen AI': 'text-accent-cyan border-accent-cyan/20 bg-accent-cyan/5',
  'Agentic AI': 'text-accent-violet border-accent-violet/20 bg-accent-violet/5',
  'Data Engineering': 'text-accent-emerald border-accent-emerald/20 bg-accent-emerald/5',
  'Mobile AI': 'text-blue-400 border-blue-400/20 bg-blue-400/5',
};

export const BlogPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-24 max-w-7xl mx-auto w-full">
    <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-8xl font-heading font-bold mb-16 tracking-tight" style={{ color: 'var(--text-primary)' }}>
      Blog<span className="gradient-text">.</span>
    </motion.h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {BLOG_POSTS.map((post, idx) => (
        <motion.article key={post.id} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: idx * 0.1 }} className="group h-full">
          <Link to={`/blog/${post.slug}`} className="block h-full">
            <div className="glass-panel rounded-2xl h-full flex flex-col card-glow overflow-hidden">
              {post.imageUrl && (
                <div className="w-full h-44 overflow-hidden relative">
                  <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, var(--bg-surface), transparent)` }} />
                </div>
              )}
              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs font-mono mb-5">
                  <div className="flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}><Calendar size={12} />{post.date}</div>
                  <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${catColors[post.category] || catColors['Gen AI']}`}><Tag size={10} />{post.category}</div>
                </div>
                <h2 className="text-xl md:text-2xl font-bold mb-3 font-heading leading-tight group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>{post.title}</h2>
                <p className="text-sm leading-relaxed mb-6 flex-grow" style={{ color: 'var(--text-secondary)' }}>{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider group-hover:text-accent-cyan transition-colors mt-auto pt-5" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)' }}>
                  <span>Read Article</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  </motion.div>
);