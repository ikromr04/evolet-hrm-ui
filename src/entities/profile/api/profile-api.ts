import { AxiosInstance } from 'axios';
import { ProfileResponse, ProfilesResponse, ProfileStoreRequest } from './types';
import { Profile, Profiles } from '../model/types';
import { mapProfile, mapProfiles } from './mappers';

const fetchProfiles = async (api: AxiosInstance): Promise<Profiles> => {
  const { data } = await api.get<ProfilesResponse>('/profiles?include=user');

  return mapProfiles(data);
};

const storeProfile = async (api: AxiosInstance, payload: ProfileStoreRequest): Promise<Profile> => {
  const { data } = await api.post<ProfileResponse>('/profiles', payload);

  return mapProfile(data);
};

export {
  fetchProfiles,
  storeProfile,
};
