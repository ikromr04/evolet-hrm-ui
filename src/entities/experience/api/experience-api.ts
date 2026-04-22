import { AxiosInstance } from 'axios';
import { ExperienceResponse, ExperiencesResponse } from './types';
import { Experience, Experiences } from '../model/types';
import { mapExperienceResponse, mapExperiencesResponse, mapExperienceStoreRequest, mapExperienceUpdateRequest } from './mappers';
import { ExperienceStoreSchema, ExperienceUpdateSchema } from '../model/schemas';

const fetchExperiences = async (api: AxiosInstance): Promise<Experiences> => {
  const { data } = await api.get<ExperiencesResponse>('/experiences?include=user');

  return mapExperiencesResponse(data);
};

const storeExperience = async (api: AxiosInstance, payload: ExperienceStoreSchema): Promise<Experience> => {
  const { data } = await api.post<ExperienceResponse>('/experiences?include=user', mapExperienceStoreRequest(payload));

  return mapExperienceResponse(data);
};

const updateExperience = async (api: AxiosInstance, payload: ExperienceUpdateSchema): Promise<Experience> => {
  const { data } = await api.patch<ExperienceResponse>(
    `/experiences/${payload.id}?include=user`,
    mapExperienceUpdateRequest(payload)
  );

  return mapExperienceResponse(data);
};

const deleteExperience = async (api: AxiosInstance, id: string): Promise<void> => {
  await api.delete<ExperienceResponse>(`/experiences/${id}`);
};

export {
  fetchExperiences,
  storeExperience,
  updateExperience,
  deleteExperience,
};
