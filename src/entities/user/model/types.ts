enum AuthStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
};

type User = {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  avatar: string;
  avatarThumb: string;
  email?: string | null;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

type Users = User[];

export {
  AuthStatus,
  type User,
  type Users,
};
