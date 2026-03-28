import { JSX } from 'react';
import { RouterProvider, StoreProvider } from './providers';
import { AppRouter } from './routers';

function App(): JSX.Element {
  return (
    <StoreProvider>
      <RouterProvider>
        <AppRouter />
      </RouterProvider>
    </StoreProvider>
  );
}

export default App;
