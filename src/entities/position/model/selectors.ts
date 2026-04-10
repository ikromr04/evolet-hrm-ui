const getPositionsStatus = (state: RootState) => state.position.positions.status;

const getPositions = (state: RootState) => state.position.positions.data;

export {
  getPositionsStatus,
  getPositions,
};
