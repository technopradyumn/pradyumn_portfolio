import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { NeuralBackground } from '../../components/ui/NeuralBackground';
import { ThemeToggle } from '../../components/ui/ThemeToggle';
import { NAV_ITEMS, CONTENT } from '../../data/content';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.includes('#')) {
      const hash = path.substring(path.indexOf('#') + 1);
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/#${hash}`);
        }
      }
    } else if (path === '/') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/#/');
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 px-6 py-3 flex justify-between items-center transition-all duration-500`}
        style={{
          backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        }}
      >
        <Link
          to="/"
          onClick={(e) => handleNavClick(e as any, '/')}
          className="text-xl font-bold tracking-tight font-heading flex items-center gap-0.5"
          style={{ color: 'var(--text-primary)' }}
        >
          <span>Pradyumn</span>
          <span className="gradient-text text-2xl">.</span>
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className="text-xs uppercase tracking-widest hover:text-accent-cyan transition-colors duration-300 font-medium"
              style={{ color: 'var(--text-muted)' }}
            >
              {item.label}
            </Link>
          ))}

          <ThemeToggle />

          <a
            href={`mailto:${CONTENT.contact.email}`}
            className="ml-1 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan/10 transition-all duration-300"
          >
            Hire Me
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <ThemeToggle />
          <button className="z-50 p-2" onClick={() => setIsOpen(!isOpen)} style={{ color: 'var(--text-primary)' }}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.98 }}
          >
            <div className="flex flex-col gap-8 text-center">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={(e) => {
                    handleNavClick(e, item.path);
                    setIsOpen(false);
                  }}
                  className="text-4xl font-heading font-light hover:text-accent-cyan transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-12 flex gap-4">
              {CONTENT.socials.map(social => (
                <a key={social.platform} href={social.url} target="_blank" rel="noreferrer"
                  className="hover:text-accent-cyan transition-colors p-3 rounded-full border hover:border-accent-cyan/30"
                  style={{ color: 'var(--text-muted)', borderColor: 'var(--border-color)' }}>
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 500);
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-accent-cyan/10 border border-accent-cyan/30 text-accent-cyan hover:bg-accent-cyan hover:text-white transition-all duration-300 cursor-pointer backdrop-blur-md"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  return (
    <footer className="w-full py-16 px-6 z-10 relative" style={{ borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Let's build something <span className="gradient-text">intelligent</span>
          </h3>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-muted)' }}>
            Based in {CONTENT.contact.address}. Available for AI engineering projects worldwide.
          </p>
        </div>
        <div>
          <a href={`mailto:${CONTENT.contact.email}`} className="text-2xl md:text-3xl font-bold font-heading hover:text-accent-cyan transition-colors duration-300" style={{ color: 'var(--text-primary)' }}>
            {CONTENT.contact.email}
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
        <div>© {new Date().getFullYear()} Pradyumn — Gen AI Engineer</div>
        <div className="flex gap-6">
          {CONTENT.socials.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="hover:text-accent-cyan flex items-center gap-1 transition-colors">
              {s.platform} <ArrowUpRight size={10} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen relative" style={{ color: 'var(--text-primary)', backgroundColor: 'var(--bg-primary)' }}>
      <NeuralBackground />
      <Navbar />
      <main className="relative z-10 pt-16 min-h-screen flex flex-col">
        {children}
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  );
};