import { ProfileStoreRequest } from '../api/types';
import { ProfileStoreSchema } from './schemas';

const mapProfileStore = (data: ProfileStoreSchema): ProfileStoreRequest => ({
  data: {
    type: 'profiles',
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
  mapProfileStore,
};
