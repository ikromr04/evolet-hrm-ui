enum AuthStatus {
  AUTH = 'AUTH',
  NO_AUTH = 'NO_AUTH',
  UNKNOWN = 'UNKNOWN'
};

type UserResource = {
  type: 'users';
  id: string;
  attributes: {
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
};

export { AuthStatus, UserResource };
