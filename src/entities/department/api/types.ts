type DepartmentResponse = {
  data: {
    type: 'deaprtments';
    id: string;
    attributes: {
      name: string;
      left: string;
      right: string;
      parent: string | null;
      createdAt: string;
      updatedAt: string;
    };
  };
};

type DepartmentsResponse = {
  data: {
    type: 'department';
    id: string;
    attributes: {
      name: string;
      left: string;
      right: string;
      parent: string | null;
      createdAt: string;
      updatedAt: string;
    };
  }[];
}

export type {
  DepartmentResponse,
  DepartmentsResponse,
};
