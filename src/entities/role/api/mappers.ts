import { Role, Roles } from '../../roles/model/types';
import { RoleResponse, RolesResponse } from './types';

const mapRole = (resource: RoleResponse): Role => ({
  id: resource.data.id,
  ...resource.data.attributes
});

const mapRoles = (collection: RolesResponse): Roles =>
  collection.data.map((data) => ({
    id: data.id,
    ...data.attributes
  }));

export {
  mapRole,
  mapRoles,
};
