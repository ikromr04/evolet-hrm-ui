import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Experience, Experiences } from './types';
import { deleteExperienceAction, fetchExperiencesAction, storeExperienceAction, updateExperienceAction } from './thunks';

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
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExperiencesAction.pending, (state) => {
        state.experiences.status = AsyncStatus.LOADING;
      })
      .addCase(fetchExperiencesAction.fulfilled, (state, action: PayloadAction<Experiences>) => {
        state.experiences.data = action.payload;
        state.experiences.status = AsyncStatus.SUCCEEDED;
      })
      .addCase(storeExperienceAction.fulfilled, (state, action: PayloadAction<Experience>) => {
        if (state.experiences.data) {
          state.experiences.data = [action.payload, ...state.experiences.data];
        }
      })
      .addCase(updateExperienceAction.fulfilled, (state, action: PayloadAction<Experience>) => {
        if (state.experiences.data) {
          state.experiences.data = state.experiences.data.map((experience) => {
            if (experience.id === action.payload.id) {
              return action.payload;
            }
            return experience;
          });
        }
      })
      .addCase(deleteExperienceAction.fulfilled, (state, action: PayloadAction<Experience>) => {
        if (state.experiences.data) {
          state.experiences.data = state.experiences.data.filter((experience) => experience.id !== action.payload.id);
        }
      });
  }
});

export { experienceSlice };
