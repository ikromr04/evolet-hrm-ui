import { EducationStoreRequest } from '../api/types';
import { EducationStoreSchema } from './schemas';

const mapEducationStore = (data: EducationStoreSchema): EducationStoreRequest => ({
  data: {
    type: 'educations',
    attributes: {
      ...data
    },
    relationships: {
      user: {
        data: {
          type: 'users',
          id: data.userId
        }
      }
    }
  }
});

export {
  mapEducationStore,
};
