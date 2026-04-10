type Department = {
  id: string;
  name: string;
  left: string;
  right: string;
  parent: string | null;
  createdAt: string;
  updatedAt: string;
};

type Departments = Department[];

export type {
  Department,
  Departments,
};
