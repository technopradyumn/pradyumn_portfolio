import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../../data/content';

export const BlogPostPage = () => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/#blog" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="w-full h-[50vh] relative">
         <img src={post.imageUrl || 'https://picsum.photos/1200/600'} alt={post.title} className="w-full h-full object-cover" />
         <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
         <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-center">
            <span className="text-blue-400 font-mono text-sm tracking-widest uppercase mb-4">{post.category}</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold max-w-4xl mb-6">{post.title}</h1>
            <div className="flex gap-6 text-zinc-400 text-sm">
               <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
               <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
            </div>
         </div>
      </div>

      <div className="px-6 py-16 max-w-3xl mx-auto">
        <Link to="/#blog" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-12 text-sm">
           <ArrowLeft size={16} /> Back to Articles
        </Link>
        
        <div 
          className="prose prose-invert prose-lg max-w-none text-zinc-300"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-24 pt-12 border-t border-zinc-800">
           <h3 className="text-2xl font-serif font-bold mb-8">Read Next</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 2).map(p => (
                 <Link key={p.id} to={`/blog/${p.slug}`} className="group block">
                    <h4 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{p.title}</h4>
                    <p className="text-zinc-500 text-sm line-clamp-2">{p.excerpt}</p>
                 </Link>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};