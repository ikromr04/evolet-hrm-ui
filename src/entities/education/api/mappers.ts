import { EducationStoreSchema } from '../model/schemas';
import { Education } from '../model/types';
import { EducationResponse, EducationStoreRequest } from './types';

const mapEducationResponse = (resource: EducationResponse): Education => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

const mapEducationStoreRequest = (data: EducationStoreSchema): EducationStoreRequest => ({
  data: {
    type: 'educations',
    attributes: {
      ...data
    },
    relationships: {
      user: {
        data: {
          type: 'users',
          id: data.userId
        }
      }
    }
  }
});

export {
  mapEducationResponse,
  mapEducationStoreRequest,
};
