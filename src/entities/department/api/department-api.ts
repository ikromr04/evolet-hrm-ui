import { AxiosInstance } from 'axios';
import { Departments } from '../model/types';
import { DepartmentsResponse } from './types';
import { mapDepartments } from './mappers';

const fetchDepartments = async (api: AxiosInstance): Promise<Departments> => {
  const { data } = await api.get<DepartmentsResponse>('/departments');

  return mapDepartments(data);
};

export {
  fetchDepartments,
};
