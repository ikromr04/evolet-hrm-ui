import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, User, Users } from './types';
import { checkAuthAction, loginAction, logoutAction, storeUserAction } from './thunks';
import { saveToken, Token } from '@/shared/lib';
import { AsyncStatus } from '@/shared/store';

type UserSlice = {
  status: AuthStatus;
  me?: User;
  users: {
    data?: Users;
    status: AsyncStatus;
  };
}

const initialState: UserSlice = {
  status: AuthStatus.UNKNOWN,
  users: {
    status: AsyncStatus.IDLE,
  },
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
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.status = AuthStatus.NO_AUTH;
        state.me = undefined;
      })
      .addCase(storeUserAction.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.users.data) {
          state.users.data = [action.payload, ...state.users.data];
        }
      });
  }
});

export { userSlice };
