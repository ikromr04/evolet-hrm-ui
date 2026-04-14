const Sex = {
  'male': 'Мужской',
  'female': 'Женский',
};

const FamilyStatus = {
  'single_man': 'Не женат',
  'single_woman': 'Не замужем',
  'married_man': 'Женат',
  'married_woman': 'Замужем',
};

type Profile = {
  id: string;
  userId: string;
  birthDate: string | null;
  sex: keyof typeof Sex | null;
  nationality: string | null;
  citizenship: string | null;
  address: string | null;
  tel1: string | null;
  tel2: string | null;
  familyStatus: keyof typeof FamilyStatus | null;
  children: number[] | null;
  startedWorkAt: string | null;
  createdAt: string;
  updatedAt: string;
};

type Profiles = Profile[];

export type {
  Profile,
  Profiles,
};

export {
  Sex,
  FamilyStatus,
};
