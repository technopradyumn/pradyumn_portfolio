import React, { ErrorInfo, ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App';

class ErrorBoundary extends React.Component<{ children: ReactNode }, { hasError: boolean; error: Error | null }> {
  state = { hasError: false, error: null };

  constructor(props: { children: ReactNode }) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          backgroundColor: '#050505', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
          color: '#f0f0f5'
        }}>
          <h1 style={{ color: '#06b6d4', fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong.</h1>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>{this.state.error?.message}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '0.75rem 2rem', 
              cursor: 'pointer', 
              background: '#06b6d4', 
              color: '#050505', 
              border: 'none',
              borderRadius: '9999px',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return (this.props as any).children;
  }
}

if (window.location.hash && window.location.hash !== '#/') {
  window.history.replaceState(null, '', '/#/');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);