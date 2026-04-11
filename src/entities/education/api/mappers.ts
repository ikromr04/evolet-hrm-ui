import { Education } from '../model/types';
import { EducationResponse } from './types';

const mapEducation = (resource: EducationResponse): Education => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

export {
  mapEducation,
};
