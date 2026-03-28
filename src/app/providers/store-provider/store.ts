import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user';
import { createAPI } from '@/shared/api';

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
