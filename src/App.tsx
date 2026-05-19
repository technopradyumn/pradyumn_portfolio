import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Layout } from './features/layout/Layout';
import { HomePage } from './features/home/HomePage';
import { ProjectDetailPage } from './features/work/ProjectDetailPage';
import { BlogPostPage } from './features/blog/BlogPostPage';
import { ServiceDetailPage } from './features/services/ServiceDetailPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/work" element={<Navigate to="/#work" replace />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/blog" element={<Navigate to="/#blog" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const ScrollController = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const updateProgress = () => {
      const bar = document.getElementById('scroll-progress');
      if (bar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
      }
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <ThemeProvider>
      <HashRouter>
        <ScrollController />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;