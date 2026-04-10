import { AxiosInstance } from 'axios';
import { Languages } from '../model/types';
import { LanguagesResponse } from './types';
import { mapLanguages } from './mappers';

const fetchLanguages = async (api: AxiosInstance): Promise<Languages> => {
  const { data } = await api.get<LanguagesResponse>('/languages');

  return mapLanguages(data);
};

export {
  fetchLanguages,
};
