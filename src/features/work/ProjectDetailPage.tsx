import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data/content';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const project = PROJECTS.find(p => p.slug === slug);

  if (!project) {
    return <Navigate to="/#work" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      {/* Header Image */}
      <div className="w-full h-[60vh] relative">
        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-12 left-6 md:left-24 max-w-7xl w-full">
           <Link to="/#work" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-6 text-sm uppercase tracking-widest">
             <ArrowLeft size={16} /> Back to Work
           </Link>
           <h1 className="text-5xl md:text-8xl font-serif font-bold">{project.title}</h1>
        </div>
      </div>

      <div className="px-6 py-24 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24 border-b border-zinc-800 pb-12">
           <div>
             <span className="block text-zinc-500 text-sm mb-2 font-mono">Role</span>
             <span className="text-lg">{project.role}</span>
           </div>
           <div>
             <span className="block text-zinc-500 text-sm mb-2 font-mono">Client</span>
             <span className="text-lg">{project.client}</span>
           </div>
           <div>
             <span className="block text-zinc-500 text-sm mb-2 font-mono">Year</span>
             <span className="text-lg">{project.year}</span>
           </div>
           <div>
             <span className="block text-zinc-500 text-sm mb-2 font-mono">Link</span>
             <a href={project.link} className="text-lg flex items-center gap-2 hover:text-blue-400 transition-colors">
               Live Site <ExternalLink size={16} />
             </a>
           </div>
        </div>

        <div className="space-y-24">
           <section>
             <h3 className="text-2xl font-bold mb-6 font-serif">The Challenge</h3>
             <p className="text-zinc-400 text-lg leading-relaxed">{project.challenges}</p>
           </section>

           <section>
             <h3 className="text-2xl font-bold mb-6 font-serif">The Solution</h3>
             <p className="text-zinc-400 text-lg leading-relaxed">{project.solution}</p>
           </section>

           <div className="w-full aspect-video bg-zinc-900 rounded-lg flex items-center justify-center text-zinc-700">
             [Additional Project Screenshot Placeholder]
           </div>
        </div>
      </div>
      
      {/* Next Project Nav */}
      <div className="px-6 py-24 bg-zinc-900/30 text-center">
         <p className="text-zinc-500 mb-4">Next Project</p>
         <h2 className="text-4xl font-serif font-bold hover:text-blue-500 cursor-pointer transition-colors">
           <Link to="/#work">View All Works</Link>
         </h2>
      </div>
    </motion.div>
  );
};