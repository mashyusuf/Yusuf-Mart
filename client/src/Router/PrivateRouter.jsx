import React, { useContext } from 'react';
import { authContext } from '../providers/AuthProviders';
import Loading from '../hooks/Loading';
import { Navigate, useLocation } from 'react-router-dom';

export default function PrivateRouter({ children }) {
  const { user, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace={true} />;
}
