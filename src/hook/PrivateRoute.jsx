import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '../stores/useAuthStore';
import LoadingSpinner from '../components/LoadingSpinner';

export default function PrivateRoute({ allowedRoles }) {
  const {
    authUser,
    isCheckingAuth,
    checkAuth,
  } = useAuthStore();

  const location = useLocation();
  const hasChecked = useRef(false); // hanya jalankan sekali saat load pertama

  useEffect(() => {
    if (!authUser && !hasChecked.current) {
      hasChecked.current = true;
      checkAuth();
    }
  }, [authUser, checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  if (!authUser && !hasChecked.current) {
    return null; // Tunggu checkAuth
  }

  if (!authUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(authUser.role)) {
    return <Navigate to="/error404" replace />;
  }

  return <Outlet />;
}
