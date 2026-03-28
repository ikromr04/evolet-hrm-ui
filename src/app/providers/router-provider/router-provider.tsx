import { JSX, PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';

function RouterProvider({
  children
}: PropsWithChildren): JSX.Element {

  return (
    <BrowserRouter>
      {children}
    </BrowserRouter>
  );
};

export { RouterProvider };
