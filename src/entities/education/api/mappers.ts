import { EducationStoreSchema, EducationUpdateSchema } from '../model/schemas';
import { Education, Educations } from '../model/types';
import { EducationResponse, EducationsResponse, EducationStoreRequest, EducationUpdateRequest } from './types';

const mapEducationResponse = (resource: EducationResponse): Education => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes,
});

const mapEducationsResponse = (collection: EducationsResponse): Educations => collection.data.map((data) => ({
  id: data.id,
  userId: data.relationships.user.data.id,
  ...data.attributes,
}));

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

const mapEducationUpdateRequest = (data: EducationUpdateSchema): EducationUpdateRequest => ({
  data: {
    type: 'educations',
    id: data.id,
    attributes: {
      ...data
    },
  }
});

export {
  mapEducationsResponse,
  mapEducationResponse,
  mapEducationStoreRequest,
  mapEducationUpdateRequest,
};
