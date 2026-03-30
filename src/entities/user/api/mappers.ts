import { User } from '../model/types';
import { UserResponse } from './types';

const mapUser = (resource: UserResponse): User => ({
  id: resource.data.id,
  ...resource.data.attributes
});

export { mapUser };
