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
  const formData = new FormData();
  formData.append('data[type]', payload.data.type);
  formData.append('data[attributes][name]', payload.data.attributes.name);
  formData.append('data[attributes][surname]', payload.data.attributes.surname);
  formData.append('data[attributes][email]', payload.data.attributes.email);

  if (payload.data.attributes.patronymic) {
    formData.append('data[attributes][patronymic]', payload.data.attributes.patronymic);
  }

  if (payload.data.attributes.avatar) {
    formData.append('data[attributes][avatar]', payload.data.attributes.avatar);
  }

  const { data } = await api.post<UserResponse>(UserApiRoutes.Users, formData);

  return mapUser(data);
};

export {
  fetchAuthUser,
  loginUser,
  logoutUser,
  storeUser,
};
