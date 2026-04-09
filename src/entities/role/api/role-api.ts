import { AxiosInstance } from 'axios';
import { Roles } from '../../roles/model/types';
import { RolesResponse } from './types';
import { mapRoles } from './mappers';

const fetchRoles = async (api: AxiosInstance): Promise<Roles> => {
  const { data } = await api.get<RolesResponse>('/roles');

  return mapRoles(data);
};

export {
  fetchRoles,
};
