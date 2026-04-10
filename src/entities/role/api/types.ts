type RoleResponse = {
  data: {
    type: 'roles';
    id: string;
    attributes: {
      name: string;
      displayName: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type RolesResponse = {
  data: {
    type: 'roles';
    id: string;
    attributes: {
      name: string;
      displayName: string;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type {
  RoleResponse,
  RolesResponse,
};
