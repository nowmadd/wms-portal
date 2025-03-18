import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../constants/ROUTES';
import Layout from '../components/Layout/Layout';
import { ls } from '../utils/ls';

interface PrivateRouteProps {
  children: React.ReactNode;
  acceptedRoles: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, acceptedRoles }) => {
  const { isAuthenticated } = useAuth();
  const { getLS } = ls();
  const user = getLS('user');
  const userRole = user ? JSON.parse(user).role : null;

  return isAuthenticated ? (
    !acceptedRoles.includes(userRole) ? (
      <Navigate to={ROUTES.DASHBOARD} />
    ) : (
      <Layout>{children}</Layout>
    )
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};
