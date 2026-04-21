import { Navigate, Outlet } from 'react-router-dom';
import { JSX } from 'react';
import { useAppSelector } from '@/shared/store';
import { ROUTES } from '@/shared/config';
import { AuthStatus, getAuthStatus } from '@/features/auth';

function GuestRoute(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.AUTH) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}

export { GuestRoute };
