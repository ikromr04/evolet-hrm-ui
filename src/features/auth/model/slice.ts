import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, Me } from './types';
import { checkAuthAction, loginAction, logoutAction } from './thunks';
import { dropToken, saveToken, Token } from '@/shared/lib';

type AuthSlice = {
  status: AuthStatus;
  me?: Me;
};

const initialState: AuthSlice = {
  status: AuthStatus.UNKNOWN,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<Me>) => {
        state.status = AuthStatus.AUTH;
        state.me = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthStatus.NO_AUTH;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<Token>) => {
        state.status = AuthStatus.AUTH;
        saveToken(action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = AuthStatus.NO_AUTH;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = AuthStatus.NO_AUTH;
        dropToken();
      });
  }
});

export { authSlice };
