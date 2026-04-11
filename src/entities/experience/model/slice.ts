import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Experience, Experiences } from './types';
import { storeExperienceAction } from './thunks';

type ExperienceSlice = {
  experiences: {
    data?: Experiences;
    status: AsyncStatus;
  };
}

const initialState: ExperienceSlice = {
  experiences: {
    status: AsyncStatus.IDLE,
  },
};

const experienceSlice = createSlice({
  name: 'Experience',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(storeExperienceAction.fulfilled, (state, action: PayloadAction<Experience>) => {
        if (state.experiences.data) {
          state.experiences.data = [action.payload, ...state.experiences.data];
        }
      });
  }
});

export { experienceSlice };
