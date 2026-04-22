export {
  type User,
  type Users,
} from './model/types';

export {
  userSlice,
  updateUser,
} from './model/slice';

export {
  getUsersStatus,
  getUsers,
} from './model/selectors';

export {
  userStoreSchema,
  userUpdateSchema,
  type UserStoreSchema,
  type UserUpdateSchema,
} from './model/schemas';

export {
  storeUserAction,
  updateUserAction,
  fetchUsersAction,
  updateAvatarAction,
} from './model/thunks';
