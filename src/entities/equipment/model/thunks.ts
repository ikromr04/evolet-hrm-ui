import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EquipmentStoreSchema, EquipmentUpdateSchema } from './schemas';
import { Equipment, Equipments } from './types';
import { deleteEquipment, fetchEquipments, storeEquipment, updateEquipment } from '../api/equipment-api';

const fetchEquipmentsAction = createAsyncThunk<Equipments, undefined, {
  extra: AxiosInstance;
}>(
  'eqquipments/fetch',
  async (_arg, { extra: api }) => {
    return await fetchEquipments(api);
  }
);

const storeEquipmentAction = createAsyncThunk<Equipment, {
  data: EquipmentStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'equipments/store',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await storeEquipment(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const updateEquipmentAction = createAsyncThunk<Equipment, {
  data: EquipmentUpdateSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'equipments/update',
  async ({ data }, { extra: api, rejectWithValue }) => {
    try {
      return await updateEquipment(api, data);
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

const deleteEquipmentAction = createAsyncThunk<Equipment, {
  data: Equipment;
}, {
  extra: AxiosInstance;
}>(
  'equipments/delete',
  async ({ data }, { extra: api }) => {
    await deleteEquipment(api, data.id);

    return data;
  }
);

export {
  fetchEquipmentsAction,
  storeEquipmentAction,
  updateEquipmentAction,
  deleteEquipmentAction,
};
