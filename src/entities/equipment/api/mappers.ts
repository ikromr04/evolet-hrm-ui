import { EquipmentStoreSchema } from '../model/schemas';
import { Equipment } from '../model/types';
import { EquipmentResponse, EquipmentStoreRequest } from './types';

const mapEquipmentResponse = (resource: EquipmentResponse): Equipment => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

const mapEquipmentStoreRequest = (data: EquipmentStoreSchema): EquipmentStoreRequest => ({
  data: {
    type: 'equipments',
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
  mapEquipmentResponse,
  mapEquipmentStoreRequest,
};
