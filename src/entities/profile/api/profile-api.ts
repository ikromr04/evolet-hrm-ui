import { AxiosInstance } from 'axios';
import { ProfileResponse, ProfilesResponse } from './types';
import { Profile, Profiles } from '../model/types';
import { mapProfileResponse, mapProfilesResponse, mapProfileStoreRequest, mapProfileUpdateRequest } from './mappers';
import { ProfileStoreSchema, ProfileUpdateSchema } from '../model/schemas';

const fetchProfiles = async (api: AxiosInstance): Promise<Profiles> => {
  const { data } = await api.get<ProfilesResponse>('/profiles?include=user');
  
  return mapProfilesResponse(data);
};

const storeProfile = async (api: AxiosInstance, payload: ProfileStoreSchema): Promise<Profile> => {
  const { data } = await api.post<ProfileResponse>('/profiles?include=user', mapProfileStoreRequest(payload));

  return mapProfileResponse(data);
};

const updateProfile = async (api: AxiosInstance, payload: ProfileUpdateSchema): Promise<Profile> => {
  const { data } = await api.patch<ProfileResponse>(`/profiles/${payload.id}?include=user`, mapProfileUpdateRequest(payload));

  return mapProfileResponse(data);
};

export {
  fetchProfiles,
  storeProfile,
  updateProfile,
};
