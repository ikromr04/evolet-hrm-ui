/* eslint-disable @typescript-eslint/no-explicit-any */
import { User, Users } from '../model/types';
import { UserResponse, UsersResponse } from './types';

const mapUser = (resource: UserResponse): User => {
  const relationshipsByIdentifier = resource.included.reduce<Record<string, any>>(
    (acc, relationship) => {
      acc[`${relationship.type}_${relationship.id}`] = {
        id: relationship.id,
        ...relationship.attributes,
      };
      return acc;
    },
    {}
  );

  const profile = resource.data.relationships.profile.data;

  return {
    id: resource.data.id,
    ...resource.data.attributes,
    profile: profile ? relationshipsByIdentifier[`${profile.type}_${profile.id}`] : null,
    roles: resource.data.relationships.roles.data.map((role) => relationshipsByIdentifier[`${role.type}_${role.id}`]),
    positions: resource.data.relationships.positions.data.map((position) => relationshipsByIdentifier[`${position.type}_${position.id}`]),
    departments: resource.data.relationships.departments.data.map((department) => relationshipsByIdentifier[`${department.type}_${department.id}`]),
    languages: resource.data.relationships.languages.data.map((language) => relationshipsByIdentifier[`${language.type}_${language.id}`]),
    equipments: resource.data.relationships.equipments.data.map((equipment) => relationshipsByIdentifier[`${equipment.type}_${equipment.id}`]),
    experiences: resource.data.relationships.experiences.data.map((experience) => relationshipsByIdentifier[`${experience.type}_${experience.id}`]),
    educations: resource.data.relationships.educations.data.map((education) => relationshipsByIdentifier[`${education.type}_${education.id}`]),
  };
};

const mapUsers = (collection: UsersResponse): Users => {
  const relationshipsByIdentifier = collection.included.reduce<Record<string, any>>(
    (acc, relationship) => {
      acc[`${relationship.type}_${relationship.id}`] = {
        id: relationship.id,
        ...relationship.attributes,
      };
      return acc;
    },
    {}
  );

  return collection.data.map((resource) => ({
    id: resource.id,
    ...resource.attributes,
    profile: resource.relationships.profile.data ? relationshipsByIdentifier[`${resource.relationships.profile.data.type}_${resource.relationships.profile.data.id}`] : null,
    roles: resource.relationships.roles.data.map((role) => relationshipsByIdentifier[`${role.type}_${role.id}`]),
    positions: resource.relationships.positions.data.map((position) => relationshipsByIdentifier[`${position.type}_${position.id}`]),
    departments: resource.relationships.departments.data.map((department) => relationshipsByIdentifier[`${department.type}_${department.id}`]),
    languages: resource.relationships.languages.data.map((language) => relationshipsByIdentifier[`${language.type}_${language.id}`]),
    equipments: resource.relationships.equipments.data.map((equipment) => relationshipsByIdentifier[`${equipment.type}_${equipment.id}`]),
    experiences: resource.relationships.experiences.data.map((experience) => relationshipsByIdentifier[`${experience.type}_${experience.id}`]),
    educations: resource.relationships.educations.data.map((education) => relationshipsByIdentifier[`${education.type}_${education.id}`]),
  }));
};

export {
  mapUser,
  mapUsers,
};
