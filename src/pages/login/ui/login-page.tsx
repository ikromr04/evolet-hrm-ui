import { LoginForm } from '@/features/login';
import { JSX } from 'react';

function LoginPage(): JSX.Element {
  return (
    <main className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </main>
  );
}

export { LoginPage };
