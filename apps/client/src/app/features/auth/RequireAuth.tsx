import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAppSelector } from '../../hooks/storeHooks';

interface Props {
  fallback: React.ReactNode;
  children: React.ReactNode;
}

const RequireAuth = ({ children, fallback }: Props): React.ReactNode => {
  const navigate = useNavigate();

  const {
    auth: { isAuthenticated },
  } = useAppSelector((state) => state);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return fallback;
  }

  return children;
};

export default RequireAuth;
