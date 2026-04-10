type PositionResponse = {
  data: {
    type: 'positions';
    id: string;
    attributes: {
      name: string;
    };
  };
};

type PositionsResponse = {
  data: {
    type: 'positions';
    id: string;
    attributes: {
      name: string;
    };
  }[];
}

export type {
  PositionResponse,
  PositionsResponse,
};
