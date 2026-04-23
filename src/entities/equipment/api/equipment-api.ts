import { AxiosInstance } from 'axios';
import { EquipmentResponse, EquipmentsResponse } from './types';
import { Equipment, Equipments } from '../model/types';
import { mapEquipmentResponse, mapEquipmentsResponse, mapEquipmentStoreRequest, mapEquipmentUpdateRequest } from './mappers';
import { EquipmentStoreSchema, EquipmentUpdateSchema } from '../model/schemas';

const fetchEquipments = async (api: AxiosInstance): Promise<Equipments> => {
  const { data } = await api.get<EquipmentsResponse>('/equipments?include=user');

  return mapEquipmentsResponse(data);
};

const storeEquipment = async (api: AxiosInstance, payload: EquipmentStoreSchema): Promise<Equipment> => {
  const { data } = await api.post<EquipmentResponse>('/equipments?include=user', mapEquipmentStoreRequest(payload));

  return mapEquipmentResponse(data);
};

const updateEquipment = async (api: AxiosInstance, payload: EquipmentUpdateSchema): Promise<Equipment> => {
  const { data } = await api.patch<EquipmentResponse>(
    `/equipments/${payload.id}?include=user`,
    mapEquipmentUpdateRequest(payload)
  );

  return mapEquipmentResponse(data);
};

const deleteEquipment = async (api: AxiosInstance, id: string): Promise<void> => {
  await api.delete<EquipmentResponse>(`/equipments/${id}`);
};

export {
  fetchEquipments,
  storeEquipment,
  updateEquipment,
  deleteEquipment,
};
