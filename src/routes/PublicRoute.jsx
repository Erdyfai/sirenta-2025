import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import LoadingSpinner from '../components/LoadingSpinner';

const PublicRoute = () => {
  const { authUser, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <LoadingSpinner />
    );
  }

  if (authUser && authUser.role) {
    switch (authUser.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'participant':
        return <Navigate to="/participant/dashboard" replace />;
      case 'jury':
        return <Navigate to="/juri/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
