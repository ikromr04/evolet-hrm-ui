import { ExperienceStoreRequest } from '../api/types';
import { ExperienceStoreSchema } from './schemas';

const mapExperienceStore = (data: ExperienceStoreSchema): ExperienceStoreRequest => ({
  data: {
    type: 'experiences',
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
  mapExperienceStore,
};
