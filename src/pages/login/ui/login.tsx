import { AuthStatus, getAuthStatus, LoginForm } from '@/features/auth';
import { ROUTES } from '@/shared/config';
import { useAppSelector } from '@/shared/store';
import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

function Login(): JSX.Element {
  const authStatus = useAppSelector(getAuthStatus);

  if (authStatus === AuthStatus.AUTH) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}

export { Login };
