import { JSX } from 'react';
import { StoreProvider } from './providers/store-provider';
import { RouterProvider } from './providers/router-provider';
import { ThemeProvider } from './providers/theme-provider';
import { AppRouter } from './routes';
import { Toaster, TooltipProvider } from '@/shared/ui';
import { HeaderProvider } from './providers/header-provider';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider>
            <HeaderProvider>
              <AppRouter />
            </HeaderProvider>
          </RouterProvider>
          <Toaster position="top-center" />
        </TooltipProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export { App };
