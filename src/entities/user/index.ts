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
  getFiredUsersStatus,
  getFiredUsers,
  getTransferredUsersStatus,
  getTransferredUsers,
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
  deleteUserAction,
  fetchFiredUsersAction,
  fetchTransferredUsersAction,
} from './model/thunks';
