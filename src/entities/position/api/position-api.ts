import { AxiosInstance } from 'axios';
import { Positions } from '../model/types';
import { PositionsResponse } from './types';
import { mapPositions } from './mappers';

const fetchPositions = async (api: AxiosInstance): Promise<Positions> => {
  const { data } = await api.get<PositionsResponse>('/positions');

  return mapPositions(data);
};

export {
  fetchPositions,
};
