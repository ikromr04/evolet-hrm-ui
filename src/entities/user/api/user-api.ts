import { AxiosInstance } from 'axios';
import { LoginRequest, TokenResponse, UserResponse, UsersResponse, UserStoreRequest, UserUpdateRequest } from './types';
import { Token } from '@/shared/lib';
import { User, Users } from '../model/types';
import { mapUser, mapUsers } from './mappers';

const fetchAuthUser = async (api: AxiosInstance): Promise<User> => {
  const { data } = await api.get<UserResponse>('/me?include=roles,positions,departments');
  
  return mapUser(data);
};

const loginUser = async (api: AxiosInstance, payload: LoginRequest): Promise<Token> => {
  const { data } = await api.post<TokenResponse>('/login', payload);

  return data.data.attributes.token;
};

const logoutUser = async (api: AxiosInstance): Promise<void> => {
  await api.delete('/logout');
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

  const { data } = await api.post<UserResponse>('/users', formData);

  return mapUser(data);
};

const updateUser = async (api: AxiosInstance, payload: UserUpdateRequest): Promise<User> => {
  const { data } = await api.patch<UserResponse>(`/users/${payload.data.id}`, payload);

  return mapUser(data);
};

const fetchUsers = async (api: AxiosInstance): Promise<Users> => {
  const { data } = await api.get<UsersResponse>('/users?sort=surname&include=roles,positions,departments');
  
  return mapUsers(data);
};

export {
  fetchAuthUser,
  loginUser,
  logoutUser,
  storeUser,
  updateUser,
  fetchUsers,
};
