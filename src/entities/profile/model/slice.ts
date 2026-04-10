import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Profile, Profiles } from './types';
import { storeProfileAction } from './thunks';

type ProfileSlice = {
  profiles: {
    data?: Profiles;
    status: AsyncStatus;
  };
}

const initialState: ProfileSlice = {
  profiles: {
    status: AsyncStatus.IDLE,
  },
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(storeProfileAction.fulfilled, (state, action: PayloadAction<Profile>) => {
        if (state.profiles.data) {
          state.profiles.data = [action.payload, ...state.profiles.data];
        }
      });
  }
});

export { profileSlice };
