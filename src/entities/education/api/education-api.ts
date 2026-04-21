import { AxiosInstance } from 'axios';
import { EducationResponse } from './types';
import { Education } from '../model/types';
import { mapEducationResponse, mapEducationStoreRequest } from './mappers';
import { EducationStoreSchema } from '../model/schemas';

const storeEducation = async (api: AxiosInstance, payload: EducationStoreSchema): Promise<Education> => {
  const { data } = await api.post<EducationResponse>('/educations?include=user', mapEducationStoreRequest(payload));

  return mapEducationResponse(data);
};

export {
  storeEducation,
};
