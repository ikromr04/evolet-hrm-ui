import { ExperienceStoreSchema, ExperienceUpdateSchema } from '../model/schemas';
import { Experience, Experiences } from '../model/types';
import { ExperienceResponse, ExperiencesResponse, ExperienceStoreRequest, ExperienceUpdateRequest } from './types';

const mapExperienceResponse = (resource: ExperienceResponse): Experience => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

const mapExperiencesResponse = (collection: ExperiencesResponse): Experiences => collection.data.map((data) => ({
  id: data.id,
  userId: data.relationships.user.data.id,
  ...data.attributes
}));

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

const mapExperienceUpdateRequest = (data: ExperienceUpdateSchema): ExperienceUpdateRequest => ({
  data: {
    type: 'experiences',
    id: data.id,
    attributes: {
      ...data
    },
  }
});

export {
  mapExperiencesResponse,
  mapExperienceResponse,
  mapExperienceStoreRequest,
  mapExperienceUpdateRequest,
};
