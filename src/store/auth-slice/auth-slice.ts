import { AuthorizationStatus, SliceName } from '@/const/store';
import { createSlice } from '@reduxjs/toolkit';
import { checkAuthAction } from './auth-api-actions';
import { UserResource } from '@/types/user';

export type AuthSlice = {
  status: AuthorizationStatus;
  me?: UserResource;
}

const initialState: AuthSlice = {
  status: AuthorizationStatus.UNKNOWN
};

export const authSlice = createSlice({
  name: SliceName.AUTH,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.status = AuthorizationStatus.AUTH;
        state.me = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.status = AuthorizationStatus.NO_AUTH;
        state.me = undefined;
      });
  }
});
