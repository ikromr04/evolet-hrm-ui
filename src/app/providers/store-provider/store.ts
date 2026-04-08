import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user';
import { createAPI } from '@/shared/api';
import { userDetailSlice } from '@/entities/user-detail';

const api = createAPI();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userDetail: userDetailSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: false,
  })
});

export { store };
