export { AuthStatus, type User } from './model/types';

export { userSlice } from './model/slice';

export { getAuthStatus, getAuthUser } from './model/selectors';

export {
  loginSchema,
  userStoreSchema,
  avatarUploadSchema,
  type LoginSchema,
  type UserStoreSchema,
  type AvatarUploadSchema,
} from './model/schemas';

export {
  checkAuthAction,
  loginAction,
  logoutAction,
  storeUserAction,
  uploadUserAvatarAction,
} from './model/thunks';
