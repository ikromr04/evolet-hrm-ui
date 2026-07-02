type User = {
  id: string;
  surname: string;
  name: string;
  patronymic: string | null;
  avatar: string | null;
  avatarThumb: string | null;
  email: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  profile: string | null;
  roles: string[];
  positions: string[];
  departments: string[];
  languages: string[];
  equipments: string[];
  experiences: string[];
  educations: string[];

  firedBy?: string;
  firedReason?: string;
  firedAt?: string;
};

type Users = User[];

export {
  type User,
  type Users,
};
