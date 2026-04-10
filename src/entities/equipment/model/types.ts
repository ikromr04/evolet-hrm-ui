type Equipment = {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type Equipments = Equipment[];

export type {
  Equipment,
  Equipments,
};
