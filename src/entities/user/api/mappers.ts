import { UserStoreSchema, UserUpdateSchema } from '../model/schemas';
import { User, Users } from '../model/types';
import { UserResponse, UsersResponse, UserStoreRequest, UserUpdateRequest } from './types';

const mapUsersResponse = (response: UsersResponse): Users =>
  response.data.map((resource) => ({
    id: resource.id,
    ...resource.attributes,
    profile: resource.relationships.profile.data?.id || null,
    roles: resource.relationships.roles.data.map(({ id }) => id),
    positions: resource.relationships.positions.data.map(({ id }) => id),
    departments: resource.relationships.departments.data.map(({ id }) => id),
    languages: resource.relationships.languages.data.map(({ id }) => id),
    equipments: resource.relationships.equipments.data.map(({ id }) => id),
    experiences: resource.relationships.experiences.data.map(({ id }) => id),
    educations: resource.relationships.educations.data.map(({ id }) => id),
  }));

const mapUserStoreRequest = (data: UserStoreSchema): UserStoreRequest => ({
  data: {
    type: 'users',
    attributes: {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
      avatar: data.avatar,
    },
  }
});

const mapUserResponse = (response: UserResponse): User => ({
  id: response.data.id,
  ...response.data.attributes,
  profile: response.data.relationships.profile.data?.id || null,
  roles: response.data.relationships.roles.data.map(({ id }) => id),
  positions: response.data.relationships.positions.data.map(({ id }) => id),
  departments: response.data.relationships.departments.data.map(({ id }) => id),
  languages: response.data.relationships.languages.data.map(({ id }) => id),
  equipments: response.data.relationships.equipments.data.map(({ id }) => id),
  experiences: response.data.relationships.experiences.data.map(({ id }) => id),
  educations: response.data.relationships.educations.data.map(({ id }) => id),
});

const mapUserUpdateRequest = (data: UserUpdateSchema): UserUpdateRequest => ({
  data: {
    type: 'users',
    id: data.id,
    attributes: {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
      avatar: data.avatar,
    },
    relationships: {
      roles: data.roles ? {
        data: data.roles.map((id) => ({ type: 'roles', id }))
      } : undefined,
      positions: data.positions ? {
        data: data.positions.map((id) => ({ type: 'positions', id }))
      } : undefined,
      departments: data.departments ? {
        data: data.departments.map((id) => ({ type: 'departments', id }))
      } : undefined,
      languages: data.languages ? {
        data: data.languages.map((id) => ({ type: 'languages', id }))
      } : undefined,
    }
  }
});

export {
  mapUsersResponse,
  mapUserStoreRequest,
  mapUserResponse,
  mapUserUpdateRequest,
};
