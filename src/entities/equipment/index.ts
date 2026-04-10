export {
  equipmentStoreSchema,
  type EquipmentStoreSchema,
} from './model/schemas';

export {
  storeEquipmentAction,
} from './model/thunks';

export type {
  Equipment,
  Equipments,
} from './model/types';

export { equipmentSlice } from './model/slice';

export {
  getEquipmentsStatus,
  getEquipments,
} from './model/selectors';
