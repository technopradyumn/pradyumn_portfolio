import { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './features/layout/Layout';
import { HomePage } from './features/home/HomePage';
import { ProjectDetailPage } from './features/work/ProjectDetailPage';
import { BlogPostPage } from './features/blog/BlogPostPage';
import { ServiceDetailPage } from './features/services/ServiceDetailPage';
import { WorkPage } from './features/work/WorkPage';
import { ServicesPage } from './features/services/ServicesPage';
import { AboutPage } from './features/about/AboutPage';
import { ContactPage } from './features/contact/ContactPage';
import { BlogPage } from './features/blog/BlogPage';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />

        {/* Detail Routes */}
        <Route path="/work/:slug" element={<ProjectDetailPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* Section Routes - Redirect to Home with Hash */}
        <Route path="/work" element={<Navigate to="/#work" replace />} />
        <Route path="/services" element={<Navigate to="/#services" replace />} />
        <Route path="/blog" element={<Navigate to="/#blog" replace />} />
        <Route path="/about" element={<Navigate to="/#about" replace />} />
        <Route path="/contact" element={<Navigate to="/#contact" replace />} />

        {/* Default Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

const ScrollController = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import { GlobalCanvas } from '@/components/3d/GlobalCanvas';
import { FourDModeProvider } from '@/contexts/FourDModeContext';
import { FourDToggleButton } from '@/components/ui/FourDToggleButton';

// ... (existing imports)

function App() {
  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <FourDModeProvider>
      <HashRouter>
        <ScrollController />
        <GlobalCanvas />
        <Layout>
          <AnimatedRoutes />
        </Layout>
        <FourDToggleButton />
      </HashRouter>
    </FourDModeProvider>
  );
}

export default App;