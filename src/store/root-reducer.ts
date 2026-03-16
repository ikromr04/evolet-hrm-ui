import { combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './auth-slice/auth-slice';
import { SliceName } from '@/const/store';

export const rootReducer = combineReducers({
  [SliceName.AUTH]: authSlice.reducer
});
