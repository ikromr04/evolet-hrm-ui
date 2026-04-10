import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user';
import { createAPI } from '@/shared/api';
import { userDetailSlice } from '@/entities/user-detail';
import { roleSlice } from '@/entities/role';
import { positionSlice } from '@/entities/position';
import { departmentSlice } from '@/entities/department';
import { languageSlice } from '@/entities/language';
import { equipmentSlice } from '@/entities/equipment';

const api = createAPI();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    userDetail: userDetailSlice.reducer,
    role: roleSlice.reducer,
    position: positionSlice.reducer,
    department: departmentSlice.reducer,
    language: languageSlice.reducer,
    equipment: equipmentSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: false,
  })
});

export { store };
