import { User, Users } from '../model/types';
import { UserResponse, UsersResponse } from './types';

const mapUser = (resource: UserResponse): User => ({
  id: resource.data.id,
  ...resource.data.attributes,
  roles: resource.data.relationships.roles.data.map(({ id }) => id),
  positions: resource.data.relationships.positions.data.map(({ id }) => id),
  departments: resource.data.relationships.departments.data.map(({ id }) => id),
});

const mapUsers = (collection: UsersResponse): Users => collection.data.map((resource) => ({
  id: resource.id,
  ...resource.attributes,
  roles: resource.relationships.roles.data.map(({ id }) => id),
  positions: resource.relationships.positions.data.map(({ id }) => id),
  departments: resource.relationships.departments.data.map(({ id }) => id),
}));

export {
  mapUser,
  mapUsers,
};
