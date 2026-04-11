import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Education, Educations } from './types';
import { storeEducationAction } from './thunks';

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
      .addCase(storeEducationAction.fulfilled, (state, action: PayloadAction<Education>) => {
        if (state.educations.data) {
          state.educations.data = [action.payload, ...state.educations.data];
        }
      });
  }
});

export { educationSlice };
