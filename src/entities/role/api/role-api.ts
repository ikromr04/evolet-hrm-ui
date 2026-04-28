import { AxiosInstance } from 'axios';
import { RolesResponse } from './types';
import { mapRoles } from './mappers';
import { Roles } from '../model/types';

const fetchRoles = async (api: AxiosInstance): Promise<Roles> => {
  const { data } = await api.get<RolesResponse>('/roles');

  return mapRoles(data);
};

export {
  fetchRoles,
};
