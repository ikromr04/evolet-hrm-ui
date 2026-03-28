import { AxiosInstance } from 'axios';
import { UserResource } from '../model/types';
import { UserApiRoutes } from './routes';

const fetchAuthUser = async (api: AxiosInstance): Promise<UserResource> => {
  const { data } = await api.get<UserResource>(UserApiRoutes.Check);

  return data;
};

export { fetchAuthUser };
