import { motion } from 'framer-motion';
import { CONTENT } from '../../data/content';

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>{name}</span>
      <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{level}%</span>
    </div>
    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'var(--bg-elevated)' }}>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-full rounded-full bg-gradient-to-r from-accent-cyan to-accent-violet"
      />
    </div>
  </motion.div>
);

export const AboutPage = () => {
  const aiSkills = CONTENT.about.skills.filter(s => s.category === 'AI/Backend');
  const mobileSkills = CONTENT.about.skills.filter(s => s.category === 'Mobile');
  const dataSkills = CONTENT.about.skills.filter(s => s.category === 'Data');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="px-6 py-24 max-w-7xl mx-auto w-full">
      <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-6xl md:text-8xl font-heading font-bold mb-16 tracking-tight" style={{ color: 'var(--text-primary)' }}>
        About<span className="gradient-text">.</span>
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bio */}
        <div className="md:col-span-2 glass-panel p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 font-heading" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-8 bg-accent-cyan rounded-full" />
            Who I Am
          </h2>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {CONTENT.about.bio}
          </p>
        </div>

        {/* Profile Card */}
        <div className="md:col-span-1 glass-panel p-6 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group text-center">
          <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-accent-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 flex items-center justify-center mb-4 relative z-10" style={{ border: '2px solid var(--border-color)' }}>
            <span className="text-5xl font-heading font-bold gradient-text">P</span>
          </div>
          <h3 className="text-xl font-bold font-heading relative z-10" style={{ color: 'var(--text-primary)' }}>Pradyumn</h3>
          <p className="text-sm font-mono mt-1 relative z-10" style={{ color: 'var(--text-muted)' }}>Gen AI Engineer</p>
          <div className="flex gap-3 mt-4 relative z-10">
            {CONTENT.socials.map(s => (
              <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="p-2 rounded-full border hover:text-accent-cyan hover:border-accent-cyan/30 transition-all" style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="md:col-span-3 glass-panel p-10 rounded-2xl">
          <h2 className="text-2xl font-bold mb-10 flex items-center gap-3 font-heading" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-8 bg-accent-violet rounded-full" />
            Experience
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-1/2" style={{ backgroundColor: 'var(--border-color)' }} />
            <div className="space-y-10">
              {CONTENT.about.experience.map((exp, i) => (
                <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full border-2 bg-accent-violet -translate-x-1/2 mt-2 z-10 shadow-[0_0_10px_rgba(139,92,246,0.4)]" style={{ borderColor: 'var(--bg-primary)' }} />
                  <div className="ml-10 md:ml-0 md:w-1/2">
                    <div className={`p-6 glass-panel rounded-xl card-glow group ${i % 2 === 0 ? 'md:ml-8' : 'md:mr-8'}`}>
                      <span className="inline-block px-3 py-1 bg-accent-violet/10 text-accent-violet text-xs font-mono rounded-full mb-3 border border-accent-violet/20">
                        {exp.year}
                      </span>
                      <h4 className="text-lg font-bold mb-1 font-heading group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>
                        {exp.role}
                      </h4>
                      <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{exp.company}</span>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI/Backend Skills */}
        <div className="md:col-span-2 glass-panel p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent-cyan/5 to-transparent pointer-events-none" />
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 font-heading" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-8 bg-accent-cyan rounded-full" />
            AI & Backend Skills
          </h2>
          <div className="space-y-5">
            {aiSkills.map((skill, i) => <SkillBar key={skill.name} {...skill} index={i} />)}
          </div>
        </div>

        {/* Mobile & Data */}
        <div className="md:col-span-1 glass-panel p-10 rounded-2xl relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-accent-violet/5 to-transparent pointer-events-none" />
          <h2 className="text-xl font-bold mb-6 flex items-center gap-3 font-heading" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-6 bg-accent-violet rounded-full" />
            Mobile & Data
          </h2>
          <div className="space-y-5">
            {[...mobileSkills, ...dataSkills].map((skill, i) => <SkillBar key={skill.name} {...skill} index={i} />)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};