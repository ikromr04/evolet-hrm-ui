import { AuthStatus, checkAuthAction, getAuthStatus } from '@/entities/user';
import { HomePage } from '@/pages/home';
import { ROUTES } from '@/shared/config';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

export function AppRouter(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authStatus === AuthStatus.UNKNOWN) {
    return (<div>Loading...</div>);
  }

  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
    </Routes>
  );
};
