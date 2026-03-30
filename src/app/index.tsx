import { JSX } from 'react';
import { StoreProvider } from './providers/store-provider';
import { RouterProvider } from './providers/router-provider';
import { ThemeProvider } from './providers/theme-provider';
import { AppRouter } from './routes';
import { Toaster } from '@/shared/ui';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider>
          <AppRouter />
        </RouterProvider>
        <Toaster position="top-center" />
      </ThemeProvider>
    </StoreProvider>
  );
}

export { App };
