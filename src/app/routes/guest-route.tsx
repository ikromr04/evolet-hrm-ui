import { Navigate, Outlet } from 'react-router-dom';
import { JSX } from 'react';
import { useAppSelector } from '@/shared/store';
import { AuthStatus, getAuthStatus } from '@/entities/user';
import { ROUTES } from '@/shared/config';

function GuestRoute(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.AUTH) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}

export { GuestRoute };
