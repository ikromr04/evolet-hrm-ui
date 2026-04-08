import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { UserDetail, UserDetails } from './types';
import { storeUserDetailAction } from './thunks';

type UserDetailSlice = {
  userDetails: {
    data?: UserDetails;
    status: AsyncStatus;
  };
}

const initialState: UserDetailSlice = {
  userDetails: {
    status: AsyncStatus.IDLE,
  },
};

const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(storeUserDetailAction.fulfilled, (state, action: PayloadAction<UserDetail>) => {
        if (state.userDetails.data) {
          state.userDetails.data = [action.payload, ...state.userDetails.data];
        }
      });
  }
});

export { userDetailSlice };
