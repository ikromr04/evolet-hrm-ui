import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Equipment, Equipments } from './types';
import { storeEquipmentAction } from './thunks';

type EquipmentSlice = {
  equipments: {
    data?: Equipments;
    status: AsyncStatus;
  };
}

const initialState: EquipmentSlice = {
  equipments: {
    status: AsyncStatus.IDLE,
  },
};

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(storeEquipmentAction.fulfilled, (state, action: PayloadAction<Equipment>) => {
        if (state.equipments.data) {
          state.equipments.data = [action.payload, ...state.equipments.data];
        }
      });
  }
});

export { equipmentSlice };
