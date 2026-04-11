type Education = {
  id: string;
  userId: string;
  institution: string;
  faculty: string;
  speciality: string;
  form: string;
  startedAt: string;
  endedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Educations = Education[];

export type {
  Education,
  Educations,
};
