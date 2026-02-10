import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CONTENT } from '../../data/content';
import { MagneticButton } from '../../components/ui/MagneticButton';
import { HeroPhone } from '../../components/3d/HeroPhone';
import { WorkPage } from '../work/WorkPage';
import { ServicesPage } from '../services/ServicesPage';
import { AboutPage } from '../about/AboutPage';
import { BlogPage } from '../blog/BlogPage';
import { ContactPage } from '../contact/ContactPage';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.1 } }
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]); // Parallax effect for text

  return (
    <section id="home" className="min-h-[90vh] flex items-center px-6 max-w-7xl mx-auto w-full relative overflow-hidden md:overflow-visible">
      {/* 3D Phone Model */}
      <HeroPhone />
      
      <div className="flex flex-col justify-center w-full z-10 pt-20 md:pt-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          style={{ y }} // Apply parallax
        >
          <motion.span 
            variants={fadeInUp}
            className="text-blue-500 font-mono text-sm tracking-widest mb-6 block uppercase"
          >
            {CONTENT.hero.greeting}
          </motion.span>
          
          <div className="overflow-hidden mb-8">
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-8xl font-serif font-bold leading-[1.1] max-w-4xl"
            >
              Mobile App <br/> 
              <span className="text-zinc-500 italic relative">
                Developer
              </span>
            </motion.h1>
          </div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-zinc-400 max-w-lg text-lg mb-12 leading-relaxed backdrop-blur-sm md:backdrop-blur-0"
          >
            {CONTENT.hero.description}
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex gap-6 items-center"
          >
            <MagneticButton>
              <Link 
                to="/#work" 
                className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:bg-zinc-200 transition-colors"
                onClick={(e) => {
                    const el = document.getElementById('work');
                    if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
              >
                {CONTENT.hero.ctaPrimary} <ArrowRight size={16} />
              </Link>
            </MagneticButton>
            <Link 
                to="/#contact" 
                className="text-white uppercase tracking-wider text-sm border-b border-transparent hover:border-white transition-colors pb-1"
                onClick={(e) => {
                    const el = document.getElementById('contact');
                    if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
            >
              {CONTENT.hero.ctaSecondary}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export const HomePage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      
      <section id="work" className="border-t border-zinc-900/50">
        <WorkPage />
      </section>
      
      <section id="services" className="border-t border-zinc-900/50 bg-zinc-900/10">
        <ServicesPage />
      </section>
      
      <section id="about" className="border-t border-zinc-900/50">
        <AboutPage />
      </section>

      <section id="blog" className="border-t border-zinc-900/50 bg-zinc-900/10">
        <BlogPage />
      </section>

      <section id="contact" className="border-t border-zinc-900/50">
        <ContactPage />
      </section>
    </motion.div>
  );
};