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
  userFireSchema,
  userTransferSchema,
  type UserStoreSchema,
  type UserUpdateSchema,
  type UserFireSchema,
  type UserTransferSchema,
} from './model/schemas';

export {
  storeUserAction,
  updateUserAction,
  fetchUsersAction,
  updateAvatarAction,
  fireUserAction,
  transferUserAction,
} from './model/thunks';
