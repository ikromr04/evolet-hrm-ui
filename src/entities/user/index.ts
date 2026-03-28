export { AuthStatus } from './model/types';
export { userSlice } from './model/slice';
export { checkAuthAction } from './model/thunks';
export { getAuthStatus, getAuthUser } from './model/selectors';
export { fetchAuthUser } from './api/user-api';

export type { UserResource } from './model/types';
