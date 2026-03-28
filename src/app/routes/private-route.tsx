import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store';
import { AuthStatus, getAuthStatus } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { JSX } from 'react';

function PrivateRoute(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.NO_AUTH) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export { PrivateRoute };
