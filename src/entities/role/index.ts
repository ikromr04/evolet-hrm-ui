export type {
  Role,
  Roles,
} from './model/types';

export { roleSlice } from './model/slice';

export {
  getRolesStatus,
  getRoles,
} from './model/selectors';

export {
  fetchRolesAction,
} from './model/thunks';
