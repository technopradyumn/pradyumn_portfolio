import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ArrowUp } from 'lucide-react';
import { BackgroundCanvas } from '../../components/3d/BackgroundCanvas';
import { NAV_ITEMS, CONTENT } from '../../data/content';
import { useFourDMode } from '@/contexts/FourDModeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { is4DMode } = useFourDMode();

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.includes('#')) {
      const hashIndex = path.indexOf('#');
      const hash = path.substring(hashIndex + 1);
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

  if (is4DMode) return null;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white">
        <Link
          to="/"
          onClick={(e) => handleNavClick(e as any, '/')}
          className="text-2xl font-bold tracking-tighter uppercase font-serif"
        >
          Pradyumn<span className="text-zinc-500">.</span>
        </Link>
        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className="text-sm uppercase tracking-widest hover:text-blue-400 transition-colors text-zinc-400"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <button className="md:hidden z-50" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md z-40 flex flex-col justify-center items-center"
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
                  className="text-4xl font-serif font-light text-zinc-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-12 flex gap-4">
              {CONTENT.socials.map(social => (
                <a key={social.platform} href={social.url} target="_blank" rel="noreferrer" className="text-zinc-500 hover:text-white">
                  <social.icon size={24} />
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
  const { is4DMode } = useFourDMode();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (is4DMode) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 p-3 bg-white text-black rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const Footer = () => {
  const { is4DMode } = useFourDMode();

  if (is4DMode) return null;

  return (
    <footer className="w-full py-12 px-6 border-t border-zinc-900 bg-black/50 backdrop-blur-sm z-10 relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <h3 className="text-2xl font-serif font-bold mb-2">Let's work together</h3>
          <p className="text-zinc-500 text-sm max-w-md">Based in {CONTENT.contact.address}. Available for freelance worldwide.</p>
        </div>
        <div className="flex flex-col gap-4">
          <a href={`mailto:${CONTENT.contact.email}`} className="text-3xl md:text-5xl font-bold hover:text-blue-500 transition-colors duration-300">
            {CONTENT.contact.email}
          </a>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 flex justify-between items-end text-xs text-zinc-600 uppercase tracking-widest">
        <div>© {new Date().getFullYear()} Pradyumn Portfolio</div>
        <div className="flex gap-4">
          {CONTENT.socials.map((s) => (
            <a key={s.platform} href={s.url} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
              {s.platform} <ArrowUpRight size={10} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { is4DMode } = useFourDMode();

  return (
    <div className={`min-h-screen text-white relative selection:bg-blue-500 selection:text-white bg-transparent ${is4DMode ? 'pointer-events-none' : ''}`}>

      {/* Fallback/Overlay Gradient - Made transparent/subtle */}
      <div className="fixed inset-0 -z-20 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black"></div>

      {/* Navigation - Z-Index 50 */}
      <Navbar />

      {/* Main Content - Z-Index 10 ensures it sits above background */}
      {!is4DMode && (
        <main className="relative z-10 pt-24 min-h-screen flex flex-col">
          {children}
        </main>
      )}

      {/* 4D Mode Message removed */}

      <ScrollToTop />
      <Footer />
    </div>
  );
};