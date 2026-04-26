import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Users } from './types';
import { fetchUsersAction, fireUserAction, storeUserAction, transferUserAction, updateAvatarAction, updateUserAction } from './thunks';
import { AsyncStatus } from '@/shared/store';

type UserSlice = {
  users: {
    data?: Users;
    status: AsyncStatus;
  };
}

const initialState: UserSlice = {
  users: {
    status: AsyncStatus.IDLE,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<User>) => {
      if (state.users.data) {
        state.users.data = state.users.data.map((user) => {
          if (user.id === action.payload.id) {
            return action.payload;
          }
          return user;
        });
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsersAction.pending, (state) => {
        state.users.status = AsyncStatus.LOADING;
      })
      .addCase(fetchUsersAction.fulfilled, (state, action: PayloadAction<Users>) => {
        state.users.data = action.payload;
        state.users.status = AsyncStatus.SUCCEEDED;
      })
      .addCase(storeUserAction.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.users.data) {
          state.users.data = [action.payload, ...state.users.data];
        }
      })
      .addCase(updateUserAction.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.users.data) {
          state.users.data = state.users.data.map((user) => {
            if (user.id === action.payload.id) {
              return action.payload;
            }
            return user;
          });
        }
      })
      .addCase(updateAvatarAction.fulfilled, (state, action: PayloadAction<User>) => {
        if (state.users.data) {
          state.users.data = state.users.data.map((user) => {
            if (user.id === action.payload.id) {
              return action.payload;
            }
            return user;
          });
        }
      })
      .addCase(fireUserAction.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.users.data) {
          state.users.data = state.users.data.filter((user) => user.id !== action.payload);
        }
      })
      .addCase(transferUserAction.fulfilled, (state, action: PayloadAction<string>) => {
        if (state.users.data) {
          state.users.data = state.users.data.filter((user) => user.id !== action.payload);
        }
      });
  }
});

export { userSlice };
export const { updateUser } = userSlice.actions;
