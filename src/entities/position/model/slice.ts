import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AsyncStatus } from '@/shared/store';
import { Positions } from './types';
import { fetchPositionsAction } from './thunks';

type PositionSlice = {
  positions: {
    data?: Positions;
    status: AsyncStatus;
  };
}

const initialState: PositionSlice = {
  positions: {
    status: AsyncStatus.IDLE,
  },
};

const positionSlice = createSlice({
  name: 'position',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPositionsAction.pending, (state) => {
        state.positions.status = AsyncStatus.LOADING;
      })
      .addCase(fetchPositionsAction.fulfilled, (state, action: PayloadAction<Positions>) => {
        state.positions.data = action.payload;
        state.positions.status = AsyncStatus.SUCCEEDED;
      });
  }
});

export { positionSlice };
