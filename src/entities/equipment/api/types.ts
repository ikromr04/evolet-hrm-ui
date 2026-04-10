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

type EquipmentResponse = {
  data: {
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
    }
  };
};

export type {
  EquipmentStoreRequest,
  EquipmentResponse,
};
