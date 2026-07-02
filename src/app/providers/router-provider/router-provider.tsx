import { useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect } from 'react';
import { PageLoader } from '@/shared/ui';
import { AuthStatus, checkAuthAction, getAuthStatus } from '@/features/auth';
import { RouterProvider as Provider } from 'react-router-dom';
import { router } from './router';

function RouterProvider(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authStatus === AuthStatus.UNKNOWN) {
    return <PageLoader />;
  }

  return <Provider router={router} />;
};

export { RouterProvider };
