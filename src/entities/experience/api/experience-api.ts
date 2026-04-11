import { AxiosInstance } from 'axios';
import { ExperienceResponse, ExperienceStoreRequest } from './types';
import { Experience } from '../model/types';
import { mapExperience } from './mappers';

const storeExperience = async (api: AxiosInstance, payload: ExperienceStoreRequest): Promise<Experience> => {
  const { data } = await api.post<ExperienceResponse>('/experiences', payload);

  return mapExperience(data);
};

export {
  storeExperience,
};
