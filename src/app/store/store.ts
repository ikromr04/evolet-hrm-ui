import { userSlice } from '@/entities/user';
import { createAPI } from '@/shared/api';
import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

export const store = configureStore({
  reducer: {
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: false,
  })
});
