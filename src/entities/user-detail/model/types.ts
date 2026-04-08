type UserDetail = {
  id: string;
  userId: string;
  birthDate: string | null;
  sex: string | null;
  nationality: string | null;
  citizenship: string | null;
  address: string | null;
  tel1: string | null;
  tel2: string | null;
  familyStatus: string | null;
  children: number[] | null;
  startedWorkAt: string | null;
};

type UserDetails = UserDetail[];

export type {
  UserDetail,
  UserDetails,
};
