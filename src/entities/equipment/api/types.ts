type EquipmentStoreRequest = {
  data: {
    type: 'equipments';
    attributes: {
      name: string;
      description?: string;
    };
    relationships: {
      user: {
        data: { type: 'users', id: string };
      }
    }
  };
};

type EquipmentUpdateRequest = {
  data: {
    type: 'equipments';
    id: string;
    attributes: {
      name?: string;
      description?: string;
    };
  };
};

type Data = {
  type: 'equipments';
  id: string;
  attributes: {
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
  };
  relationships: {
    user: {
      data: { type: 'users', id: string };
    }
  };
}

type EquipmentResponse = {
  data: Data;
};

type EquipmentsResponse = {
  data: Data[];
};

export type {
  EquipmentStoreRequest,
  EquipmentUpdateRequest,
  EquipmentResponse,
  EquipmentsResponse,
};
