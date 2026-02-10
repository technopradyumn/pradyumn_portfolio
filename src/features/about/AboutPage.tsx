import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';

export const AboutPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 py-24 max-w-7xl mx-auto w-full"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-7xl md:text-9xl font-serif font-bold mb-16 tracking-tighter"
      >
        About<span className="text-blue-500">.</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bio Section - Large Block */}
        <div className="md:col-span-2 glass-panel p-10 rounded-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <span className="w-2 h-8 bg-blue-500 rounded-full" />
            Who I Am
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed text-zinc-300">
            {CONTENT.about.bio}
          </p>
        </div>

        {/* Portrait Block */}
        <div className="md:col-span-1 glass-panel p-4 rounded-3xl flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-colors duration-500" />
          <img
            src="https://picsum.photos/800/800"
            alt="Portrait"
            className="w-full h-full object-cover rounded-2xl grayscale-0 transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Experience Section - Vertical Timeline */}
        <div className="md:col-span-3 glass-panel p-10 rounded-3xl">
          <h2 className="text-2xl font-bold mb-12 flex items-center gap-3">
            <span className="w-2 h-8 bg-purple-500 rounded-full" />
            Experience
          </h2>

          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 transform md:-translate-x-1/2 ml-4 md:ml-0" />

            <div className="space-y-12">
              {CONTENT.about.experience.map((exp, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full border-4 border-zinc-950 bg-purple-500 transform -translate-x-1/2 md:-translate-x-1/2 mt-1.5 z-10 ml-4 md:ml-0 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />

                  {/* Content Card */}
                  <div className="ml-12 md:ml-0 md:w-1/2">
                    <div className={`p-6 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl hover:bg-zinc-800/60 hover:border-purple-500/30 transition-all duration-300 group ${i % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <span className="inline-block px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-mono rounded-full mb-3 border border-purple-500/20">
                        {exp.year}
                      </span>
                      <h4 className="text-xl font-bold mb-1 text-zinc-100 group-hover:text-white transition-colors">
                        {exp.role}
                      </h4>
                      <span className="text-zinc-400 text-sm font-medium">
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  {/* Empty space for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tech Stack - Wide Block */}
        <div className="md:col-span-3 glass-panel p-10 rounded-3xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-blue-900/10 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <span className="w-2 h-8 bg-emerald-500 rounded-full" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-3">
            {CONTENT.about.skills.map(skill => (
              <span key={skill} className="px-4 py-2 bg-zinc-950/50 backdrop-blur-md rounded-lg border border-zinc-800 text-zinc-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 cursor-default font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};