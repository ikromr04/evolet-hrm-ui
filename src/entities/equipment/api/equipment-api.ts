import { AxiosInstance } from 'axios';
import { EquipmentResponse, EquipmentStoreRequest } from './types';
import { Equipment } from '../model/types';
import { mapEquipment } from './mappers';

const storeEquipment = async (api: AxiosInstance, payload: EquipmentStoreRequest): Promise<Equipment> => {
  const { data } = await api.post<EquipmentResponse>('/equipments', payload);

  return mapEquipment(data);
};

export {
  storeEquipment,
};
