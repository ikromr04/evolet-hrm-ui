import { AxiosInstance } from 'axios';
import { UserDetailResponse, UserDetailStoreRequest } from './types';
import { UserDetail } from '../model/types';
import { UserDetailApiRoutes } from './routes';
import { mapUserDetail } from './mappers';

const storeUserDetail = async (api: AxiosInstance, payload: UserDetailStoreRequest): Promise<UserDetail> => {
  const { data } = await api.post<UserDetailResponse>(UserDetailApiRoutes.Index, payload);

  return mapUserDetail(data);
};

export {
  storeUserDetail
};
