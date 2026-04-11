import { AxiosInstance } from 'axios';
import { EducationResponse, EducationStoreRequest } from './types';
import { Education } from '../model/types';
import { mapEducation } from './mappers';

const storeEducation = async (api: AxiosInstance, payload: EducationStoreRequest): Promise<Education> => {
  const { data } = await api.post<EducationResponse>('/educations', payload);

  return mapEducation(data);
};

export {
  storeEducation,
};
