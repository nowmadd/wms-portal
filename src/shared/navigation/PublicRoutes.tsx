import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/ROUTES';
import { useAuth } from '../hooks/useAuth';

export const PublicRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return !isAuthenticated ? <>{children}</> : <Navigate to={ROUTES.DASHBOARD} />;
};
