import { Profile } from '../model/types';
import { ProfileResponse } from './types';

const mapProfile = (resource: ProfileResponse): Profile => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

export {
  mapProfile,
};
