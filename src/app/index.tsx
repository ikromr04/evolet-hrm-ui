import { JSX } from 'react';
import { StoreProvider } from './providers/store-provider';
import { RouterProvider } from './providers/router-provider';
import { AppRouter } from './app-router';
import { ThemeProvider } from './providers';

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

export default App;
