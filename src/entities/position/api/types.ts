type PositionResponse = {
  data: {
    type: 'positions';
    id: string;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type PositionsResponse = {
  data: {
    type: 'positions';
    id: string;
    attributes: {
      name: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type {
  PositionResponse,
  PositionsResponse,
};
