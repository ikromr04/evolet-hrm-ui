import { AxiosInstance } from 'axios';
import { ExperienceResponse } from './types';
import { Experience } from '../model/types';
import { mapExperienceResponse, mapExperienceStoreRequest } from './mappers';
import { ExperienceStoreSchema } from '../model/schemas';

const storeExperience = async (api: AxiosInstance, payload: ExperienceStoreSchema): Promise<Experience> => {
  const { data } = await api.post<ExperienceResponse>('/experiences?include=user', mapExperienceStoreRequest(payload));

  return mapExperienceResponse(data);
};

export {
  storeExperience,
};
