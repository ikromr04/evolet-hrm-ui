export {
  equipmentStoreSchema,
  equipmentUpdateSchema,
  type EquipmentStoreSchema,
  type EquipmentUpdateSchema,
} from './model/schemas';

export {
  fetchEquipmentsAction,
  storeEquipmentAction,
  updateEquipmentAction,
  deleteEquipmentAction,
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
