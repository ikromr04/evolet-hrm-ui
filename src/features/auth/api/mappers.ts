import { LoginSchema } from '../model/schemas';
import { Me } from '../model/types';
import { CheckAuthResponse, LoginRequest } from './types';

const mapCheckAuthResponse = (response: CheckAuthResponse): Me => ({
  id: response.data.id,
  ...response.data.attributes,
});

const mapLoginRequest = (data: LoginSchema): LoginRequest => ({
  data: {
    type: 'tokens',
    attributes: {
      ...data
    }
  },
});

export {
  mapCheckAuthResponse,
  mapLoginRequest,
};
