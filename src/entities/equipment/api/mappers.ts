import { EquipmentStoreSchema, EquipmentUpdateSchema } from '../model/schemas';
import { Equipment, Equipments } from '../model/types';
import { EquipmentResponse, EquipmentsResponse, EquipmentStoreRequest, EquipmentUpdateRequest } from './types';

const mapEquipmentResponse = (resource: EquipmentResponse): Equipment => ({
  id: resource.data.id,
  userId: resource.data.relationships.user.data.id,
  ...resource.data.attributes
});

const mapEquipmentsResponse = (collection: EquipmentsResponse): Equipments => collection.data.map((data) => ({
  id: data.id,
  userId: data.relationships.user.data.id,
  ...data.attributes
}));

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

const mapEquipmentUpdateRequest = (data: EquipmentUpdateSchema): EquipmentUpdateRequest => ({
  data: {
    type: 'equipments',
    id: data.id,
    attributes: {
      ...data
    },
  }
});

export {
  mapEquipmentsResponse,
  mapEquipmentResponse,
  mapEquipmentStoreRequest,
  mapEquipmentUpdateRequest,
};
