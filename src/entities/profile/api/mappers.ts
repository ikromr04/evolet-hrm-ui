import { Profile, Profiles } from '../model/types';
import { ProfileResponse, ProfilesResponse } from './types';

const mapProfile = (resource: ProfileResponse): Profile => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes,
});

const mapProfiles = (collection: ProfilesResponse): Profiles =>
  collection.data.map((data) => ({
    id: data.id,
    userId: data.relationships.user.data.id,
    ...data.attributes,
  }));

export {
  mapProfile,
  mapProfiles,
};
