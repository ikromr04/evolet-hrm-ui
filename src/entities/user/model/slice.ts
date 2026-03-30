import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, User } from './types';
import { checkAuthAction, loginAction } from './thunks';
import { saveToken, Token } from '@/shared/lib';

type UserSlice = {
  status: AuthStatus;
  me?: User;
}

const initialState: UserSlice = {
  status: AuthStatus.UNKNOWN
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = AuthStatus.AUTH;
        state.me = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthStatus.NO_AUTH;
        state.me = undefined;
      })
      .addCase(loginAction.fulfilled, (state, action: PayloadAction<Token>) => {
        state.status = AuthStatus.AUTH;
        saveToken(action.payload);
      })
      .addCase(loginAction.rejected, (state) => {
        state.status = AuthStatus.NO_AUTH;
      });
  }
});

export { userSlice };
