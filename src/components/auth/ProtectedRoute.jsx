import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/auth/AuthProvider';
import { useSubscription } from '@/lib/auth/useSubscription';
import PageSkeleton from '@/components/ui/loading-skeleton';

export default function ProtectedRoute({ children }) {
  const { user, loading: authLoading } = useAuth();
  const { isActive, isLoading: subLoading } = useSubscription();
  const location = useLocation();

  if (authLoading || (user && subLoading)) {
    return <PageSkeleton />;
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/Login?next=${next}`} replace />;
  }

  if (!isActive) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/Pricing?next=${next}`} replace />;
  }

  return children;
}
