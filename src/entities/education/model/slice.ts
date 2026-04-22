import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Education, Educations } from './types';
import { deleteEducationAction, fetchEducationsAction, storeEducationAction, updateEducationAction } from './thunks';

type EducationSlice = {
  educations: {
    data?: Educations;
    status: AsyncStatus;
  };
}

const initialState: EducationSlice = {
  educations: {
    status: AsyncStatus.IDLE,
  },
};

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEducationsAction.pending, (state) => {
        state.educations.status = AsyncStatus.LOADING;
      })
      .addCase(fetchEducationsAction.fulfilled, (state, action: PayloadAction<Educations>) => {
        state.educations.data = action.payload;
        state.educations.status = AsyncStatus.SUCCEEDED;
      })
      .addCase(storeEducationAction.fulfilled, (state, action: PayloadAction<Education>) => {
        if (state.educations.data) {
          state.educations.data = [action.payload, ...state.educations.data];
        }
      })
      .addCase(updateEducationAction.fulfilled, (state, action: PayloadAction<Education>) => {
        if (state.educations.data) {
          state.educations.data = state.educations.data.map((education) => {
            if (education.id === action.payload.id) {
              return action.payload;
            }
            return education;
          });
        }
      })
      .addCase(deleteEducationAction.fulfilled, (state, action: PayloadAction<Education>) => {
        if (state.educations.data) {
          state.educations.data = state.educations.data.filter((education) => education.id !== action.payload.id);
        }
      });
  }
});

export { educationSlice };
