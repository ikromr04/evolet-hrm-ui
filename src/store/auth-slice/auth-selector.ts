import { SliceName } from '@/const/store';
import { State } from '@/types/state';

export const getAuthStatus = (state: State) => state[SliceName.AUTH].status;

export const getAuthUser = (state: State) => state[SliceName.AUTH].me;
