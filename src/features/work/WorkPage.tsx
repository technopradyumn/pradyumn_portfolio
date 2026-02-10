import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../../data/content';
import { TiltCard } from '../../components/ui/TiltCard';
import { Project } from '../../types';

const textVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

const containerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const ProjectItem: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Refined Spring Physics for "Heavy" smooth feel
  const springConfig = { stiffness: 60, damping: 20, mass: 1 };

  // Image Parallax - moves opposite to scroll
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const springY = useSpring(y, springConfig);

  // Text Parallax - moves slightly less for depth perception
  const textY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const springTextY = useSpring(textY, springConfig);

  // Entrance Scale & Opacity
  const rawScale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const scale = useSpring(rawScale, springConfig);

  const rawOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const opacity = useSpring(rawOpacity, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className={`flex flex-col md:flex-row gap-12 md:gap-24 items-center w-full ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
    >
      {/* Image Side */}
      <Link to={`/work/${project.slug}`} className="w-full md:w-3/5 block z-10 group/image perspective-1000">
        <motion.div style={{ y: springY, scale }} className="w-full">
          <TiltCard className="w-full">
            <div className="overflow-hidden rounded-2xl group relative aspect-video shadow-2xl shadow-blue-900/10 glass-panel">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 will-change-transform"
                loading="lazy"
              />


              {/* Hover Overlay Removed for clarity */}
            </div>
          </TiltCard>
        </motion.div>
      </Link>

      {/* Text Side */}
      <motion.div
        style={{ y: springTextY }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-20%" }}
        variants={containerVariants}
        className="w-full md:w-2/5 flex flex-col gap-6 z-0"
      >
        <motion.div variants={textVariants} className="flex items-center gap-4">
          <span className="text-blue-500 font-mono text-sm bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">{project.year}</span>
          <span className="h-px w-8 bg-zinc-800"></span>
          <span className="text-zinc-500 font-mono text-sm uppercase tracking-wider">{project.client}</span>
        </motion.div>

        <motion.div variants={textVariants}>
          <Link to={`/work/${project.slug}`} className="block group/title">
            <h2 className="text-4xl md:text-6xl font-bold font-serif mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 leading-[1.1] group-hover/title:text-blue-400 transition-colors duration-300">
              {project.title}
            </h2>
          </Link>
          <p className="text-zinc-400 leading-relaxed text-lg border-l-2 border-zinc-800 pl-6">
            {project.fullDescription}
          </p>
        </motion.div>

        <motion.div variants={textVariants} className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag, i) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1, y: -2, transition: { duration: 0.2 } }}
              className="text-xs text-zinc-400 border border-zinc-800 px-3 py-1.5 rounded-full hover:border-blue-500/50 hover:text-blue-400 transition-colors cursor-default bg-zinc-900/50 backdrop-blur-sm"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div variants={textVariants}>
          <Link to={`/work/${project.slug}`} className="group inline-flex items-center gap-2 text-white font-bold hover:text-blue-400 transition-colors mt-2 text-lg">
            View Case Study
            <span className="w-12 h-px bg-white group-hover:bg-blue-400 transition-all duration-300 group-hover:w-20"></span>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const WorkPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-24 max-w-7xl mx-auto w-full overflow-hidden"
    >
      <div className="mb-40 mt-12">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-serif font-bold mb-8 tracking-tighter"
        >
          Work<span className="text-blue-500">.</span>
        </motion.h1>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-1 bg-zinc-800 mb-8"
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-400 text-xl max-w-2xl leading-relaxed"
        >
          A curated collection of projects exploring the boundaries of interaction, design, and performance.
          Each piece represents a unique challenge solved through code.
        </motion.p>
      </div>

      <div className="flex flex-col gap-48 pb-24">
        {PROJECTS.map((project, index) => (
          <ProjectItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};