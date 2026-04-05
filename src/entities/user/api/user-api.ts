import { AxiosInstance } from 'axios';
import { UserApiRoutes } from './routes';
import { LoginRequest, TokenResponse, UserResponse, UserStoreRequest } from './types';
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

const logoutUser = async (api: AxiosInstance): Promise<void> => {
  await api.delete(UserApiRoutes.Logout);
};

const storeUser = async (api: AxiosInstance, payload: UserStoreRequest): Promise<User> => {
  const { data } = await api.post<UserResponse>(UserApiRoutes.Users, payload);

  return mapUser(data);
};

const uploadUserAvatar = async (api: AxiosInstance, id: string, payload: FormData): Promise<User> => {
  const { data } = await api.post<UserResponse>(UserApiRoutes.Avatar(id), payload);

  return mapUser(data);
};

export {
  fetchAuthUser,
  loginUser,
  logoutUser,
  storeUser,
  uploadUserAvatar,
};
