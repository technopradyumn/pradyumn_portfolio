import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../../data/content';
import { ArrowUpRight, Calendar, User, Tag } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const BlogPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      variants={containerVariants}
      className="px-6 py-24 max-w-7xl mx-auto w-full"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-7xl md:text-9xl font-serif font-bold mb-16 tracking-tighter"
      >
        Blog<span className="text-blue-500">.</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <motion.article
            key={post.id}
            variants={cardVariants}
            className="group relative h-full"
          >
            <Link to={`/blog/${post.slug}`} className="block h-full">
              <div className="glass-panel p-8 rounded-3xl h-full flex flex-col transition-all duration-300 group-hover:bg-zinc-900/40 group-hover:border-blue-500/30 overflow-hidden relative">

                {/* Decorative Gradient Blob */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />

                <div className="flex items-center gap-4 text-xs font-mono text-zinc-500 mb-6">
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 rounded-md border border-zinc-800">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-900/50 rounded-md border border-zinc-800 text-blue-400">
                    <Tag size={12} />
                    <span>{post.category}</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold mb-4 font-serif leading-tight group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm font-bold uppercase tracking-wider text-zinc-500 group-hover:text-white transition-colors mt-auto pt-6 border-t border-zinc-800/50">
                  <span>Read Article</span>
                  <ArrowUpRight size={16} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};