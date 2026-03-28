import { JSX, PropsWithChildren } from 'react';
import { store } from '../store';
import { Provider } from 'react-redux';

export function StoreProvider({
  children
}: PropsWithChildren): JSX.Element {

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
