import { AuthorizationStatus, SliceName } from '@/const/store';
import { createSlice } from '@reduxjs/toolkit';

export type AuthSlice = {
  status: AuthorizationStatus;
}

const initialState: AuthSlice = {
  status: AuthorizationStatus.UNKNOWN
};

export const authSlice = createSlice({
  name: SliceName.AUTH,
  initialState,
  reducers: {},
});
