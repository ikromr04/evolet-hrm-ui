export { AuthStatus, type User } from './model/types';

export { userSlice } from './model/slice';

export { getAuthStatus, getAuthUser } from './model/selectors';

export { loginSchema, type LoginSchema } from './model/schemas';

export {
  checkAuthAction,
  loginAction,
  logoutAction
} from './model/thunks';
