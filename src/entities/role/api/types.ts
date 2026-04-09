type RoleResponse = {
  data: {
    type: 'roles';
    id: string;
    attributes: {
      name: string;
      displayName: string;
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
    };
  }[];
}

export type {
  RoleResponse,
  RolesResponse,
};
