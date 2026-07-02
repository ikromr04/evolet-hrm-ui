import { AxiosInstance } from 'axios';
import { FiredUsersResponse, UserResponse, UsersResponse } from './types';
import { User, Users } from '../model/types';
import { mapFiredUsersResponse, mapUserFireRequest, mapUserResponse, mapUsersResponse, mapUserStoreRequest, mapUserTransferRequest, mapUserUpdateRequest } from './mappers';
import { UserFireSchema, UserStoreSchema, UserTransferSchema, UserUpdateSchema } from '../model/schemas';

const fetchUsers = async (api: AxiosInstance): Promise<Users> => {
  const { data } = await api.get<UsersResponse>(
    '/users?include=profile,roles,positions,departments,languages,equipments,experiences,educations&sort=surname'
  );

  return mapUsersResponse(data);
};

const fetchFiredUsers = async (api: AxiosInstance): Promise<Users> => {
  const { data } = await api.get<FiredUsersResponse>(
    '/users/fired?include=events.performer,profile,roles,positions,departments,languages,equipments,experiences,educations&sort=surname'
  );

  return mapFiredUsersResponse(data);
};

const storeUser = async (api: AxiosInstance, payload: UserStoreSchema): Promise<User> => {
  const { data } = await api.post<UserResponse>(
    '/users?include=profile,roles,positions,departments,languages,equipments,experiences,educations',
    mapUserStoreRequest(payload)
  );

  return mapUserResponse(data);
};

const updateUser = async (api: AxiosInstance, payload: UserUpdateSchema): Promise<User> => {
  const { data } = await api.patch<UserResponse>(
    `/users/${payload.id}?include=profile,roles,positions,departments,languages,equipments,experiences,educations`,
    mapUserUpdateRequest(payload)
  );

  return mapUserResponse(data);
};

const updateAvatar = async (api: AxiosInstance, payload: UserUpdateSchema): Promise<User> => {
  const formData = new FormData();
  formData.append('data[attributes][avatar]', payload.avatar || '');
  formData.append('data[type]', 'users');
  formData.append('data[id]', payload.id);

  const { data } = await api.patch<UserResponse>(
    `/users/${payload.id}?include=profile,roles,positions,departments,languages,equipments,experiences,educations`,
    formData
  );

  return mapUserResponse(data);
};

const fireUser = async (api: AxiosInstance, payload: UserFireSchema): Promise<void> => {
  await api.post(`/users/${payload.id}/fire`, mapUserFireRequest(payload));
};

const transferUser = async (api: AxiosInstance, payload: UserTransferSchema): Promise<void> => {
  await api.post(`/users/${payload.id}/transfer`, mapUserTransferRequest(payload));
};

const deleteUser = async (api: AxiosInstance, id: string): Promise<void> => {
  await api.delete(`/users/${id}`);
};

export {
  storeUser,
  updateUser,
  fetchUsers,
  updateAvatar,
  deleteUser,
  fireUser,
  transferUser,
  fetchFiredUsers,
};
