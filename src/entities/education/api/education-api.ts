import { AxiosInstance } from 'axios';
import { EducationResponse, EducationsResponse } from './types';
import { Education, Educations } from '../model/types';
import { mapEducationResponse, mapEducationsResponse, mapEducationStoreRequest, mapEducationUpdateRequest } from './mappers';
import { EducationStoreSchema, EducationUpdateSchema } from '../model/schemas';

const fetchEducations = async (api: AxiosInstance): Promise<Educations> => {
  const { data } = await api.get<EducationsResponse>('/educations?include=user');
  
  return mapEducationsResponse(data);
};

const storeEducation = async (api: AxiosInstance, payload: EducationStoreSchema): Promise<Education> => {
  const { data } = await api.post<EducationResponse>('/educations?include=user', mapEducationStoreRequest(payload));

  return mapEducationResponse(data);
};

const updateEducation = async (api: AxiosInstance, payload: EducationUpdateSchema): Promise<Education> => {
  const { data } = await api.patch<EducationResponse>(
    `/educations/${payload.id}?include=user`,
    mapEducationUpdateRequest(payload)
  );

  return mapEducationResponse(data);
};

export {
  fetchEducations,
  storeEducation,
  updateEducation,
};
