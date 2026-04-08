export {
  userDetailStoreSchema,
  type UserDetailStoreSchema,
} from './model/schemas';

export {
  storeUserDetailAction,
} from './model/thunks';

export type {
  UserDetail,
  UserDetails,
} from './model/types';

export { userDetailSlice } from './model/slice';

export {
  getUserDetailsStatus,
  getUserDetails,
} from './model/selectors';
