import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const AuthGuard = ({ children }) => {
  const { token, loading } = useAuth();


  if(loading) { 
    return <div>Loading...</div>;
  }

  if (!token) {
   return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;