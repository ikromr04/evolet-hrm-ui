export {
  educationStoreSchema,
  type EducationStoreSchema,
} from './model/schemas';

export {
  storeEducationAction,
} from './model/thunks';

export type {
  Education,
  Educations,
} from './model/types';

export { educationSlice } from './model/slice';

export {
  getEducationsStatus,
  getEducations,
} from './model/selectors';
