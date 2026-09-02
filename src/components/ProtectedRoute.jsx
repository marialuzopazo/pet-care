import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/storage';

export default function ProtectedRoute({ children }) {
  return getSession() ? children : <Navigate to="/" replace />;
}
