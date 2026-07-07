/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserFireSchema, UserStoreSchema, UserTransferSchema, UserUpdateSchema } from '../model/schemas';
import { User, Users } from '../model/types';
import { FiredUsersResponse, TransferredUsersResponse, UserFireRequest, UserResponse, UsersResponse, UserStoreRequest, UserTransferRequest, UserUpdateRequest } from './types';

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

const mapUsersResponse = (collection: UsersResponse): Users =>
  collection.data.map((resource) => ({
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

const mapFiredUsersResponse = (collection: FiredUsersResponse): Users => {
  if (collection.data.length === 0) return [];

  const includedByTypeId = collection.included.reduce((acc, item) => {
    const includedItem = item as any;
    acc[`${includedItem.type}_${includedItem.id}`] = includedItem;
    return acc;
  }, {} as Record<string, unknown>);

  return collection.data.map((resource) => {
    const eventIdentifier = resource.relationships.events.data[0];
    const event = includedByTypeId[`${eventIdentifier.type}_${eventIdentifier.id}`] as any;

    const performer = includedByTypeId[`${event.relationships.performer.data.type}_${event.relationships.performer.data.id}`] as any;

    return {
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
      firedBy: performer ? `${performer.attributes.surname} ${performer.attributes.name} ${performer.attributes.patronymic || ''}` : 'Система',
      firedReason: event.attributes.payload.reason,
      firedAt: event.attributes.createdAt,
    };
  });
};

const mapTransferredUsersResponse = (collection: TransferredUsersResponse): Users => {
  if (collection.data.length === 0) return [];

  const includedByTypeId = collection.included.reduce((acc, item) => {
    const includedItem = item as any;
    acc[`${includedItem.type}_${includedItem.id}`] = includedItem;
    return acc;
  }, {} as Record<string, unknown>);

  return collection.data.map((resource) => {
    const eventIdentifier = resource.relationships.events.data[0];
    const event = includedByTypeId[`${eventIdentifier.type}_${eventIdentifier.id}`] as any;

    const performer = includedByTypeId[`${event.relationships.performer.data.type}_${event.relationships.performer.data.id}`] as any;

    return {
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
      transferredBy: performer ? `${performer.attributes.surname} ${performer.attributes.name} ${performer.attributes.patronymic || ''}` : 'Система',
      transferredTo: event.attributes.payload.to,
      transferredAt: event.attributes.createdAt,
    };
  });
};

const mapUserStoreRequest = (data: UserStoreSchema): UserStoreRequest => ({
  data: {
    type: 'users',
    attributes: {
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      email: data.email,
    },
  }
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

const mapUserFireRequest = (data: UserFireSchema): UserFireRequest => ({
  data: {
    type: 'users',
    id: data.id,
    meta: {
      payload: {
        reason: data.reason,
      },
    }
  }
});

const mapUserTransferRequest = (data: UserTransferSchema): UserTransferRequest => ({
  data: {
    type: 'users',
    id: data.id,
    meta: {
      payload: {
        to: data.to,
      },
    }
  }
});

export {
  mapUsersResponse,
  mapFiredUsersResponse,
  mapTransferredUsersResponse,
  mapUserStoreRequest,
  mapUserResponse,
  mapUserUpdateRequest,
  mapUserFireRequest,
  mapUserTransferRequest
};
