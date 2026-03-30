import { AxiosInstance } from 'axios';
import { UserApiRoutes } from './routes';
import { LoginRequest, TokenResponse, UserResponse } from './types';
import { Token } from '@/shared/lib';
import { User } from '../model/types';
import { mapUser } from './mappers';

const fetchAuthUser = async (api: AxiosInstance): Promise<User> => {
  const { data } = await api.get<UserResponse>(UserApiRoutes.Check);

  return mapUser(data);
};

const loginUser = async (api: AxiosInstance, payload: LoginRequest): Promise<Token> => {
  const { data } = await api.post<TokenResponse>(UserApiRoutes.Login, payload);

  return data.data.attributes.token;
};

export { fetchAuthUser, loginUser };
