import { LoginRequest } from '../api/types';
import { LoginSchema } from './schemas';

const mapLogin = (schema: LoginSchema): LoginRequest => ({
  data: {
    type: 'tokens',
    attributes: {
      email: schema.email,
      password: schema.password
    }
  }
});

export { mapLogin };
