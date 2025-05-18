import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function RequireAuth({ children, allowedRoles }) {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/not-authorized" />;
  }

  return children;
}