import { UserDetailStoreRequest } from '../api/types';
import { UserDetailStoreSchema } from './schemas';

const mapUserDetailStore = (data: UserDetailStoreSchema): UserDetailStoreRequest => ({
  data: {
    type: 'user-details',
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
  mapUserDetailStore,
};
