import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store';
import { ROUTES } from '@/shared/config';
import { JSX } from 'react';
import { AuthStatus, getAuthStatus } from '@/features/auth';

function PrivateRouter(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.NO_AUTH) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <Outlet />;
}

export { PrivateRouter };
