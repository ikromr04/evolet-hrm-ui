enum AuthStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
};

type User = {
  id: string;
  name: string;
  surname: string;
  patronymic: string | null;
  avatar: string | null;
  avatarThumb: string | null;
  email: string;
  emailVerifiedAt: string | null;
  createdAt: string;
  updatedAt: string;

  roles: string[];
  positions: string[];
  departments: string[];
};

type Users = User[];

export {
  AuthStatus,
  type User,
  type Users,
};
