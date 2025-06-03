import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRoutes from './route';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './stores/useAuthStore';
import LoadingSpinner from './components/LoadingSpinner';

function Root() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    <LoadingSpinner />
  }

  return <AppRoutes />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Root />
      <Toaster position="top-center" reverseOrder={false} />
    </BrowserRouter>
  </StrictMode>
);
