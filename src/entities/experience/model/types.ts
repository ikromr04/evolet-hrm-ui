type Experience = {
  id: string;
  userId: string;
  companyName: string;
  position: string;
  startedAt: string;
  endedAt: string;
  createdAt: string;
  updatedAt: string;
};

type Experiences = Experience[];

export type {
  Experience,
  Experiences,
};
