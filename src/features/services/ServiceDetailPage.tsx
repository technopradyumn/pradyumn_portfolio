import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { SERVICES } from '../../data/content';

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const service = SERVICES.find(s => s.slug === slug);

  if (!service) {
    return <Navigate to="/#services" />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full"
    >
      <div className="px-6 py-24 max-w-4xl mx-auto">
        <Link to="/#services" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 text-sm uppercase tracking-widest">
           <ArrowLeft size={16} /> All Services
        </Link>
        
        <h1 className="text-5xl md:text-8xl font-serif font-bold mb-12">{service.title}</h1>
        
        <p className="text-xl md:text-2xl leading-relaxed text-zinc-300 mb-16">
          {service.fullDescription}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          <div>
            <h3 className="text-2xl font-bold mb-8 font-serif text-blue-400">Key Features</h3>
            <ul className="space-y-4">
              {service.features.map(feature => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="text-blue-500 mt-1 shrink-0" size={20} />
                  <span className="text-zinc-300 text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-zinc-900/30 p-8 rounded-2xl border border-zinc-800">
             <h3 className="text-2xl font-bold mb-6 font-serif">Why this matters</h3>
             <p className="text-zinc-400 leading-relaxed mb-6">
               In today's digital landscape, excellence in {service.title.toLowerCase()} is not just a luxury, it's a necessity. 
               Proper implementation ensures scalability, user retention, and long-term business growth.
             </p>
             <Link to="/#contact" className="inline-block bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors">
               Discuss your needs
             </Link>
          </div>
        </div>

        <section className="mb-24">
           <h2 className="text-4xl font-serif font-bold mb-12">My Process</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             {service.process.map((step, index) => (
               <div key={index} className="border-t border-zinc-800 pt-8">
                 <span className="text-zinc-500 font-mono text-sm mb-4 block">0{index + 1}</span>
                 <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                 <p className="text-zinc-400">{step.description}</p>
               </div>
             ))}
           </div>
        </section>

        <section className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Ready to start?</h2>
          <p className="text-zinc-400 mb-8 max-w-lg mx-auto">
            Let's collaborate to bring this vision to life. I'm currently accepting new projects for {new Date().getFullYear()}.
          </p>
          <Link to="/#contact" className="inline-block bg-blue-500 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors">
            Start a Project
          </Link>
        </section>
      </div>
    </motion.div>
  );
};