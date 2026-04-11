import { Experience } from '../model/types';
import { ExperienceResponse } from './types';

const mapExperience = (resource: ExperienceResponse): Experience => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

export {
  mapExperience,
};
