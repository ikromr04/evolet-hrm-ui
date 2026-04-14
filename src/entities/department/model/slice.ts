import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Departments } from './types';
import { fetchDepartmentsAction } from './thunks';

type DepartmentSlice = {
  departments: {
    data?: Departments;
    status: AsyncStatus;
  };
}

const initialState: DepartmentSlice = {
  departments: {
    status: AsyncStatus.IDLE,
  },
};

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDepartmentsAction.pending, (state) => {
        state.departments.status = AsyncStatus.LOADING;
      })
      .addCase(fetchDepartmentsAction.fulfilled, (state, action: PayloadAction<Departments>) => {
        state.departments.data = action.payload;
        state.departments.status = AsyncStatus.SUCCEEDED;
      });
  }
});

export { departmentSlice };
