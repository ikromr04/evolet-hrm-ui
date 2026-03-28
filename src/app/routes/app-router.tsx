import { AuthStatus, checkAuthAction, getAuthStatus } from '@/entities/user';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { ROUTES } from '@/shared/config';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { GuestRoute } from './guest-route';

function AppRouter(): JSX.Element {
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
      <Route element={<GuestRoute />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export { AppRouter };
