import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Equipment, Equipments } from './types';
import { deleteEquipmentAction, fetchEquipmentsAction, storeEquipmentAction, updateEquipmentAction } from './thunks';

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
      .addCase(fetchEquipmentsAction.pending, (state) => {
        state.equipments.status = AsyncStatus.LOADING;
      })
      .addCase(fetchEquipmentsAction.fulfilled, (state, action: PayloadAction<Equipments>) => {
        state.equipments.data = action.payload;
        state.equipments.status = AsyncStatus.SUCCEEDED;
      })
      .addCase(storeEquipmentAction.fulfilled, (state, action: PayloadAction<Equipment>) => {
        if (state.equipments.data) {
          state.equipments.data = [action.payload, ...state.equipments.data];
        }
      })
      .addCase(updateEquipmentAction.fulfilled, (state, action: PayloadAction<Equipment>) => {
        if (state.equipments.data) {
          state.equipments.data = state.equipments.data.map((equipment) => {
            if (equipment.id === action.payload.id) {
              return action.payload;
            }
            return equipment;
          });
        }
      })
      .addCase(deleteEquipmentAction.fulfilled, (state, action: PayloadAction<Equipment>) => {
        if (state.equipments.data) {
          state.equipments.data = state.equipments.data.filter((equipment) => equipment.id !== action.payload.id);
        }
      });
  }
});

export { equipmentSlice };
