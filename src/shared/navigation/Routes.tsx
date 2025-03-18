import React, { useEffect } from 'react';
import { Routes as Switch, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../constants/ROUTES';
import { private_routes, public_routes } from './route_items';
import { PrivateRoute } from './PrivateRoutes';
import { PublicRoute } from './PublicRoutes';

export const Routes = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={ROUTES.ROOT} element={<Navigate to={ROUTES.DASHBOARD} />} />
        {public_routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <PublicRoute>
                <React.Suspense>{route.element}</React.Suspense>
              </PublicRoute>
            }
          />
        ))}
        {private_routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <PrivateRoute acceptedRoles={route.acceptedRoles}>
                <React.Suspense>{route.element}</React.Suspense>
              </PrivateRoute>
            }
          />
        ))}
      </Switch>
    </React.Fragment>
  );
};
