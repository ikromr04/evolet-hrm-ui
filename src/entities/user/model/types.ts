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
  login: string;
  avatar: string | null;
  avatarThumb: string | null;
  email?: string | null;
  emailVerifiedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export { AuthStatus, type User };
