import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Terminal, Cpu, Workflow, BrainCircuit, Database, Zap, GitBranch, MessageSquare, Search, Shield } from 'lucide-react';
import { CONTENT } from '../../data/content';
import { MagneticButton } from '../../components/ui/MagneticButton';
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
  visible: { transition: { staggerChildren: 0.12 } }
};

const TypingEffect = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = CONTENT.hero.roles;

  useEffect(() => {
    const role = roles[currentRole];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, currentRole, roles]);

  return (
    <span className="gradient-text">
      {displayed}
      <span className="animate-pulse text-accent-cyan">|</span>
    </span>
  );
};

const StatCard = ({ label, value, suffix, index }: { label: string; value: string; suffix?: string; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    className="glass-panel rounded-2xl p-6 text-center card-glow group"
  >
    <div className="text-3xl md:text-4xl font-bold font-heading group-hover:text-accent-cyan transition-colors" style={{ color: 'var(--text-primary)' }}>
      {value}<span className="text-accent-cyan">{suffix}</span>
    </div>
    <div className="text-sm mt-2 uppercase tracking-wider font-medium" style={{ color: 'var(--text-muted)' }}>{label}</div>
  </motion.div>
);

// Deep agentic architecture — DocuMind AI system design
const AgentWorkflowDiagram = () => {
  const nodeStyle = "flex items-center gap-2 px-2.5 py-1.5 rounded-lg cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:border hover:border-accent-cyan/30";
  const branchStyle = "rounded-lg p-2 border cursor-pointer transition-all duration-200 hover:scale-[1.04]";

  const NodeRow = ({ icon: Icon, label, status, color, statusColor, delay, sub }: any) => (
    <motion.div initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.4 }}>
      <div className={nodeStyle} style={{ backgroundColor: 'var(--code-bg)' }}>
        <Icon size={12} className={color} strokeWidth={1.8} />
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-mono truncate" style={{ color: 'var(--text-secondary)' }}>{label}</div>
          {sub && <div className="text-[8px] font-mono truncate" style={{ color: 'var(--text-muted)' }}>{sub}</div>}
        </div>
        <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity, delay: delay * 0.5 }} className={`text-[8px] font-mono ${statusColor} whitespace-nowrap`}>
          {status}
        </motion.div>
      </div>
    </motion.div>
  );

  const Connector = ({ delay = 0 }: { delay?: number }) => (
    <div className="flex items-center justify-center py-0.5">
      <motion.div animate={{ opacity: [0.15, 0.5, 0.15], scaleY: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity, delay }} className="w-px h-2" style={{ backgroundColor: 'var(--text-muted)' }} />
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 1 }} className="hidden lg:flex flex-col gap-1.5 w-[400px] shrink-0">

      {/* Header — DocuMind AI project context */}
      <div className="glass-panel rounded-xl p-3 cursor-pointer transition-all duration-200 hover:scale-[1.01]">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-accent-cyan">DocuMind AI · System Architecture</span>
          </div>
          <div className="flex gap-1">{['bg-accent-emerald','bg-yellow-400','bg-accent-cyan'].map((c,i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${c}`} />)}</div>
        </div>
        <div className="flex gap-2 text-[8px] font-mono flex-wrap" style={{ color: 'var(--text-muted)' }}>
          <span>LangGraph</span><span>·</span><span>FastAPI</span><span>·</span><span>Qdrant</span><span>·</span><span>Redis RQ</span><span>·</span><span>React</span><span>·</span><span className="text-accent-emerald">14 nodes · 3 cycles</span>
        </div>
      </div>

      {/* Layer 0: API Gateway */}
      <div className="glass-panel rounded-xl p-2.5">
        <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2.5 h-px bg-accent-cyan" /><span>Gateway</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <NodeRow icon={MessageSquare} label="POST /api/query · PDF Upload" sub="FastAPI + JWT auth" status="200 OK" color="text-accent-cyan" statusColor="text-accent-emerald" delay={1.1} />
      </div>

      {/* Layer 1: Orchestrator */}
      <div className="glass-panel rounded-xl p-2.5">
        <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2.5 h-px bg-accent-violet" /><span>Layer 1 · LangGraph Orchestrator</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="space-y-0.5">
          <NodeRow icon={Search} label="Intent Classifier + Query Planner" sub="classify → single-doc / multi-doc / summarize" status="parsed" color="text-yellow-400" statusColor="text-yellow-400" delay={1.25} />
          <Connector delay={0.1} />
          <NodeRow icon={BrainCircuit} label="State Machine Router" sub="conditional edges → agent selection" status="routing" color="text-accent-violet" statusColor="text-accent-violet" delay={1.4} />
        </div>
      </div>

      {/* Layer 2: Parallel Agents */}
      <div className="glass-panel rounded-xl p-2.5">
        <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2.5 h-px bg-accent-emerald" /><span>Layer 2 · Multi-Agent Execution</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="grid grid-cols-3 gap-1">
          {[
            { title: 'RAG Agent', color: 'text-accent-emerald', hoverBorder: 'hover:border-emerald-400/40', steps: ['Chunk PDFs', 'Embed → Qdrant', 'Semantic Search', 'Re-rank Top-K'] },
            { title: 'ReAct Agent', color: 'text-accent-violet', hoverBorder: 'hover:border-violet-400/40', steps: ['Reason Step', 'Plan Action', 'Execute Tool', 'Self-Correct'] },
            { title: 'Summary Agent', color: 'text-orange-400', hoverBorder: 'hover:border-orange-400/40', steps: ['Extract Key Info', 'Cross-Doc Merge', 'Compress Context', 'Format Output'] },
          ].map((branch, bi) => (
            <motion.div key={branch.title} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.6 + bi * 0.15 }}
              className={`${branchStyle} ${branch.hoverBorder}`}
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--code-bg)' }}>
              <div className={`text-[7px] font-mono font-bold ${branch.color} mb-1 text-center uppercase tracking-wider`}>{branch.title}</div>
              {branch.steps.map((s, i) => (
                <div key={s} className="text-[7px] font-mono py-0.5 text-center leading-tight" style={{ color: 'var(--text-muted)' }}>
                  {i > 0 && <div className={`text-[6px] ${branch.color} opacity-40 leading-none`}>↓</div>}
                  {s}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} className="flex items-center gap-2 mt-1.5 px-1">
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} /><span className="text-[7px] font-mono text-accent-violet">↓ merge agent outputs</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </motion.div>
      </div>

      {/* Layer 3: Async Infra */}
      <div className="glass-panel rounded-xl p-2.5">
        <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2.5 h-px bg-pink-400" /><span>Layer 3 · Async Infrastructure</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="grid grid-cols-2 gap-1">
          <NodeRow icon={Database} label="Redis RQ Workers" sub="async inference queue" status="3 jobs" color="text-pink-400" statusColor="text-pink-400" delay={2.2} />
          <NodeRow icon={Cpu} label="Checkpoint Store" sub="LangGraph state persist" status="saved" color="text-accent-violet" statusColor="text-accent-emerald" delay={2.35} />
        </div>
      </div>

      {/* Layer 4: Generation + Output */}
      <div className="glass-panel rounded-xl p-2.5">
        <div className="text-[8px] font-mono uppercase tracking-widest mb-1.5 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <div className="w-2.5 h-px bg-accent-cyan" /><span>Layer 4 · Generation & Delivery</span><div className="flex-1 h-px" style={{ backgroundColor: 'var(--border-color)' }} />
        </div>
        <div className="space-y-0.5">
          <NodeRow icon={BrainCircuit} label="Gemini Pro → Generate Answer" sub="grounded in retrieved context" status="generating" color="text-accent-violet" statusColor="text-accent-violet" delay={2.5} />
          <Connector delay={0.6} />
          <NodeRow icon={Shield} label="Hallucination Check + Citations" sub="fact-verify against source chunks" status="✓ verified" color="text-red-400" statusColor="text-accent-emerald" delay={2.65} />
          <Connector delay={0.8} />
          <NodeRow icon={Zap} label="SSE Stream → React Frontend" sub="token-by-token + source refs" status="streaming" color="text-accent-cyan" statusColor="text-accent-emerald" delay={2.8} />
        </div>
      </div>

      {/* Self-correction loop */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }} className="glass-panel rounded-xl px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-all duration-200 hover:scale-[1.02]">
        <Workflow size={10} className="text-accent-violet shrink-0" />
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} className="w-2 h-2 rounded-full border border-accent-violet/40 border-t-accent-violet" />
        <span className="text-[8px] font-mono" style={{ color: 'var(--text-muted)' }}>Self-correction cycle · re-query if relevance &lt; 0.7</span>
      </motion.div>

      {/* Telemetry */}
      <div className="glass-panel rounded-xl px-3 py-1.5 flex justify-between text-[8px] font-mono cursor-pointer transition-all duration-200 hover:scale-[1.02]" style={{ color: 'var(--text-muted)' }}>
        <span>P95: <span className="text-accent-emerald">142ms</span></span>
        <span>Chunks: <span className="text-accent-violet">2,048</span></span>
        <span>Accuracy: <span className="text-accent-cyan">95%+</span></span>
        <span>Cost: <span className="text-yellow-400">$0.003</span></span>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center px-6 max-w-7xl mx-auto w-full relative">
      <div className="flex items-center justify-between gap-8 w-full py-24 md:py-0">
        {/* Left content */}
        <motion.div
          className="flex flex-col justify-center z-10 flex-1 min-w-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            {/* Status badge */}
            <motion.div variants={fadeInUp} className="mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-mono border border-accent-emerald/20 bg-accent-emerald/5 text-accent-emerald">
                <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse"></span>
                Available for Projects
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.span variants={fadeInUp} className="text-accent-cyan font-mono text-sm tracking-widest mb-6 block uppercase">
              {CONTENT.hero.greeting}
            </motion.span>

            {/* Main Title — single line, responsive sizing */}
            <div className="mb-8">
              <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-none whitespace-nowrap">
                <TypingEffect />
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="max-w-xl text-lg md:text-xl mb-6 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {CONTENT.hero.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p variants={fadeInUp} className="max-w-lg text-base mb-12 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {CONTENT.hero.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 items-center">
              <MagneticButton>
                <Link
                  to="/#work"
                  className="group inline-flex items-center gap-3 bg-accent-cyan text-black px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-300"
                  onClick={(e) => {
                    const el = document.getElementById('work');
                    if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                  }}
                >
                  <Sparkles size={16} />
                  {CONTENT.hero.ctaPrimary}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <Link
                to="/#contact"
                className="uppercase tracking-wider text-sm px-8 py-4 rounded-full font-bold transition-all duration-300 border hover:border-accent-violet/50 hover:text-accent-violet"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}
                onClick={(e) => {
                  const el = document.getElementById('contact');
                  if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth' }); }
                }}
              >
                {CONTENT.hero.ctaSecondary}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: Agent Workflow Diagram */}
        <AgentWorkflowDiagram />
      </div>

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none" style={{ backgroundColor: 'rgba(6,182,212,0.05)' }}></div>
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: 'rgba(139,92,246,0.05)' }}></div>
    </section>
  );
};

const StatsSection = () => (
  <section className="px-6 py-16 max-w-7xl mx-auto w-full">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {CONTENT.stats.map((stat, i) => (
        <StatCard key={stat.label} {...stat} index={i} />
      ))}
    </div>
  </section>
);

export const HomePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <Hero />
      <StatsSection />

      <section id="work" style={{ borderTop: '1px solid var(--border-color)' }}>
        <WorkPage />
      </section>

      <section id="services" style={{ borderTop: '1px solid var(--border-color)' }}>
        <ServicesPage />
      </section>

      <section id="about" style={{ borderTop: '1px solid var(--border-color)' }}>
        <AboutPage />
      </section>

      <section id="blog" style={{ borderTop: '1px solid var(--border-color)' }}>
        <BlogPage />
      </section>

      <section id="contact" style={{ borderTop: '1px solid var(--border-color)' }}>
        <ContactPage />
      </section>
    </motion.div>
  );
};