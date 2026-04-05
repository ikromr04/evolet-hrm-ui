import { AuthStatus, checkAuthAction, getAuthStatus } from '@/entities/user';
import { ROUTES } from '@/shared/config';
import { useAppDispatch, useAppSelector } from '@/shared/store';
import { JSX, lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PrivateRoute } from './private-route';
import { GuestRoute } from './guest-route';
import { PageLoader } from '@/shared/ui';
import { AppLayout } from '../layouts';

const LoginPage = lazy(() => import('@/pages/login').then((m) => ({ default: m.LoginPage })));
const HomePage = lazy(() => import('@/pages/home').then((m) => ({ default: m.HomePage })));
const UserListPage = lazy(() => import('@/pages/user-list').then((m) => ({ default: m.UserListPage })));

function AppRouter(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authStatus === AuthStatus.UNKNOWN) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.USER_LIST} element={<UserListPage />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export { AppRouter };
