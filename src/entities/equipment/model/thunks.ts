import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosInstance } from 'axios';
import { ApiErrors, ErrorResponse } from '@/shared/api';
import { EquipmentStoreSchema } from './schemas';
import { Equipment } from './types';
import { storeEquipment } from '../api/equipment-api';
import { mapEquipmentStore } from './mappers';

const storeEquipmentAction = createAsyncThunk<Equipment, {
  payload: EquipmentStoreSchema;
}, {
  extra: AxiosInstance;
  rejectWithValue: ApiErrors;
}>(
  'equipments/store',
  async ({ payload }, { extra: api, rejectWithValue }) => {
    try {
      const profile = await storeEquipment(api, mapEquipmentStore(payload));
      
      return profile;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;

      return rejectWithValue(error.response?.data.errors);
    }
  }
);

export {
  storeEquipmentAction,
};
