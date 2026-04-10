import { LoginRequest, UserStoreRequest, UserUpdateRequest } from '../api/types';
import { LoginSchema, UserStoreSchema, UserUpdateSchema } from './schemas';

const mapLogin = (payload: LoginSchema): LoginRequest => ({
  data: {
    type: 'tokens',
    attributes: {
      email: payload.email,
      password: payload.password
    }
  }
});

const mapUserStore = (payload: UserStoreSchema): UserStoreRequest => ({
  data: {
    type: 'users',
    attributes: {
      ...payload
    }
  }
});

const mapUserUpdate = (payload: UserUpdateSchema): UserUpdateRequest => {
  const {
    id,
    roles,
    positions,
    departments,
    languages,
    name,
    surname,
    patronymic,
    email,
    avatar,
  } = payload;

  const attributes = {
    ...(name !== undefined && { name }),
    ...(surname !== undefined && { surname }),
    ...(patronymic !== undefined && { patronymic }),
    ...(email !== undefined && { email }),
    ...(avatar !== undefined && { avatar }),
  };

  const relationships = {
    ...(roles && {
      roles: {
        data: roles.map((id) => ({
          type: 'roles' as const,
          id,
        })),
      },
    }),
    ...(positions && {
      positions: {
        data: positions.map((id) => ({
          type: 'positions' as const,
          id,
        })),
      },
    }),
    ...(departments && {
      departments: {
        data: departments.map((id) => ({
          type: 'departments' as const,
          id,
        })),
      },
    }),
    ...(languages && {
      languages: {
        data: languages.map((id) => ({
          type: 'languages' as const,
          id,
        })),
      },
    }),
  };

  return {
    data: {
      type: 'users',
      id,
      ...(Object.keys(attributes).length && { attributes }),
      ...(Object.keys(relationships).length && { relationships }),
    },
  };
};

export {
  mapLogin,
  mapUserStore,
  mapUserUpdate,
};
