import { JSX, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

export function RouterProvider({
  children
}: PropsWithChildren): JSX.Element {

  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};
