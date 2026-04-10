export type {
  Department,
  Departments,
} from './model/types';

export { departmentSlice } from './model/slice';

export {
  getDepartmentsStatus,
  getDepartments,
} from './model/selectors';

export {
  fetchDepartmentsAction,
} from './model/thunks';
