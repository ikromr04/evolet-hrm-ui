import { EquipmentStoreRequest } from '../api/types';
import { EquipmentStoreSchema } from './schemas';

const mapEquipmentStore = (data: EquipmentStoreSchema): EquipmentStoreRequest => ({
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
  mapEquipmentStore,
};
