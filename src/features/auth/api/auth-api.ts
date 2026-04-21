import { AxiosInstance } from 'axios';
import { CheckAuthResponse, LoginResponse } from './types';
import { Token } from '@/shared/lib';
import { mapCheckAuthResponse, mapLoginRequest } from './mappers';
import { LoginSchema } from '../model/schemas';
import { Me } from '../model/types';

const checkAuth = async (api: AxiosInstance): Promise<Me> => {
  const { data } = await api.get<CheckAuthResponse>('/me?include=profile,roles,positions,departments,languages,equipments,experiences,educations');

  return mapCheckAuthResponse(data);
};

const login = async (api: AxiosInstance, credentials: LoginSchema): Promise<Token> => {
  const { data } = await api.post<LoginResponse>('/login', mapLoginRequest(credentials));

  return data.data.attributes.token;
};

const logout = async (api: AxiosInstance): Promise<void> => {
  await api.delete('/logout');
};

export {
  checkAuth,
  login,
  logout,
};
