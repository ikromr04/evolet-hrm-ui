import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Profile, Profiles } from './types';
import { fetchProfilesAction, storeProfileAction, updateProfileAction } from './thunks';

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
      .addCase(fetchProfilesAction.pending, (state) => {
        state.profiles.status = AsyncStatus.LOADING;
      })
      .addCase(fetchProfilesAction.fulfilled, (state, action: PayloadAction<Profiles>) => {
        state.profiles.data = action.payload;
        state.profiles.status = AsyncStatus.SUCCEEDED;
      })
      .addCase(storeProfileAction.fulfilled, (state, action: PayloadAction<Profile>) => {
        if (state.profiles.data) {
          state.profiles.data = [action.payload, ...state.profiles.data];
        }
      })
      .addCase(updateProfileAction.fulfilled, (state, action: PayloadAction<Profile>) => {
        if (state.profiles.data) {
          state.profiles.data = state.profiles.data.map((profile) => {
            if (profile.id === action.payload.id) {
              return action.payload;
            }
            return profile;
          });
        }
      });
  }
});

export { profileSlice };
