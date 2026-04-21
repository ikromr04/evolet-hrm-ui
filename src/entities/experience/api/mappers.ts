import { ExperienceStoreSchema } from '../model/schemas';
import { Experience } from '../model/types';
import { ExperienceResponse, ExperienceStoreRequest } from './types';

const mapExperienceResponse = (resource: ExperienceResponse): Experience => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

const mapExperienceStoreRequest = (data: ExperienceStoreSchema): ExperienceStoreRequest => ({
  data: {
    type: 'experiences',
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
  mapExperienceResponse,
  mapExperienceStoreRequest,
};
