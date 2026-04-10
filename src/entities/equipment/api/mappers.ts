import { Equipment } from '../model/types';
import { EquipmentResponse } from './types';

const mapEquipment = (resource: EquipmentResponse): Equipment => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

export {
  mapEquipment,
};
