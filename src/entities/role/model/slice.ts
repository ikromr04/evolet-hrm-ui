import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roles } from './types';
import { fetchRolesAction } from './thunks';
import { AsyncStatus } from '@/shared/store';

type RoleSlice = {
  roles: {
    data?: Roles;
    status: AsyncStatus;
  };
}

const initialState: RoleSlice = {
  roles: {
    status: AsyncStatus.IDLE,
  },
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchRolesAction.pending, (state) => {
        state.roles.status = AsyncStatus.LOADING;
      })
      .addCase(fetchRolesAction.fulfilled, (state, action: PayloadAction<Roles>) => {
        state.roles.data = action.payload;
        state.roles.status = AsyncStatus.SUCCEEDED;
      });
  }
});

export { roleSlice };
