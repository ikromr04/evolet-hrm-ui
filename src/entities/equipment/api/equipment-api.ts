import { AxiosInstance } from 'axios';
import { EquipmentResponse } from './types';
import { Equipment } from '../model/types';
import { mapEquipmentResponse, mapEquipmentStoreRequest } from './mappers';
import { EquipmentStoreSchema } from '../model/schemas';

const storeEquipment = async (api: AxiosInstance, payload: EquipmentStoreSchema): Promise<Equipment> => {
  const { data } = await api.post<EquipmentResponse>('/equipments?include=user', mapEquipmentStoreRequest(payload));

  return mapEquipmentResponse(data);
};

export {
  storeEquipment,
};
