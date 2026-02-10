import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Code, Bot, Database } from 'lucide-react';
import { SERVICES } from '../../data/content';
import { Mobile3D } from '../../components/3d/Mobile3D';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 50,
      damping: 15,
      mass: 1
    }
  }
};

// Map string icons to components
const IconMap: Record<string, any> = {
  'smartphone': Smartphone,
  'code': Code,
  'bot': Bot,
  'database': Database
};

export const ServicesPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-24 max-w-7xl mx-auto w-full relative"
    >
      <div className="absolute top-0 right-0 w-full lg:w-1/3 h-[300px] lg:h-[600px] z-0">
        <Mobile3D />
      </div>
      <div className="mb-24 mt-12 relative z-10">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-7xl md:text-9xl font-serif font-bold mb-8 tracking-tighter"
        >
          Services<span className="text-blue-500">.</span>
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
          Comprehensive digital solutions tailored to your unique business challenges.
          From initial concept to final deployment, I handle the full lifecycle.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-24"
      >
        {SERVICES.map((service, index) => {
          const Icon = IconMap[service.icon] || Code;

          return (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -12, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative glass-panel p-8 rounded-2xl hover:bg-zinc-900/40 transition-colors flex flex-col h-full overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <Link to={`/services/${service.slug}`} className="block h-full relative z-10 flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <div className="p-4 bg-zinc-800/50 rounded-2xl text-zinc-300 group-hover:text-blue-400 group-hover:bg-blue-500/20 transition-all duration-300 transform group-hover:scale-110 origin-top-left">
                    <Icon size={32} strokeWidth={1.5} />
                  </div>
                  <span className="font-mono text-zinc-600 text-sm group-hover:text-zinc-400 transition-colors">
                    0{index + 1}
                  </span>
                </div>

                <h3 className="text-3xl font-bold mb-4 font-serif group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-zinc-400 mb-8 line-clamp-3 leading-relaxed group-hover:text-zinc-300 transition-colors">
                  {service.description}
                </p>

                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.features.slice(0, 3).map(f => (
                      <span key={f} className="text-xs text-zinc-500 border border-zinc-800/50 px-2 py-1 rounded bg-zinc-950/30">
                        {f}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-500 group-hover:text-white transition-colors">
                    Learn More
                    <ArrowRight className="w-4 h-4 transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};