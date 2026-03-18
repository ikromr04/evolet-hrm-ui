import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks';
import { checkAuthAction } from './store/auth-slice/auth-api-actions';
import { getAuthStatus } from './store/auth-slice/auth-selector';
import { AuthorizationStatus } from './const/store';

function App(): ReactNode {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (authStatus === AuthorizationStatus.UNKNOWN) {
    return (<div>Loading...</div>);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
