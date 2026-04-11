import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '@/entities/user';
import { createAPI } from '@/shared/api';
import { profileSlice } from '@/entities/profile';
import { roleSlice } from '@/entities/role';
import { positionSlice } from '@/entities/position';
import { departmentSlice } from '@/entities/department';
import { languageSlice } from '@/entities/language';
import { equipmentSlice } from '@/entities/equipment';
import { experienceSlice } from '@/entities/experience';
import { educationSlice } from '@/entities/education';

const api = createAPI();

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    profile: profileSlice.reducer,
    role: roleSlice.reducer,
    position: positionSlice.reducer,
    department: departmentSlice.reducer,
    language: languageSlice.reducer,
    equipment: equipmentSlice.reducer,
    experience: experienceSlice.reducer,
    education: educationSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    thunk: {
      extraArgument: api,
    },
    serializableCheck: false,
  })
});

export { store };
