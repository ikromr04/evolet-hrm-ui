type DepartmentResponse = {
  data: {
    type: 'departments';
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
    type: 'departments';
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
