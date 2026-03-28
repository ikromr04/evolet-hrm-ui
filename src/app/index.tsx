import { JSX } from 'react';
import { StoreProvider } from './providers/store-provider';
import { RouterProvider } from './providers/router-provider';
import { ThemeProvider } from './providers/theme-provider';
import { AppRouter } from './routes';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <ThemeProvider>
        <RouterProvider>
          <AppRouter />
        </RouterProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export { App };
