import { Position, Positions } from '../model/types';
import { PositionResponse, PositionsResponse } from './types';

const mapPosition = (resource: PositionResponse): Position => ({
  id: resource.data.id,
  ...resource.data.attributes
});

const mapPositions = (collection: PositionsResponse): Positions =>
  collection.data.map((data) => ({
    id: data.id,
    ...data.attributes
  }));

export {
  mapPosition,
  mapPositions,
};
