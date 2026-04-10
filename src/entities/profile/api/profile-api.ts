import { AxiosInstance } from 'axios';
import { ProfileResponse, ProfileStoreRequest } from './types';
import { Profile } from '../model/types';
import { mapProfile } from './mappers';

const storeProfile = async (api: AxiosInstance, payload: ProfileStoreRequest): Promise<Profile> => {
  const { data } = await api.post<ProfileResponse>('/profiles', payload);

  return mapProfile(data);
};

export {
  storeProfile
};
