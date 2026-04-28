import { ProfileStoreSchema, ProfileUpdateSchema } from '../model/schemas';
import { Profile, Profiles } from '../model/types';
import { ProfileResponse, ProfilesResponse, ProfileStoreRequest, ProfileUpdateRequest } from './types';

const parseChildren = (
  value: string | string[] | null
): number[] | null => {
  if (!value) return null;

  let arr: unknown[];

  if (Array.isArray(value)) {
    arr = value;
  } else {
    try {
      arr = JSON.parse(value);
    } catch {
      return null;
    }
  }

  return arr
    .map((item) => Number(item))
    .filter((num) => !Number.isNaN(num));
};

const mapProfilesResponse = (collection: ProfilesResponse): Profiles =>
  collection.data.map((data) => ({
    id: data.id,
    userId: data.relationships.user.data.id,
    ...data.attributes,
    children: data.attributes.children ? parseChildren(data.attributes.children) : null,
  }));

const mapProfileResponse = (resource: ProfileResponse): Profile => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes,
  children: parseChildren(resource.data.attributes.children),
});

const mapProfileStoreRequest = (data: ProfileStoreSchema): ProfileStoreRequest => ({
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

const mapProfileUpdateRequest = (data: ProfileUpdateSchema): ProfileUpdateRequest => ({
  data: {
    type: 'profiles',
    id: data.id,
    attributes: {
      ...data
    },
  }
});

export {
  mapProfilesResponse,
  mapProfileResponse,
  mapProfileStoreRequest,
  mapProfileUpdateRequest,
};
