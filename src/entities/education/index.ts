export {
  educationStoreSchema,
  educationUpdateSchema,
  type EducationStoreSchema,
  type EducationUpdateSchema,
} from './model/schemas';

export {
  fetchEducationsAction,
  storeEducationAction,
  updateEducationAction,
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
