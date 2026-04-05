import { LoginRequest, UserStoreRequest } from '../api/types';
import { LoginSchema, UserStoreSchema } from './schemas';

const mapLogin = (data: LoginSchema): LoginRequest => ({
  data: {
    type: 'tokens',
    attributes: {
      email: data.email,
      password: data.password
    }
  }
});

const mapUserStore = (data: UserStoreSchema): UserStoreRequest => ({
  data: {
    type: 'users',
    attributes: {
      ...data
    }
  }
});

export {
  mapLogin,
  mapUserStore,
};
