import './styles/index.css';

import { JSX } from 'react';
import { StoreProvider } from './providers/store-provider';
import { ThemeProvider } from './providers/theme-provider';
import { Toaster } from '@/shared/ui';
import { RouterProvider } from './providers/router-provider';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider />
        <Toaster position="top-center" />
      </ThemeProvider>
    </StoreProvider>
  );
}

export { App };
