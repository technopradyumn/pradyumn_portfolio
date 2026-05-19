import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../../data/content';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);
  if (!post) return <Navigate to="/#blog" />;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
      <div className="w-full h-[50vh] relative">
        <img src={post.imageUrl || 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1632'} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: 'var(--gradient-overlay)' }} />
        <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
          <span className="text-accent-cyan font-mono text-sm tracking-widest uppercase mb-4">{post.category}</span>
          <h1 className="text-4xl md:text-6xl font-heading font-bold max-w-4xl mb-6" style={{ color: 'var(--text-primary)' }}>{post.title}</h1>
          <div className="flex gap-6 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
            <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
          </div>
        </div>
      </div>

      <div className="px-6 py-16 max-w-3xl mx-auto">
        <Link to="/#blog" className="inline-flex items-center gap-2 hover:text-accent-cyan mb-12 text-sm transition-colors" style={{ color: 'var(--text-muted)' }}>
          <ArrowLeft size={16} /> Back to Articles
        </Link>

        <div
          className="prose prose-lg max-w-none prose-headings:font-heading prose-a:text-accent-cyan"
          style={{ color: 'var(--text-secondary)', '--tw-prose-headings': 'var(--text-primary)' } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-24 pt-12" style={{ borderTop: '1px solid var(--border-color)' }}>
          <h3 className="text-2xl font-heading font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Read Next</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
              <Link key={p.id} to={`/blog/${p.slug}`} className="group block glass-panel p-6 rounded-xl card-glow">
                <h4 className="text-xl font-bold mb-2 font-heading group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>{p.title}</h4>
                <p className="text-sm line-clamp-2" style={{ color: 'var(--text-muted)' }}>{p.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};