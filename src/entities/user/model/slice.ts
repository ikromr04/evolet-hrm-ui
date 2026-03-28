import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, UserResource } from './types';
import { checkAuthAction } from './thunks';

type UserSlice = {
  status: AuthStatus;
  me?: UserResource;
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
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.status = AuthStatus.AUTH;
        state.me = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthStatus.NO_AUTH;
        state.me = undefined;
      });
  }
});

export { userSlice };
