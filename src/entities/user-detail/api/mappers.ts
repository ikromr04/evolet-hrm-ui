import { UserDetail } from '../model/types';
import { UserDetailResponse } from './types';

const mapUserDetail = (resource: UserDetailResponse): UserDetail => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

export {
  mapUserDetail,
};
